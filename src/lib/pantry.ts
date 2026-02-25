export interface PantryItem {
    id: string;
    name: string;
    expiryDate: string; // ISO format YYYY-MM-DD
    qty: string;
    image: string;
    category: "Pantry" | "Fridge" | "Spices";
    consumed?: boolean;
}

export interface ShoppingItem {
    id: string;
    name: string;
    qty: string;
    category: string;
    addedDate: string;
    bought?: boolean;
}

export const initialPantryItems: PantryItem[] = [
    {
        id: "1",
        name: "Whole Milk",
        expiryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        qty: "500ml",
        image: "https://images.unsplash.com/photo-1550583724-1255818c0533?w=100&h=100&fit=crop",
        category: "Fridge"
    },
    {
        id: "2",
        name: "Avocados",
        expiryDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
        qty: "2 units",
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100&h=100&fit=crop",
        category: "Pantry"
    },
    {
        id: "3",
        name: "Penne Pasta",
        expiryDate: "2026-12-01",
        qty: "2 units",
        image: "https://images.unsplash.com/photo-1551462147-3a8836a9b1f2?w=100&h=100&fit=crop",
        category: "Pantry"
    },
    {
        id: "4",
        name: "Olive Oil",
        expiryDate: "2027-01-15",
        qty: "750ml",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacabc88c5?w=100&h=100&fit=crop",
        category: "Pantry"
    }
];

// Mock Price Data
export const STORE_PRICES: Record<string, Record<string, number>> = {
    "FreshMart Central": {
        "Whole Milk": 3.20,
        "Whole Wheat Bread": 2.50,
        "Coffee Beans": 14.00,
        "Organic Spinach": 2.80,
        "Eggs": 4.50
    },
    "Discount Depot": {
        "Whole Milk": 2.90,
        "Whole Wheat Bread": 2.20,
        "Coffee Beans": 12.00,
        "Organic Spinach": 3.10,
        "Eggs": 3.80
    }
};

export const getExpiringSoonItems = (items: PantryItem[]) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2); // Within 48 hours
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const todayStr = new Date().toISOString().split('T')[0];

    return items.filter(item => !item.consumed && item.expiryDate <= tomorrowStr && item.expiryDate >= todayStr);
};

export const getExpiryLabel = (date: string) => {
    const itemDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    itemDate.setHours(0, 0, 0, 0);

    const diffTime = itemDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return { label: "Expires Today", urgency: "today" as const };
    if (diffDays === 1) return { label: "Expires Tomorrow", urgency: "soon" as const };
    if (diffDays < 0) return { label: "Expired", urgency: "overdue" as const };
    return { label: `Expires in ${diffDays} days`, urgency: diffDays <= 3 ? "soon" : "normal" as const };
};

export const calculateBestDeals = (shoppingList: ShoppingItem[]) => {
    const stores = Object.keys(STORE_PRICES);

    return stores.map(storeName => {
        let total = 0;
        const storePrices = STORE_PRICES[storeName];

        const availableItems = shoppingList.map(item => {
            const itemNameLower = item.name.toLowerCase();
            const storeKeys = Object.keys(storePrices);

            // Try exact match first
            let matchKey = storeKeys.find(key => key.toLowerCase() === itemNameLower);

            // If no exact match, try inclusion
            if (!matchKey) {
                matchKey = storeKeys.find(key =>
                    itemNameLower.includes(key.toLowerCase()) ||
                    key.toLowerCase().includes(itemNameLower)
                );
            }

            if (matchKey) {
                const price = storePrices[matchKey];
                total += price;
                return { name: item.name, price: `$${price.toFixed(2)}` };
            }
            return null;
        }).filter(Boolean) as { name: string, price: string }[];

        return {
            name: storeName,
            total: total,
            items: availableItems,
            color: storeName === "FreshMart Central" ? "bg-blue-500" : "bg-red-500"
        };
    }).sort((a, b) => a.total - b.total);
};
