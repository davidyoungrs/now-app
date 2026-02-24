"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Refrigerator, Shirt, Settings } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function Navigation() {
    const pathname = usePathname();

    const navItems = [
        { label: "Home", href: "/", icon: LayoutDashboard },
        { label: "Pantry", href: "/pantry", icon: Refrigerator },
        { label: "Wardrobe", href: "/wardrobe", icon: Shirt },
        { label: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-8 py-3 max-w-md mx-auto z-50">
            <div className="flex justify-between items-center">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-colors duration-200",
                                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            )}
                        >
                            <Icon size={24} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
