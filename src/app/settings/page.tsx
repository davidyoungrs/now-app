"use client";

import { User, Bell, Shield, Moon, Palette, HelpCircle, LogOut, ChevronRight } from "lucide-react";

export default function Settings() {
    const sections = [
        {
            title: "Profile",
            items: [
                { icon: User, label: "Personal Information", value: "David Y." },
                { icon: Bell, label: "Notifications", value: "On" },
            ]
        },
        {
            title: "Aesthetics",
            items: [
                { icon: Palette, label: "Theme", value: "Warm Organic" },
                { icon: Moon, label: "Dark Mode", value: "System" },
            ]
        },
        {
            title: "Security & Support",
            items: [
                { icon: Shield, label: "Privacy", value: "" },
                { icon: HelpCircle, label: "Help Center", value: "" },
            ]
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-aura-cream dark:bg-aura-clay animate-in fade-in duration-700">
            <header className="px-6 pt-12 pb-8">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
                <p className="text-sm text-slate-500 mt-1 italic">Tailor your Aura experience</p>
            </header>

            <main className="px-6 space-y-8 pb-32">
                {sections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                        <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">{section.title}</h2>
                        <div className="glass rounded-[2rem] overflow-hidden border border-white/50">
                            {section.items.map((item, itemIdx) => (
                                <button
                                    key={itemIdx}
                                    className="w-full flex items-center justify-between p-5 hover:bg-white/50 dark:hover:bg-white/5 transition-colors group border-b border-aura-sand/10 last:border-0"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-aura-sage/10 rounded-xl text-primary transition-premium group-hover:scale-110">
                                            <item.icon size={20} />
                                        </div>
                                        <span className="font-semibold text-foreground tracking-tight">{item.label}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {item.value && <span className="text-xs font-medium text-slate-400">{item.value}</span>}
                                        <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                <button className="w-full flex items-center gap-4 p-5 glass rounded-[2rem] text-aura-accent font-bold hover:bg-aura-accent/10 transition-colors border border-aura-accent/20">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </main>
        </div>
    );
}
