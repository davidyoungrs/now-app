export type Category = "Tops" | "Bottoms" | "Outerwear" | "Shoes" | "Accessories";

export interface WardrobeItem {
    id: string;
    name: string;
    category: Category;
    image: string;
    color: string;
    warmthLevel: "light" | "medium" | "heavy";
    formality: "casual" | "business-casual" | "formal" | "lounge";
    lastWorn?: string | null; // ISO string date
    wornCount: number;
    liked: boolean;
}

export interface OutfitSuggestion {
    id: string;
    title: string;
    description: string;
    items: WardrobeItem[];
    mockImage: string; // URL for the suggested outfit visual
}

// Mock initial data covering a variety of items to allow for meaningful outfit generation
export const initialWardrobeItems: WardrobeItem[] = [
    // Tops
    {
        id: "t1", name: "Basics Organic Tee", category: "Tops",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
        color: "White", warmthLevel: "light", formality: "casual",
        lastWorn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        wornCount: 34, liked: true
    },
    {
        id: "t2", name: "Merino Wool Turtleneck", category: "Tops",
        image: "https://images.unsplash.com/photo-1624405373330-843b0220d57e?w=400&h=500&fit=crop",
        color: "Black", warmthLevel: "medium", formality: "business-casual",
        lastWorn: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
        wornCount: 12, liked: false
    },
    {
        id: "t3", name: "Crisp Oxford Shirt", category: "Tops",
        image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400&h=500&fit=crop",
        color: "Light Blue", warmthLevel: "light", formality: "business-casual",
        lastWorn: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), // > 1 month
        wornCount: 5, liked: false
    },
    // Bottoms
    {
        id: "b1", name: "Vintage Wash Denim", category: "Bottoms",
        image: "https://images.unsplash.com/photo-1542272604-780c4050d12e?w=400&h=500&fit=crop",
        color: "Blue", warmthLevel: "medium", formality: "casual",
        lastWorn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        wornCount: 45, liked: true
    },
    {
        id: "b2", name: "Tailored Trousers", category: "Bottoms",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
        color: "Charcoal", warmthLevel: "medium", formality: "business-casual",
        lastWorn: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(), // > 1 month
        wornCount: 8, liked: false
    },
    {
        id: "b3", name: "Vintage Plaid Mini", category: "Bottoms",
        image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=400&h=500&fit=crop",
        color: "Red", warmthLevel: "light", formality: "casual",
        lastWorn: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
        wornCount: 12, liked: true
    },
    // Outerwear
    {
        id: "o1", name: "Parisian Linen Blazer", category: "Outerwear",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
        color: "Beige", warmthLevel: "light", formality: "business-casual",
        lastWorn: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
        wornCount: 8, liked: true
    },
    {
        id: "o2", name: "Heavy Wool Overcoat", category: "Outerwear",
        image: "https://images.unsplash.com/photo-1539533018447-60a63e9fccd7?w=400&h=500&fit=crop",
        color: "Camel", warmthLevel: "heavy", formality: "formal",
        lastWorn: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // > 1 month
        wornCount: 14, liked: true
    },
    {
        id: "o3", name: "Classic Denim Jacket", category: "Outerwear",
        image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb1?w=400&h=500&fit=crop",
        color: "Light Blue", warmthLevel: "medium", formality: "casual",
        lastWorn: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        wornCount: 22, liked: false
    },
    // Shoes
    {
        id: "s1", name: "Chelsea Leather Boots", category: "Shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
        color: "Black", warmthLevel: "medium", formality: "business-casual",
        lastWorn: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        wornCount: 21, liked: false
    },
    {
        id: "s2", name: "White Canvas Sneakers", category: "Shoes",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=500&fit=crop",
        color: "White", warmthLevel: "light", formality: "casual",
        lastWorn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        wornCount: 104, liked: true
    }
];

// --- Analytics Helpers ---

export function getItemsWornLastWeek(items: WardrobeItem[]): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return items.filter(item => item.lastWorn && new Date(item.lastWorn) > oneWeekAgo).length;
}

