"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { href: "/", label: "POKEMON" },
    { href: "/moves", label: "MOVES" },
    { href: "/abilities", label: "ABILITIES" },
    { href: "/types", label: "TYPES" },
    { href: "/items", label: "ITEMS" },
    { href: "/berries", label: "BERRIES" },
    { href: "/locations", label: "LOCATIONS" },
    { href: "/games", label: "GAMES" },
];

export function VoidNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-void-black/80 backdrop-blur-md border-b border-void-fog/30">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-12">
                    <Link href="/" className="font-display text-sm text-void-acid uppercase tracking-widest">
                        VOID_INDEX
                    </Link>
                    <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative px-3 py-2 text-xs font-mono uppercase transition-colors whitespace-nowrap",
                                        isActive ? "text-void-acid" : "text-void-fog hover:text-void-white"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-void-acid"
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
