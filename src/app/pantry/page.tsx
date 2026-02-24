"use client";

import { Search, User, PiggyBank, AlertTriangle, MoreVertical, Plus, ScanLine, Edit2, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Pantry() {
    const [activeTab, setActiveTab] = useState("Pantry");

    const pantryItems = [
        { name: "Penne Pasta", date: "Oct 12", qty: "2 units", image: "https://images.unsplash.com/photo-1551462147-3a8836a9b1f2?w=100&h=100&fit=crop" },
        { name: "Olive Oil", date: "Oct 05", qty: "750ml", image: "https://images.unsplash.com/photo-1474979266404-7eaacabc88c5?w=100&h=100&fit=crop" },
    ];

    const stores = [
        {
            name: "FreshMart Central", color: "bg-blue-500", items: [
                { name: "Whole Milk", price: "$3.20" },
                { name: "Whole Wheat Bread", price: "$2.50" }
            ]
        },
        {
            name: "Discount Depot", color: "bg-red-500", items: [
                { name: "Coffee Beans", price: "$12.00", highlight: true }
            ]
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
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
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Inventory</h2>
                        <button className="text-xs font-bold text-primary transition-premium hover:opacity-70">Sort by Expiry</button>
                    </div>

                    <div className="space-y-3">
                        {pantryItems.map((item, idx) => (
                            <div key={idx} className="glass rounded-[2rem] p-4 flex items-center gap-4 group cursor-pointer transition-premium hover:translate-x-1 active:scale-[0.98] border border-white/50">
                                <div className="w-14 h-14 bg-aura-sand/20 dark:bg-aura-clay/50 rounded-2xl overflow-hidden shadow-inner border border-aura-sand/10">
                                    <img className="w-full h-full object-cover transition-premium group-hover:scale-110" src={item.image} alt={item.name} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-foreground">{item.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle size={10} className="text-orange-400" />
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Added: {item.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">QTY</p>
                                        <p className="font-bold text-foreground">{item.qty}</p>
                                    </div>
                                    <button className="text-slate-300 hover:text-primary transition-colors p-2">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Price Tracker Placeholder */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Price Tracker</h2>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Best Deals Nearest</span>
                    </div>
                    <div className="bg-aura-sand/20 dark:bg-aura-clay/30 rounded-[2.5rem] p-6 space-y-5 border border-aura-sand/10">
                        {stores.map((store, idx) => (
                            <div key={idx} className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2.5 h-2.5 rounded-full ${store.color} shadow-sm`} />
                                        <h4 className="font-bold text-sm tracking-tight text-foreground">{store.name}</h4>
                                    </div>
                                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/50 text-slate-500 uppercase tracking-widest">
                                        {store.items.length} suggestions
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {store.items.map((item: any, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm p-4 bg-white/60 dark:bg-aura-clay/40 rounded-2xl shadow-sm border border-white group cursor-pointer transition-premium hover:bg-white active:scale-95">
                                            <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className={`font-bold ${item.highlight ? "text-primary" : "text-foreground"}`}>{item.price}</span>
                                                <ChevronRight size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* FAB */}
            <div className="fixed bottom-28 right-6 pointer-events-none z-50">
                <div className="group relative pointer-events-auto">
                    <div className="absolute bottom-20 right-0 flex flex-col gap-3 opacity-0 translate-y-4 pointer-events-none group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-300">
                        <button className="glass px-6 py-3.5 rounded-2xl flex items-center gap-3 whitespace-nowrap active:scale-95 transition-transform border border-white shadow-xl">
                            <ScanLine size={18} className="text-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Scan Barcode</span>
                        </button>
                        <button className="glass px-6 py-3.5 rounded-2xl flex items-center gap-3 whitespace-nowrap active:scale-95 transition-transform border border-white shadow-xl">
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