export function getUnwornAlternatives(items: WardrobeItem[]): WardrobeItem[] {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return items.filter(item => !item.lastWorn || new Date(item.lastWorn) < oneMonthAgo)
        .sort((a, b) => { // Sort least recently worn first
            if (!a.lastWorn) return -1;
            if (!b.lastWorn) return 1;
            return new Date(a.lastWorn).getTime() - new Date(b.lastWorn).getTime();
        });
}

// --- Generator & Actions ---

import { DailyForecast } from "./weather";

/**
 * Generates exactly 3 outfit options based on simplistic weather logic 
 * and randomly pulls from inventory to keep it interesting.
 * Now uses a multi-day forecast to generate one outfit per day.
 */
export function generateOutfits(inventory: WardrobeItem[], forecast: DailyForecast[]): OutfitSuggestion[] {
    const tops = inventory.filter(i => i.category === "Tops");
    const bottoms = inventory.filter(i => i.category === "Bottoms");
    const shoes = inventory.filter(i => i.category === "Shoes");
    const outerwear = inventory.filter(i => i.category === "Outerwear");

    const getRandom = (arr: WardrobeItem[]) => arr[Math.floor(Math.random() * arr.length)];

    // Fallback if forecast is missing
    const defaultForecast: DailyForecast[] = [
        { date: "Today", tempMax: 15, weatherCode: 0, condition: "Sunny" },
        { date: "Tomorrow", tempMax: 12, weatherCode: 3, condition: "Cloudy" },
        { date: "Day 3", tempMax: 10, weatherCode: 61, condition: "Rain" }
    ];

    const activeForecast = (forecast && forecast.length >= 3) ? forecast.slice(0, 3) : defaultForecast;

    const vibes = [
        { id: "o1", mockImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop" },
        { id: "o2", mockImage: "https://images.unsplash.com/photo-1434389678369-bd410f538431?w=600&h=800&fit=crop" },
        { id: "o3", mockImage: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&h=800&fit=crop" }
    ];

    return activeForecast.map((day, index) => {
        // Simple logic: if < 15C, prioritize medium/heavy.
        const isCold = day.tempMax < 15;
        const isRaining = day.condition.toLowerCase().includes("rain");

        // Basic assembly
        const outfit: WardrobeItem[] = [];
        if (tops.length) outfit.push(getRandom(tops));
        if (bottoms.length) outfit.push(getRandom(bottoms));
        if (shoes.length) outfit.push(getRandom(shoes));

        // Add outerwear if cold or raining or randomly 30%
        if ((isCold || isRaining || Math.random() > 0.7) && outerwear.length) {
            outfit.push(getRandom(outerwear));
        }

        // Format date string nicely
        let dateLabel = day.date;
        try {
            if (day.date !== "Today" && day.date !== "Tomorrow" && day.date !== "Day 3") {
                const d = new Date(day.date);
                dateLabel = d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
            }
        } catch (e) { }

        const vibeInfo = vibes[index] || vibes[0];

        return {
            id: vibeInfo.id,
            title: dateLabel,
            description: `${day.tempMax}°C, ${day.condition}`,
            mockImage: vibeInfo.mockImage,
            items: outfit
        };
    });
}

/**
 * Updates the given items' lastWorn date to now and increments wornCount.
 */
export function markAsWorn(itemsToMark: WardrobeItem[], inventory: WardrobeItem[]): WardrobeItem[] {
    const idsToMark = new Set(itemsToMark.map(i => i.id));
    const now = new Date().toISOString();

    return inventory.map(item => {
        if (idsToMark.has(item.id)) {
            return {
                ...item,
                lastWorn: now,
                wornCount: item.wornCount + 1
            };
        }
        return item;
    });
}

/**
 * Mock Gemini Pro Vision API that processes a "selfie" image
 * and returns the identified items from the inventory.
 */
export async function simulateMirrorScan(inventory: WardrobeItem[]): Promise<WardrobeItem[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Magically identify 1 top and 1 bottom
            const tops = inventory.filter(i => i.category === "Tops");
            const bottoms = inventory.filter(i => i.category === "Bottoms");

            const scanned: WardrobeItem[] = [];
            if (tops.length > 0) scanned.push(tops[Math.floor(Math.random() * tops.length)]);
            if (bottoms.length > 0) scanned.push(bottoms[Math.floor(Math.random() * bottoms.length)]);

            resolve(scanned);
        }, 2500); // 2.5s delay to simulate AI processing
    });
}
