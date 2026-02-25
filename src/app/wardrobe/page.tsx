"use client";
"use client";

import { useState, useEffect } from "react";
import { Plus, Camera, Sparkles, Filter, Scan, Search, Bell, Heart, RefreshCcw, Tag, Grid, CheckCircle2, History, AlertCircle, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    WardrobeItem, OutfitSuggestion, initialWardrobeItems,
    generateOutfits, getItemsWornLastWeek, getUnwornAlternatives,
    markAsWorn, simulateMirrorScan, Category
} from "@/lib/wardrobe";
import { fetchWeather, WeatherData } from "@/lib/weather";
import { CameraCapture } from "@/components/CameraCapture";

export default function Wardrobe() {
    const [inventory, setInventory] = useState<WardrobeItem[]>(initialWardrobeItems);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [outfits, setOutfits] = useState<OutfitSuggestion[]>([]);

    // Scan State (The Aura Stylist / Selfie for Wear tracking)
    const [isScanning, setIsScanning] = useState(false);
    const [scannedItems, setScannedItems] = useState<WardrobeItem[] | null>(null);

    // Live AI Camera Integration State (Adding new clothes)
    const [showAddCamera, setShowAddCamera] = useState(false);
    const [analyzingImage, setAnalyzingImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [manualOverrideItems, setManualOverrideItems] = useState<Partial<WardrobeItem>[] | null>(null);

    // Initial Load & Weather
    useEffect(() => {
        // Fetch weather (mocking coordinates for NY or relying on existing)
        fetchWeather(40.7128, -74.0060).then(data => {
            setWeather(data);
            setOutfits(generateOutfits(initialWardrobeItems, data.temp));
        }).catch(() => {
            setOutfits(generateOutfits(initialWardrobeItems, 15));
        });
    }, []);

    // Calculate Analytics
    const itemsWornLastWeek = getItemsWornLastWeek(inventory);
    const unwornAlternatives = getUnwornAlternatives(inventory);

    // Handlers: Selfie Worn Scan
    const handleScan = async () => {
        setIsScanning(true);
        setScannedItems(null);
        const results = await simulateMirrorScan(inventory);
        setScannedItems(results);
        setIsScanning(false);
    };

    const handleSaveWorn = () => {
        if (!scannedItems) return;
        setInventory(prev => markAsWorn(scannedItems, prev));
        setScannedItems(null);
    };

    const toggleLike = (id: string) => {
        setInventory(prev => prev.map(item => item.id === id ? { ...item, liked: !item.liked } : item));
    };

    // Handlers: Live Adding Clothes
    const handleCaptureNewItem = async (base64Image: string) => {
        setShowAddCamera(false);
        setAnalyzingImage(base64Image);
        setIsAnalyzing(true);

        try {
            const res = await fetch("/api/wardrobe/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: base64Image })
            });
            const data = await res.json();

            if (data.items && data.items.length > 0) {
                setManualOverrideItems(data.items);
            } else {
                // Fallback if API fails or returns empty
                setManualOverrideItems([{
                    name: "Unknown Item", category: "Tops", color: "Unknown", warmthLevel: "medium", formality: "casual"
                }]);
            }
        } catch (error) {
            console.error("Analysis failed", error);
            setManualOverrideItems([{
                name: "Error Analysing", category: "Tops", color: "Unknown", warmthLevel: "medium", formality: "casual"
            }]);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleOverrideChange = (index: number, field: keyof WardrobeItem, value: string) => {
        if (!manualOverrideItems) return;
        const newItems = [...manualOverrideItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setManualOverrideItems(newItems);
    };

    const handleConfirmAdd = () => {
        if (!manualOverrideItems || !analyzingImage) return;

        const newItems: WardrobeItem[] = manualOverrideItems.map((item, i) => ({
            id: `new- ${Date.now()} -${i} `,
            name: item.name || "Unnamed Item",
            category: (item.category as Category) || "Accessories",
            image: analyzingImage,
            color: item.color || "Unknown",
            warmthLevel: (item.warmthLevel as any) || "medium",
            formality: (item.formality as any) || "casual",
            wornCount: 0,
            liked: false
        }));

        setInventory(prev => [...newItems, ...prev]);
        setManualOverrideItems(null);
        setAnalyzingImage(null);
    };

    return (
        <div className="flex flex-col min-h-screen pb-32">
            {/* Header */}
            <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-aura-cream/80 dark:bg-aura-clay/80 backdrop-blur-md sticky top-0 z-30 border-b border-aura-sand/20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Aura Wardrobe</h1>
                </div>
                <div className="flex gap-4">
                    <button className="text-slate-400 hover:text-primary transition-colors p-2 bg-white dark:bg-aura-clay rounded-xl shadow-sm border border-aura-sand/20">
                        <Search size={22} className="text-primary" />
                    </button>
                    <button className="text-slate-400 relative hover:text-primary transition-colors p-2 bg-white dark:bg-aura-clay rounded-xl shadow-sm border border-aura-sand/20">
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-aura-accent rounded-full border-2 border-aura-cream dark:border-aura-clay" />
                        <Bell size={22} className="text-primary" />
                    </button>
                </div>
            </header>

            <main className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 mt-6">

                {/* Wear Analytics */}
                <section className="px-6">
                    <div className="bg-primary/10 border border-primary/20 rounded-3xl p-5 flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 flex items-center gap-1"><History size={12} /> Wear Analytics</p>
                            <h3 className="text-2xl font-bold text-foreground tracking-tight">{itemsWornLastWeek} <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">items worn this week</span></h3>
                        </div>
                    </div>
                </section>

                {/* Aura Stylist Details */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center px-6">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Today's Outfit Options</h2>
                        <button
                            onClick={() => setOutfits(generateOutfits(inventory, weather?.temp ?? 15))}
                            className="flex items-center gap-1.5 text-xs font-bold text-primary transition-premium hover:opacity-70 bg-primary/10 px-3 py-1.5 rounded-full"
                        >
                            <RefreshCcw size={12} /> Re-plan
                        </button>
                    </div>

                    {/* Outfits Horizontal Scroll */}
                    <div className="flex overflow-x-auto gap-4 pb-4 px-6 snap-x hide-scrollbar">
                        {outfits.map((outfit) => (
                            <div key={outfit.id} className="min-w-[280px] snap-center bg-white dark:bg-aura-clay/50 rounded-[2.5rem] overflow-hidden shadow-sm border border-aura-sand/20 flex flex-col group transition-premium">
                                <div className="h-48 relative overflow-hidden">
                                    <img src={outfit.mockImage} alt={outfit.title} className="w-full h-full object-cover transition-premium overflow-hidden group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5">
                                        <h3 className="text-white font-bold text-xl leading-tight tracking-tight">{outfit.title}</h3>
                                        <p className="text-white/80 text-xs mt-1 font-medium italic">{outfit.description}</p>
                                    </div>
                                </div>
                                <div className="p-4 flex gap-3 overflow-x-auto hide-scrollbar bg-aura-sand/5">
                                    {outfit.items.map(item => (
                                        <div key={item.id} className="relative w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-aura-sand/30 bg-white">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mirror Scan & Save */}
                <section className="px-6 space-y-4">
                    <div className="flex justify-between items-end">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">The Aura Mirror</h2>
                        <div className="flex items-center gap-1 text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                            <Sparkles size={10} /> Vision Scan
                        </div>
                    </div>

                    <div className="glass rounded-[3rem] overflow-hidden aspect-[4/5] relative border border-white shadow-xl shadow-slate-200/50 dark:shadow-none group transition-premium">
                        {/* Mock Camera View */}
                        <div className="absolute inset-0 bg-aura-clay/90 flex flex-col items-center justify-center">
                            <Camera size={64} className={`transition - premium text - primary ${isScanning ? 'animate-pulse scale-110 shadow-[0_0_40px_var(--primary)] rounded-full' : 'opacity-50 group-hover:opacity-80'} `} />
                            <p className={`text - sm font - bold tracking - tight mt - 6 transition - opacity ${isScanning ? 'opacity-100 text-primary' : 'text-aura-sand opacity-50 group-hover:opacity-80'} `}>
                                {isScanning ? "Scanning Outfit..." : "Take a Selfie"}
                            </p>
                        </div>

                        {/* Scanning Overlay */}
                        {isScanning && (
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-primary/60 shadow-[0_0_30px_var(--primary)] animate-scan" style={{ animationDuration: '2s' }} />
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/10" />
                            </div>
                        )}

                        {!scannedItems && !isScanning && (
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-10">
                                <button onClick={handleScan} className="w-full bg-primary text-white py-4 px-4 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 active:scale-95 transition-premium group-hover:translate-y-[-4px]">
                                    <Scan size={20} /> Capture What I'm Wearing
                                </button>
                            </div>
                        )}

                        {/* Scan Results Overlay inside the mirror */}
                        {scannedItems && (
                            <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 flex flex-col animate-in slide-in-from-bottom-8 duration-500 z-10">
                                <div className="flex items-center justify-between mb-6 mt-4">
                                    <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
                                        <CheckCircle2 className="text-green-500" /> Outfit Detected
                                    </h3>
                                    <button onClick={() => setScannedItems(null)} className="text-slate-400 text-sm font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">Discard</button>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                                    {scannedItems.map(item => (
                                        <div key={item.id} className="flex flex-row items-center gap-4 bg-aura-sand/20 dark:bg-white/5 p-3 rounded-2xl border border-aura-sand/30">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shadow-sm bg-white" />
                                            <div>
                                                <p className="font-bold text-foreground text-sm leading-tight">{item.name}</p>
                                                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">{item.category}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pb-4">
                                    <button onClick={handleSaveWorn} className="w-full bg-foreground dark:bg-primary text-white py-4.5 rounded-[1.5rem] font-bold flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-premium">
                                        <CheckCircle2 size={20} /> Save to Worn History
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Declutter & Alternatives */}
                {unwornAlternatives.length > 0 && (
                    <section className="px-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <AlertCircle size={14} /> Forgotten Alternatives
                            </h2>
                        </div>
                        <div className="bg-aura-accent/5 border border-aura-accent/20 rounded-[2.5rem] p-6 space-y-6">
                            <p className="text-sm text-foreground leading-relaxed italic pr-4">"You haven't worn these items in over a month. Consider rotating them into your outfits, or listing them on Vinted!"</p>

                            <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-2 px-2 pb-2">
                                {unwornAlternatives.slice(0, 4).map(item => (
                                    <div key={item.id} className="min-w-[100px] flex flex-col gap-2 relative group">
                                        <div className="w-[100px] h-[100px] rounded-2xl overflow-hidden shadow-sm border border-aura-sand/20 bg-white">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-premium group-hover:scale-110" />
                                        </div>
                                        <p className="text-[10px] font-bold text-center truncate px-1 text-slate-600 dark:text-slate-300">{item.name}</p>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full bg-aura-accent text-white px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-premium shadow-lg shadow-aura-accent/20">
                                <Tag size={14} /> Start Vinted Prompt
                            </button>
                        </div>
                    </section>
                )}

                {/* Digital Archive */}
                <section className="px-6 space-y-4 pb-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Digital Archive</h2>
                        <div className="flex gap-2">
                            <button className="p-2.5 bg-white dark:bg-aura-clay/50 rounded-xl shadow-sm border border-aura-sand/20 text-primary transition-colors"><Filter size={16} /></button>
                            <button className="p-2.5 bg-white dark:bg-aura-clay/50 rounded-xl shadow-sm border border-aura-sand/20 text-primary transition-colors"><Grid size={16} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {inventory.map((item) => {
                            // Calculate days since worn gently
                            let daysAgoText = "Never";
                            if (item.lastWorn) {
                                const diffDays = Math.floor((Date.now() - new Date(item.lastWorn).getTime()) / (1000 * 60 * 60 * 24));
                                if (diffDays === 0) daysAgoText = "Today";
                                else if (diffDays === 1) daysAgoText = "Yesterday";
                                else daysAgoText = `${diffDays}d ago`;
                            }

                            return (
                                <div key={item.id} className="glass p-2.5 rounded-[2rem] space-y-3 group cursor-pointer transition-premium hover:translate-y-[-4px] active:scale-95 border border-white/50 shadow-sm hover:shadow-md bg-white/40 dark:bg-aura-clay/20">
                                    <div className="aspect-[4/5] bg-aura-sand/10 dark:bg-aura-clay/50 rounded-[1.5rem] overflow-hidden relative border border-aura-sand/10">
                                        <img className="w-full h-full object-cover transition-premium group-hover:scale-110" src={item.image} alt={item.name} />

                                        <div className="absolute top-2 right-2 bg-white/95 dark:bg-aura-clay/95 backdrop-blur px-2.5 py-1 rounded-full text-[9px] font-bold text-primary shadow-sm border border-aura-sand/20">
                                            {item.wornCount} Worn
                                        </div>

                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                                            className={`absolute bottom - 2 left - 2 p - 2 backdrop - blur rounded - full transition - colors shadow - sm border border - aura - sand / 20 ${item.liked ? 'bg-white text-aura-accent' : 'bg-white/80 text-slate-400 hover:text-red-500'} `}
                                        >
                                            <Heart size={14} fill={item.liked ? "var(--aura-accent)" : "none"} className={item.liked ? "text-aura-accent" : ""} />
                                        </button>
                                    </div>
                                    <div className="px-1.5 pb-1">
                                        <h3 className="font-bold text-foreground text-xs truncate tracking-tight">{item.name}</h3>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-[8px] text-primary font-bold uppercase tracking-widest">{item.category}</p>
                                            <span className="text-[9px] font-bold text-slate-400">{daysAgoText}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

            </main>

            {/* Floating Add Button */}
            <button
                onClick={() => setShowAddCamera(true)}
                className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center z-50 active:scale-95 transition-premium hover:scale-110"
            >
                <Plus size={28} />
            </button>

            {/* Live Camera Overlay */}
            {showAddCamera && (
                <CameraCapture
                    onCapture={handleCaptureNewItem}
                    onClose={() => setShowAddCamera(false)}
                />
            )}

            {/* Analyzing Loading Overlay */}
            {isAnalyzing && (
                <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <Loader2 size={48} className="text-white animate-spin mb-6" />
                    <p className="text-white font-bold text-lg">Aura Vision is scanning...</p>
                    <p className="text-white/60 text-sm mt-2">Identifying colors, categories, and style.</p>
                </div>
            )}

            {/* Manual Override Verification Overlay */}
            {manualOverrideItems && analyzingImage && !isAnalyzing && (
                <div className="fixed inset-0 z-[120] bg-aura-cream/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col pt-12 animate-in slide-in-from-bottom-8 duration-500">
                    <div className="px-6 flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-foreground tracking-tight">Verify Item</h2>
                        <button
                            onClick={() => { setManualOverrideItems(null); setAnalyzingImage(null); }}
                            className="p-2 bg-slate-200 dark:bg-slate-800 rounded-full text-slate-500"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 pb-32">
                        {/* Show captured image at the top */}
                        <div className="w-full h-48 rounded-3xl overflow-hidden mb-8 shadow-md border border-aura-sand/20">
                            <img src={analyzingImage} alt="Captured" className="w-full h-full object-cover" />
                        </div>

                        <div className="space-y-8">
                            {manualOverrideItems.map((item, index) => (
                                <div key={index} className="space-y-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-aura-sand/30">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles size={16} className="text-primary" />
                                        <h3 className="text-sm font-bold text-primary uppercase tracking-widest">AI Detection</h3>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 ml-1">Name</label>
                                        <input
                                            value={item.name || ""}
                                            onChange={(e) => handleOverrideChange(index, "name", e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 ml-1">Category</label>
                                            <select
                                                value={item.category || ""}
                                                onChange={(e) => handleOverrideChange(index, "category", e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            >
                                                <option value="Tops">Tops</option>
                                                <option value="Bottoms">Bottoms</option>
                                                <option value="Outerwear">Outerwear</option>
                                                <option value="Shoes">Shoes</option>
                                                <option value="Accessories">Accessories</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 ml-1">Color</label>
                                            <input
                                                value={item.color || ""}
                                                onChange={(e) => handleOverrideChange(index, "color", e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 ml-1">Warmth</label>
                                            <select
                                                value={item.warmthLevel || ""}
                                                onChange={(e) => handleOverrideChange(index, "warmthLevel", e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            >
                                                <option value="light">Light</option>
                                                <option value="medium">Medium</option>
                                                <option value="heavy">Heavy</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-400 ml-1">Formality</label>
                                            <select
                                                value={item.formality || ""}
                                                onChange={(e) => handleOverrideChange(index, "formality", e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            >
                                                <option value="casual">Casual</option>
                                                <option value="business-casual">Business Casual</option>
                                                <option value="formal">Formal</option>
                                                <option value="lounge">Lounge</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-aura-cream dark:from-slate-900 via-aura-cream/90 dark:via-slate-900/90 to-transparent">
                        <button
                            onClick={handleConfirmAdd}
                            className="w-full bg-primary text-white py-4.5 rounded-[1.5rem] font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-[0.98] transition-premium"
                        >
                            <CheckCircle2 size={20} /> Confirm & Save to Wardrobe
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
