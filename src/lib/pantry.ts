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
        id: "5",
        name: "Organic Spinach",
        expiryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        qty: "1 bag",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop",
        category: "Fridge"
    },
    {
        id: "6",
        name: "Large Brown Eggs",
        expiryDate: new Date(Date.now() + 432000000).toISOString().split('T')[0], // 5 days
        qty: "12 units",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop",
        category: "Fridge"
    },
    {
        id: "7",
        name: "Yellow Onions",
        expiryDate: new Date(Date.now() + 864000000).toISOString().split('T')[0], // 10 days
        qty: "1 kg",
        image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=100&h=100&fit=crop",
        category: "Pantry"
    },
    {
        id: "8",
        name: "Russet Potatoes",
        expiryDate: new Date(Date.now() + 1296000000).toISOString().split('T')[0], // 15 days
        qty: "2 kg",
        image: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?w=100&h=100&fit=crop",
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

// Mock Consumption Stats for Heatmap (Usage vs. Waste)
export const CONSUMPTION_STATS = [
    { month: "Sep", usage: 85, waste: 15 },
    { month: "Oct", usage: 78, waste: 22 },
    { month: "Nov", usage: 92, waste: 8 },
    { month: "Dec", usage: 65, waste: 35 },
    { month: "Jan", usage: 88, waste: 12 },
    { month: "Feb", usage: 95, waste: 5 }
];

// Mock Shopping Habits for Proactive Alerts
export const SHOPPING_HABITS = {
    "Thursday": ["Whole Milk", "Avocados"],
    "Monday": ["Coffee Beans", "Daily Greens"],
    "Wednesday": ["Fresh Berries", "Almond Milk"]
};

// Multi-Item Recipe Combinations
export const RECIPE_COMBINATIONS = [
    {
        name: "Morning Power Scramble",
        items: ["Eggs", "Spinach", "Milk"],
        description: "A protein-packed start to clear your fridge."
    },
    {
        name: "Kitchen Sink Pesto Pasta",
        items: ["Pasta", "Spinach", "Spices"],
        description: "Toss everything in for a quick, zero-waste dinner."
    }
];

// Storage Best Practices
export const STORAGE_TIPS = [
    {
        keywords: ["avocado"],
        tip: "Move to the fridge once ripe to gain another 2-3 days of shelf life.",
        icon: "Leaf"
    },
    {
        keywords: ["spinach", "lettuce", "greens"],
        tip: "Wrap in a damp paper towel to maintain crispness and absorb excess moisture.",
        icon: "Wind"
    },
    {
        keywords: ["bread"],
        tip: "Freeze slices you won't use within 3 days to keep them fresh for weeks.",
        icon: "Snowflake"
    },
    {
        keywords: ["onions", "potatoes"],
        tip: "Store separately. Onions release gases that make potatoes sprout faster.",
        icon: "AlertTriangle",
        neighborCheck: ["onions", "potatoes"]
    },
    {
        keywords: ["berries", "strawberry", "blueberry"],
        tip: "Wash in a vinegar-water solution only just before eating to prevent mold.",
        icon: "Droplets"
    }
];

export const getExpiringSoonItems = (items: PantryItem[]) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2); // Within 48 hours
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    const todayStr = new Date().toISOString().split('T')[0];

    return items.filter(item => !item.consumed && item.expiryDate <= tomorrowStr && item.expiryDate >= todayStr);
};

export const getKitchenSinkRecipe = (expiringItems: PantryItem[]) => {
    const expiringNames = expiringItems.map(i => i.name.toLowerCase());

    return RECIPE_COMBINATIONS.find(recipe => {
        const matchCount = recipe.items.filter(reqItem =>
            expiringNames.some(expItem => expItem.includes(reqItem.toLowerCase()))
        ).length;
        // Suggest if we have at least 2 matching items
        return matchCount >= 2;
    });
};

export const getProactiveSuggestions = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = days[new Date().getDay()];
    return (SHOPPING_HABITS as any)[today] || [];
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

export const getStorageTips = (items: PantryItem[]) => {
    const activeNames = items.filter(i => !i.consumed).map(i => i.name.toLowerCase());

    return STORAGE_TIPS.filter(tip => {
        // If it's a neighbor check, both must exist
        if (tip.neighborCheck) {
            return tip.neighborCheck.every(req =>
                activeNames.some(name => name.includes(req.toLowerCase()))
            );
        }

        // Otherwise, any keyword match works
        return tip.keywords.some(keyword =>
            activeNames.some(name => name.includes(keyword.toLowerCase()))
        );
    });
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
