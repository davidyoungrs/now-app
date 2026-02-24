"use client";

import { Shirt, Trash2, ExternalLink, Plus, Camera, Sparkles, Filter, ChevronRight, Scan, Search, Bell, Heart, RefreshCcw, Tag, Grid } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Wardrobe() {
    const closetItems = [
        { name: "Vintage Plaid Mini", worn: "12x", last: "Oct 12", category: "Skirts", image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=200&h=250&fit=crop", liked: true },
        { name: "Basics Organic Tee", worn: "34x", last: "Yesterday", category: "Tops", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop" },
        { name: "Chelsea Leather Boots", worn: "21x", last: "3 days ago", category: "Shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=250&fit=crop" },
        { name: "Parisian Linen Blazer", worn: "8x", last: "Oct 28", category: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=250&fit=crop", liked: true },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-6 pt-12 pb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Cher's Closet</h1>
                <div className="flex gap-4">
                    <button className="text-slate-400 hover:text-primary transition-colors"><Search size={22} /></button>
                    <button className="text-slate-400 relative hover:text-primary transition-colors">
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light" />
                        <Bell size={22} />
                    </button>
                </div>
            </header>

            <main className="px-6 pb-32 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Mirror Scan UI */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Mirror Scan</h2>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Live AI</span>
                    </div>
                    <div className="glass rounded-[2.5rem] overflow-hidden aspect-[4/5] relative border border-white/20 shadow-2xl group cursor-pointer">
                        {/* Mock Camera View */}
                        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                            <div className="text-slate-500 flex flex-col items-center gap-4 opacity-50 group-hover:opacity-80 transition-opacity">
                                <Camera size={64} className="group-hover:scale-110 transition-premium" />
                                <p className="text-sm font-medium">Position yourself in front of the mirror</p>
                            </div>
                        </div>

                        {/* Scanning Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary/40 shadow-[0_0_15px_rgba(93,230,25,0.5)] animate-scan" />
                        </div>

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-8">
                            <button className="w-full bg-primary text-slate-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-95 transition-premium group-hover:translate-y-[-4px]">
                                <Scan size={20} className="animate-pulse" />
                                Start Mirror Scan
                            </button>
                        </div>
                    </div>
                </section>

                {/* Mix & Match */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Mix & Match</h2>
                        <button className="flex items-center gap-1.5 text-xs font-bold text-primary transition-premium hover:opacity-70">
                            <RefreshCcw size={14} /> Refresh
                        </button>
                    </div>
                    <div className="glass p-6 rounded-[2.5rem] space-y-6">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 text-center">Today's Look: Brunch</p>
                        <div className="grid grid-cols-2 gap-4">
                            {closetItems.slice(0, 4).map((item, idx) => (
                                <div key={idx} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner group cursor-pointer transition-premium hover:scale-105 active:scale-95">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-premium group-hover:scale-110" />
                                </div>
                            ))}
                        </div>
                        <button className="w-full bg-slate-900 dark:bg-primary text-white dark:text-slate-900 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-premium">
                            Log Outfit
                        </button>
                    </div>
                </section>

                {/* Sell Alert */}
                <section className="bg-primary/5 border-2 border-dashed border-primary/20 p-6 rounded-[2.5rem] flex items-center gap-6 group cursor-pointer transition-premium hover:bg-primary/10">
                    <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-sm flex-shrink-0 transition-premium group-hover:scale-110">
                        <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&h=100&fit=crop" className="w-full h-full object-cover rounded-lg" alt="Blouse" />
                    </div>
                    <div className="flex-1 space-y-1">
                        <h3 className="font-bold">Make room for more?</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">You haven't worn this <span className="font-bold">silk blouse</span> in 6 months. It could earn you <span className="text-primary font-bold">$45</span>.</p>
                        <button className="mt-2 text-white bg-slate-900 dark:bg-primary dark:text-slate-900 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-premium">
                            <Tag size={12} /> Sell on Vinted
                        </button>
                    </div>
                </section>

                {/* Closet */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Closet</h2>
                        <div className="flex gap-2">
                            <button className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:text-primary transition-colors"><Filter size={18} /></button>
                            <button className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:text-primary transition-colors"><Grid size={18} /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {closetItems.map((item, idx) => (
                            <div key={idx} className="glass p-3 rounded-[2rem] space-y-3 group cursor-pointer transition-premium hover:scale-[1.02] active:scale-95">
                                <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-[1.5rem] overflow-hidden relative">
                                    <img className="w-full h-full object-cover transition-premium group-hover:scale-110" src={item.image} alt={item.name} />
                                    <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.worn} Worn
                                    </div>
                                    <button className="absolute bottom-2 left-2 p-1.5 bg-white/80 backdrop-blur rounded-full text-slate-400 hover:text-red-500 transition-colors">
                                        <Heart size={14} fill={item.liked ? "currentColor" : "none"} className={item.liked ? "text-red-500" : ""} />
                                    </button>
                                </div>
                                <div className="px-1">
                                    <h3 className="font-bold text-sm truncate">{item.name}</h3>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{item.category}</p>
                                        <span className="text-[9px] font-bold text-slate-300">Last: {item.last}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            {/* Floating Add Button */}
            <button className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-slate-900 rounded-full shadow-xl shadow-primary/30 flex items-center justify-center z-50 active:scale-90 transition-premium hover:scale-110">
                <Plus size={28} />
            </button>

        </div>
    );
}
