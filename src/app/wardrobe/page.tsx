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

            <main className="px-6 pb-32 space-y-10 animate-in fade-in duration-700">

                {/* Mirror Scan UI - Refined for Aura */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Mirror Scan</h2>
                        <div className="flex items-center gap-1 text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                            <Sparkles size={10} />
                            <span>Gemini AI Active</span>
                        </div>
                    </div>
                    <div className="glass rounded-[3rem] overflow-hidden aspect-[4/5] relative border border-white shadow-2xl group cursor-pointer">
                        {/* Mock Camera View */}
                        <div className="absolute inset-0 bg-aura-clay/90 flex items-center justify-center">
                            <div className="text-aura-sand flex flex-col items-center gap-4 opacity-50 group-hover:opacity-80 transition-opacity">
                                <Camera size={64} className="group-hover:scale-110 transition-premium text-primary" />
                                <p className="text-sm font-medium tracking-tight">Step into the Aura Mirror</p>
                            </div>
                        </div>

                        {/* Scanning Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary/40 shadow-[0_0_20px_var(--primary)] animate-scan" />
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
                        </div>

                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-10">
                            <button className="w-full bg-primary text-white py-4.5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 active:scale-95 transition-premium group-hover:translate-y-[-4px]">
                                <Scan size={20} className="animate-pulse" />
                                Capture Outfit
                            </button>
                        </div>
                    </div>
                </section>

                {/* AI Stylist Recommendations */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Weekly Stylist</h2>
                        <button className="flex items-center gap-1.5 text-xs font-bold text-primary transition-premium hover:opacity-70">
                            <RefreshCcw size={14} /> Re-plan Week
                        </button>
                    </div>
                    <div className="bg-aura-sage/10 border border-aura-sage/20 p-8 rounded-[3rem] space-y-6">
                        <div className="text-center space-y-1">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-primary">Next 3 Days</p>
                            <h3 className="text-xl font-bold text-foreground italic">"Meetings & Rain"</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {closetItems.slice(0, 4).map((item, idx) => (
                                <div key={idx} className="aspect-[4/5] bg-white dark:bg-aura-clay/50 rounded-2xl overflow-hidden shadow-sm border border-aura-sand/20 group cursor-pointer transition-premium hover:scale-105 active:scale-95">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-premium group-hover:scale-110" />
                                </div>
                            ))}
                        </div>
                        <button className="w-full bg-foreground text-white dark:bg-primary dark:text-white py-4.5 rounded-[1.5rem] font-bold shadow-lg shadow-primary/10 active:scale-[0.98] transition-premium">
                            Set as Planned Outfits
                        </button>
                    </div>
                </section>

                {/* Declutter Assistant */}
                <section className="bg-aura-accent/5 border-2 border-dashed border-aura-accent/30 p-8 rounded-[3rem] flex flex-col gap-6 group cursor-pointer transition-premium hover:bg-aura-accent/10">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white dark:bg-aura-clay/50 rounded-2xl p-2 shadow-sm flex-shrink-0 transition-premium group-hover:rotate-6">
                            <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&h=100&fit=crop" className="w-full h-full object-cover rounded-xl" alt="Blouse" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-[10px] font-bold text-aura-accent uppercase tracking-widest">Declutter Assistant</p>
                            <h3 className="font-bold text-lg text-foreground leading-tight">Last worn: Oct 2025</h3>
                            <p className="text-xs text-slate-500 leading-relaxed italic">"Sell on Vinted to earn ~$45"</p>
                        </div>
                    </div>
                    <button className="w-full bg-aura-accent text-white px-6 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-premium shadow-lg shadow-aura-accent/20">
                        <Tag size={12} /> Start Vinted Prompt
                    </button>
                </section>

                {/* Archive / Closet */}
                <section className="space-y-4 pb-12">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Digital Archive</h2>
                        <div className="flex gap-2">
                            <button className="p-3 bg-white dark:bg-aura-clay/50 rounded-2xl shadow-sm border border-aura-sand/20 text-primary transition-colors"><Filter size={18} /></button>
                            <button className="p-3 bg-white dark:bg-aura-clay/50 rounded-2xl shadow-sm border border-aura-sand/20 text-primary transition-colors"><Grid size={18} /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {closetItems.map((item, idx) => (
                            <div key={idx} className="glass p-3 rounded-[2.5rem] space-y-4 group cursor-pointer transition-premium hover:translate-y-[-4px] active:scale-95 border border-white/50">
                                <div className="aspect-[3/4] bg-aura-sand/10 dark:bg-aura-clay/50 rounded-[2rem] overflow-hidden relative border border-aura-sand/10">
                                    <img className="w-full h-full object-cover transition-premium group-hover:scale-110" src={item.image} alt={item.name} />
                                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-aura-clay/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold text-primary shadow-sm">
                                        {item.worn} Worn
                                    </div>
                                    <button className="absolute bottom-3 left-3 p-2 bg-white/80 backdrop-blur rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-sm">
                                        <Heart size={16} fill={item.liked ? "var(--aura-accent)" : "none"} className={item.liked ? "text-aura-accent" : ""} />
                                    </button>
                                </div>
                                <div className="px-2 pb-2">
                                    <h3 className="font-bold text-foreground truncate tracking-tight">{item.name}</h3>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-[9px] text-primary font-bold uppercase tracking-widest">{item.category}</p>
                                        <span className="text-[9px] font-bold text-slate-300 italic">Last worn {item.last}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            {/* Floating Add Button */}
            <button className="fixed bottom-28 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center z-50 active:scale-95 transition-premium hover:scale-110">
                <Plus size={32} />
            </button>

        </div>
    );
}
