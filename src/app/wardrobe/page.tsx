"use client";

import { Camera, RefreshCcw, Tag, Heart, Grid, Filter, Plus } from "lucide-react";

export default function Wardrobe() {
    const closet = [
        { name: "Vintage Plaid Mini", worn: "12x", last: "Oct 12", image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=200&h=250&fit=crop", liked: true },
        { name: "Basics Organic Tee", worn: "34x", last: "Yesterday", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=250&fit=crop" },
        { name: "Chelsea Leather Boots", worn: "21x", last: "3 days ago", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=250&fit=crop" },
        { name: "Parisian Linen Blazer", worn: "8x", last: "Oct 28", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=250&fit=crop", liked: true },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-6 pt-12 pb-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Cher's Closet</h1>
                <div className="flex gap-4">
                    <button className="text-slate-400"><Search size={22} /></button>
                    <button className="text-slate-400 relative">
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light" />
                        <span className="material-icons text-2xl">notifications</span>
                    </button>
                </div>
            </header>

            <main className="px-6 pb-32 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Mirror Scan */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h2 className="text-xl font-bold tracking-tight">Mirror Scan</h2>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-widest">Live AI</span>
                    </div>
                    <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer">
                        <img
                            className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-105"
                            src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop"
                            alt="Mirror Scan Placeholder"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

                        {/* Scan UI Overlays */}
                        <div className="absolute inset-8 border-2 border-primary/40 rounded-3xl animate-pulse">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 space-y-3">
                            <div className="glass px-4 py-2 rounded-full w-fit flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                                <span className="text-xs font-bold text-white uppercase tracking-tighter">Identifying: Yellow Plaid Blazer</span>
                            </div>
                            <div className="glass px-4 py-2 rounded-full w-fit flex items-center gap-2 opacity-80">
                                <div className="w-2 h-2 bg-primary rounded-full" />
                                <span className="text-xs font-bold text-white uppercase tracking-tighter">Identifying: Pleated Mini Skirt</span>
                            </div>
                        </div>

                        <button className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                            <Camera size={32} className="text-slate-900" />
                        </button>
                    </div>
                </section>

                {/* Mix & Match */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold tracking-tight">Mix & Match</h2>
                        <button className="flex items-center gap-1.5 text-xs font-bold text-primary">
                            <RefreshCcw size={14} /> Refresh
                        </button>
                    </div>
                    <div className="glass p-6 rounded-[2.5rem] space-y-6">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Today's Look: Brunch</p>
                        <div className="grid grid-cols-2 gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner">
                                    <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=150&h=150&fit=crop`} alt="Outfit part" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <button className="w-full bg-primary text-slate-900 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
                            Log Outfit
                        </button>
                    </div>
                </section>

                {/* Sell Alert */}
                <section className="bg-primary/5 border-2 border-dashed border-primary/20 p-6 rounded-[2.5rem] flex items-center gap-6">
                    <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-sm flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&h=100&fit=crop" className="w-full h-full object-cover rounded-lg" alt="Blouse" />
                    </div>
                    <div className="flex-1 space-y-1">
                        <h3 className="font-bold">Make room for more?</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">You haven't worn this <span className="font-bold">silk blouse</span> in 6 months. It could earn you <span className="text-primary font-bold">$45</span>.</p>
                        <button className="mt-2 text-white bg-slate-900 dark:bg-primary dark:text-slate-900 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Tag size={12} /> Sell on Vinted
                        </button>
                    </div>
                </section>

                {/* Closet */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold tracking-tight">Your Closet</h2>
                        <div className="flex gap-2">
                            <button className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm"><Filter size={18} /></button>
                            <button className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm"><Grid size={18} /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {closet.map((item, idx) => (
                            <div key={idx} className="glass rounded-[2rem] overflow-hidden flex flex-col group">
                                <div className="relative aspect-[4/5]">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-slate-400 hover:text-red-500">
                                        <Heart size={16} fill={item.liked ? "currentColor" : "none"} />
                                    </button>
                                </div>
                                <div className="p-4 space-y-3">
                                    <h3 className="font-bold text-sm leading-tight line-clamp-1">{item.name}</h3>
                                    <div className="flex justify-between items-center text-[10px] font-medium text-slate-500 uppercase tracking-tighter">
                                        <span className="flex items-center gap-1"><RefreshCcw size={10} /> {item.worn}</span>
                                        <span className="flex items-center gap-1"><Tag size={10} /> {item.last}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            {/* Floating Add Button */}
            <button className="fixed bottom-24 left-1/2 -translate-x-1/2 w-14 h-14 bg-primary text-slate-900 rounded-full shadow-xl shadow-primary/30 flex items-center justify-center z-50 active:scale-90 transition-transform">
                <Plus size={28} />
            </button>

        </div>
    );
}

function Search({ size, className }: { size: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
        </svg>
    );
}
