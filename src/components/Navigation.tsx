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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 glass rounded-[2.5rem] shadow-2xl z-50 transition-premium max-w-fit mx-auto">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "relative flex flex-col items-center justify-center w-14 h-14 rounded-[2rem] transition-premium group",
                            isActive
                                ? "bg-slate-900 dark:bg-primary text-white dark:text-slate-900 shadow-xl"
                                : "text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                    >
                        <Icon size={22} className={cn("transition-premium", isActive ? "scale-110" : "group-hover:scale-110")} />
                        <span className={cn(
                            "absolute -bottom-8 text-[9px] font-bold uppercase tracking-widest opacity-0 transition-premium",
                            isActive ? "opacity-100 -bottom-6" : "group-hover:opacity-100 group-hover:-bottom-6"
                        )}>
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </div>
    );
}
