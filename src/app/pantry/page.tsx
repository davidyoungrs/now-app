"use client";

import { Search, User, PiggyBank, AlertTriangle, MoreVertical, Plus, ScanLine, Edit2, ChevronRight, Check, X, Package, ShoppingCart, Calendar, Tag, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";
import { initialPantryItems, getExpiryLabel, PantryItem, ShoppingItem, calculateBestDeals } from "@/lib/pantry";

export default function Pantry() {
    const [activeTab, setActiveTab] = useState("Pantry");
    const [items, setItems] = useState<PantryItem[]>(initialPantryItems);
    const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
    const [showScan, setShowScan] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [showManualEntry, setShowManualEntry] = useState(false);
    const [restockSuggestion, setRestockSuggestion] = useState<PantryItem | null>(null);

    // Form State
    const [newItem, setNewItem] = useState({
        name: "",
        qty: "",
        expiryDate: new Date().toISOString().split('T')[0],
        category: "Pantry" as const
    });

    const handleConsume = (item: PantryItem) => {
        setItems(prev => prev.map(i =>
            i.id === item.id ? { ...i, consumed: true } : i
        ));
        setRestockSuggestion(item);
        setTimeout(() => setRestockSuggestion(null), 10000);
    };

    const handleAddManual = () => {
        if (!newItem.name) return;
        const item: PantryItem = {
            id: Math.random().toString(),
            name: newItem.name,
            qty: newItem.qty,
            expiryDate: newItem.expiryDate,
            category: newItem.category as any,
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop"
        };
        setItems(prev => [item, ...prev]);
        setShowManualEntry(false);
        setNewItem({ name: "", qty: "", expiryDate: new Date().toISOString().split('T')[0], category: "Pantry" });
    };

    const addToShoppingList = (item: PantryItem | { name: string, qty: string, category: string } | null) => {
        if (!item) return;
        const newItem: ShoppingItem = {
            id: Math.random().toString(),
            name: item.name,
            qty: item.qty,
            category: item.category,
            addedDate: new Date().toISOString().split('T')[0]
        };
        setShoppingList(prev => [newItem, ...prev]);
        setRestockSuggestion(null);
    };

    const handleScan = () => {
        setIsScanning(true);
        setShowScan(true);
        setTimeout(() => {
            setIsScanning(false);
            // Simulate adding a scanned item
            const item: PantryItem = {
                id: Math.random().toString(),
                name: "Organic Spinach",
                expiryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                qty: "1 bag",
                image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop",
                category: "Fridge"
            };
            setItems(prev => [item, ...prev]);
        }, 3000);
    };

    const filteredItems = items.filter(item => !item.consumed);
    const deals = useMemo(() => calculateBestDeals(shoppingList), [shoppingList]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Restock Prompt Toast */}
            {restockSuggestion && (
                <div className="fixed bottom-32 left-6 right-6 z-[60] bg-white dark:bg-aura-clay border border-primary/20 p-4 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <ShoppingCart size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-foreground">Add {restockSuggestion.name} to list?</p>
                                <p className="text-[10px] text-slate-500">You just consumed the last one.</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => addToShoppingList(restockSuggestion)}
                                className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-xl shadow-lg shadow-primary/20"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setRestockSuggestion(null)}
                                className="px-3 py-2 bg-slate-100 dark:bg-aura-clay/50 text-slate-500 text-[10px] font-bold rounded-xl"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Manual Entry Modal */}
            {showManualEntry && (
                <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-aura-clay w-full max-w-sm rounded-[3rem] p-8 shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-foreground">Manual Entry</h2>
                            <button onClick={() => setShowManualEntry(false)} className="p-2 bg-slate-100 dark:bg-aura-clay/50 rounded-full text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Item Name</label>
                                <div className="relative">
                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                    <input
                                        value={newItem.name}
                                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                        className="w-full bg-aura-sand/20 dark:bg-aura-clay/50 border border-aura-sand/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="Organic Apples..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Qty</label>
                                    <input
                                        value={newItem.qty}
                                        onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
                                        className="w-full bg-aura-sand/20 dark:bg-aura-clay/50 border border-aura-sand/10 rounded-2xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="6 units"
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Category</label>
                                    <select
                                        value={newItem.category}
                                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })}
                                        className="w-full bg-aura-sand/20 dark:bg-aura-clay/50 border border-aura-sand/10 rounded-2xl py-3.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                                    >
                                        <option value="Pantry">Pantry</option>
                                        <option value="Fridge">Fridge</option>
                                        <option value="Spices">Spices</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Expiry Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                    <input
                                        type="date"
                                        value={newItem.expiryDate}
                                        onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                                        className="w-full bg-aura-sand/20 dark:bg-aura-clay/50 border border-aura-sand/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleAddManual}
                                className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 mt-4 transition-premium hover:scale-[1.02] active:scale-95"
                            >
                                Add to Inventory
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Scan Overlay */}
            {showScan && (
                <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
                    <div className="relative w-full aspect-[3/4] max-w-sm rounded-[3rem] overflow-hidden border-2 border-primary/50 shadow-2xl shadow-primary/20">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="w-64 h-64 border-2 border-dashed border-white/30 rounded-3xl flex items-center justify-center">
                                <ScanLine size={48} className={`text-primary ${isScanning ? "animate-bounce" : "opacity-50"}`} />
                            </div>
                            <p className="text-white font-bold mt-8 tracking-widest uppercase text-xs">
                                {isScanning ? "Scanning Aura..." : "Aura Detected!"}
                            </p>
                        </div>
                        {isScanning && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_20px_rgba(234,88,12,0.5)] animate-scan" />
                        )}
                    </div>
                    {!isScanning && (
                        <div className="mt-8 flex flex-col items-center gap-4 animate-in slide-in-from-bottom-4">
                            <div className="bg-white dark:bg-aura-clay p-6 rounded-[2.5rem] shadow-xl border border-white/20 w-full max-w-xs space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">Organic Spinach</p>
                                        <p className="text-[10px] font-bold text-primary uppercase">Expires in 1 day</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowScan(false)}
                                className="px-12 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-premium hover:scale-105"
                            >
                                Add to Aura
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => setShowScan(false)}
                        className="absolute top-12 right-6 p-3 bg-white/10 rounded-full text-white backdrop-blur-md"
                    >
                        <X size={24} />
                    </button>
                </div>
            )}

            {/* Sticky Header */}
            <header className="sticky top-0 z-30 bg-aura-cream/80 dark:bg-aura-clay/80 backdrop-blur-md px-6 pt-12 pb-4 space-y-4 border-b border-aura-sand/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Aura Pantry</h1>
                    </div>
                    <button className="w-10 h-10 bg-white dark:bg-aura-clay/50 rounded-2xl flex items-center justify-center shadow-sm border border-aura-sand/30">
                        <User size={20} className="text-primary" />
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        className="w-full bg-white dark:bg-aura-clay/50 border border-aura-sand/20 rounded-2xl py-3.5 pl-11 pr-4 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
                        placeholder="Search pantry items..."
                        type="text"
                    />
                </div>

                <nav className="flex p-1 bg-aura-sand/30 dark:bg-aura-clay/50 rounded-2xl">
                    {["Pantry", "Inventory", "Shopping"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${activeTab === tab
                                ? "bg-white dark:bg-aura-clay shadow-sm text-primary"
                                : "text-slate-500 hover:text-primary dark:text-slate-400"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </header>

            <main className="px-6 pb-32 space-y-8 animate-in fade-in duration-700">
                {activeTab === "Shopping" ? (
                    <div className="space-y-8 animate-in slide-in-from-right-4">
                        {/* Shopping Items List */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Restock List</h2>
                                <span className="text-[10px] font-bold text-primary">{shoppingList.length} items</span>
                            </div>

                            {shoppingList.length === 0 ? (
                                <div className="bg-aura-sand/10 border-2 border-dashed border-aura-sand/20 rounded-[2.5rem] py-12 flex flex-col items-center justify-center text-center px-8">
                                    <ShoppingCart size={40} className="text-aura-sand mb-4" />
                                    <p className="text-sm font-medium text-slate-500">Your shopping list is empty.</p>
                                    <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">Aura suggests items when you run out</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {shoppingList.map((item) => (
                                        <div key={item.id} className="glass rounded-[2rem] p-4 flex items-center gap-4 border border-white/50">
                                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                                <Package size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-foreground">{item.name}</h3>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Target QTY</p>
                                                    <p className="font-bold text-foreground text-xs">{item.qty}</p>
                                                </div>
                                                <button
                                                    onClick={() => setShoppingList(prev => prev.filter(i => i.id !== item.id))}
                                                    className="p-2 text-slate-300 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Best Deals Tracker */}
                        <section className="space-y-4">
                            <div className="flex justify-between items-end">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Price Intelligence</h2>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Comparing {deals.length} Stores</span>
                            </div>
                            <div className="bg-aura-sand/20 dark:bg-aura-clay/30 rounded-[2.5rem] p-6 space-y-6 border border-aura-sand/10">
                                {deals.map((store, idx) => (
                                    <div key={idx} className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2.5 h-2.5 rounded-full ${store.color} shadow-sm`} />
                                                <h4 className="font-bold text-sm tracking-tight text-foreground">{store.name}</h4>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[8px] font-bold text-slate-400 uppercase">Estimated Total</p>
                                                <p className="text-lg font-bold text-primary">${store.total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {store.items.length === 0 ? (
                                                <p className="text-[10px] text-slate-400 italic">No price data available for items on list.</p>
                                            ) : (
                                                store.items.map((item, i) => (
                                                    <div key={i} className="flex justify-between items-center text-xs p-3.5 bg-white/60 dark:bg-aura-clay/40 rounded-2xl shadow-sm border border-white">
                                                        <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                                                        <span className="font-bold text-foreground">{item.price}</span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Usage Analytics Preview */}
                        <section className="bg-aura-sage/10 border border-aura-sage/20 rounded-[2.5rem] p-6 flex items-center justify-between cursor-pointer group transition-premium hover:bg-aura-sage/15">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary text-white p-3.5 rounded-2xl shadow-lg shadow-primary/20 transition-premium group-hover:rotate-12">
                                    <PiggyBank size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-primary">Consumption Analytics</p>
                                    <p className="text-xl font-bold text-foreground">Suggesting Milk</p>
                                    <p className="text-xs text-slate-500 font-medium italic">"You usually run out of milk on Thursdays."</p>
                                </div>
                            </div>
                        </section>

                        {/* Pantry Items */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">{activeTab} Inventory</h2>
                                <button className="text-xs font-bold text-primary transition-premium hover:opacity-70">Sort by Expiry</button>
                            </div>

                            <div className="space-y-3">
                                {filteredItems.filter(i => activeTab === "Pantry" || i.category === activeTab).map((item) => {
                                    const expiryInfo = getExpiryLabel(item.expiryDate);
                                    return (
                                        <div key={item.id} className="glass rounded-[2rem] p-4 flex items-center gap-4 group cursor-pointer transition-premium hover:translate-x-1 active:scale-[0.98] border border-white/50">
                                            <div className="w-14 h-14 bg-aura-sand/20 dark:bg-aura-clay/50 rounded-2xl overflow-hidden shadow-inner border border-aura-sand/10 relative">
                                                <img className="w-full h-full object-cover transition-premium group-hover:scale-110" src={item.image} alt={item.name} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-foreground">{item.name}</h3>
                                                <div className="flex items-center gap-2">
                                                    {expiryInfo.urgency === 'soon' || expiryInfo.urgency === 'today' ? (
                                                        <AlertTriangle size={10} className="text-orange-400" />
                                                    ) : null}
                                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${expiryInfo.urgency === 'today' ? 'text-orange-500' : 'text-slate-400'}`}>
                                                        {expiryInfo.label}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right mr-2">
                                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">QTY</p>
                                                    <p className="font-bold text-foreground">{item.qty}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleConsume(item);
                                                    }}
                                                    className="w-10 h-10 bg-aura-sage/20 text-aura-sage-dark rounded-xl flex items-center justify-center hover:bg-aura-sage/40 transition-premium"
                                                    title="Mark as consumed"
                                                >
                                                    <Check size={18} />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToShoppingList(item);
                                                    }}
                                                    className="p-1 text-slate-300 hover:text-primary transition-colors"
                                                    title="Add to shopping list"
                                                >
                                                    <ShoppingCart size={18} />
                                                </button>
                                                <button className="text-slate-300 hover:text-primary transition-colors p-1">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                )}
            </main>

            {/* FAB */}
            <div className="fixed bottom-28 right-6 pointer-events-none z-50">
                <div className="group relative pointer-events-auto">
                    <div className="absolute bottom-20 right-0 flex flex-col gap-3 opacity-0 translate-y-4 pointer-events-none group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-300">
                        <button
                            onClick={handleScan}
                            className="glass px-6 py-3.5 rounded-2xl flex items-center gap-3 whitespace-nowrap active:scale-95 transition-transform border border-white shadow-xl"
                        >
                            <ScanLine size={18} className="text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Mirror Scan</span>
                        </button>
                        <button
                            onClick={() => setShowManualEntry(true)}
                            className="glass px-6 py-3.5 rounded-2xl flex items-center gap-3 whitespace-nowrap active:scale-95 transition-transform border border-white shadow-xl"
                        >
                            <Edit2 size={18} className="text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Manual Entry</span>
                        </button>
                    </div>

                    <button className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center active:scale-90 transition-all hover:scale-110">
                        <Plus size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
}
