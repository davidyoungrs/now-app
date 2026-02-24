"use client";

import { Search, User, Savings, AlertTriangle, MoreVertical, Plus, ScanLine, Edit2 } from "lucide-react";
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
            <header className="sticky top-0 z-30 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 pt-8 pb-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Smart Pantry</h1>
                    <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm">
                        <User size={20} className="text-slate-600 dark:text-slate-300" />
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        className="w-full bg-white dark:bg-slate-900 border-0 rounded-2xl py-3.5 pl-10 pr-4 shadow-sm focus:ring-2 focus:ring-primary text-sm transition-shadow"
                        placeholder="Search items..."
                        type="text"
                    />
                </div>

                <nav className="flex p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl">
                    {["Pantry", "Fridge", "Shopping"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${activeTab === tab
                                    ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </header>

            <main className="px-4 pb-32 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Smart Savings */}
                <section className="bg-primary/10 dark:bg-primary/5 border border-primary/20 rounded-3xl p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20">
                            <span className="material-icons">savings</span>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-primary/80">Smart Optimizer</p>
                            <p className="text-xl font-bold">Save $12.50 today</p>
                        </div>
                    </div>
                    <button className="bg-primary text-slate-900 px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm active:scale-95 transition-transform">
                        View Deals
                    </button>
                </section>

                {/* Pantry Items */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Pantry Items</h2>
                        <button className="text-xs font-bold text-primary">Sort A-Z</button>
                    </div>

                    <div className="space-y-3">
                        {pantryItems.map((item, idx) => (
                            <div key={idx} className="glass rounded-[1.5rem] p-4 flex items-center gap-4 group">
                                <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner">
                                    <img className="w-full h-full object-cover transition-transform group-hover:scale-110" src={item.image} alt={item.name} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p className="text-slate-400 text-xs">Added: {item.date}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">QTY</p>
                                        <p className="font-bold">{item.qty}</p>
                                    </div>
                                    <button className="text-slate-300 hover:text-slate-500">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Store Optimization */}
                <section className="space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Store Optimization</h2>
                    <div className="bg-slate-200/30 dark:bg-slate-900/50 rounded-[2rem] p-6 space-y-6">
                        {stores.map((store, idx) => (
                            <div key={idx} className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2.5 h-2.5 rounded-full ${store.color}`} />
                                        <h4 className="font-bold text-sm tracking-tight">{store.name}</h4>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${store.color.replace('bg-', 'text-')} ${store.color.replace('bg-', 'bg-')}/10`}>
                                        {store.items.length} Items
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {store.items.map((item, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm p-3.5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                            <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                                            <span className={`font-bold ${item.highlight ? "text-primary" : ""}`}>{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* FAB */}
            <div className="fixed bottom-24 right-6 pointer-events-none z-40">
                <div className="group relative pointer-events-auto">
                    {/* Menu Items */}
                    <div className="absolute bottom-20 right-0 flex flex-col gap-3 opacity-0 translate-y-4 pointer-events-none group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto transition-all duration-300">
                        <button className="glass px-5 py-3 rounded-2xl flex items-center gap-3 whitespace-nowrap active:scale-95 transition-transform">
                            <ScanLine size={18} className="text-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest">Scan Barcode</span>
                        </button>
                        <button className="glass px-5 py-3 rounded-2xl flex items-center gap-3 whitespace-nowrap active:scale-95 transition-transform">
                            <Edit2 size={18} className="text-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest">Manual Entry</span>
                        </button>
                    </div>

                    <button className="w-16 h-16 bg-primary text-slate-900 rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center active:scale-90 transition-transform">
                        <Plus size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
}
