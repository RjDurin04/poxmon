"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Menu, X, LayoutGrid, Map, MapPin,
    Sword, Zap, Shapes, Briefcase,
    Grape, Gamepad2, Database
} from "lucide-react";

const NAV_ITEMS = [
    { href: "/", label: "Pokemon", icon: LayoutGrid },
    { href: "/regions", label: "Regions", icon: Map },
    { href: "/locations", label: "Locations", icon: MapPin },
    { href: "/moves", label: "Moves", icon: Sword },
    { href: "/abilities", label: "Abilities", icon: Zap },
    { href: "/types", label: "Types", icon: Shapes },
    { href: "/items", label: "Items", icon: Briefcase },
    { href: "/berries", label: "Berries", icon: Grape },
    { href: "/games", label: "Generations", icon: Gamepad2 },
];

export function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => setIsOpen(false), [pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
                    scrolled ? "py-4" : "py-6"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={cn(
                        "relative flex items-center justify-between transition-all duration-500 px-6 py-2 rounded-2xl",
                        scrolled
                            ? "bg-slate-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl"
                            : "bg-transparent border-transparent"
                    )}>
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group relative z-[110]">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20"
                            >
                                <Database className="w-6 h-6 text-white" />
                            </motion.div>
                            <span className="font-bold text-xl text-white uppercase tracking-tighter">
                                Poké<span className="text-accent">Dex</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {NAV_ITEMS.map((item) => {
                                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "relative px-4 py-2 group/item transition-all duration-300",
                                            isActive ? "text-accent" : "text-white/40 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 relative z-10">
                                            <Icon className={cn("w-4 h-4 transition-transform duration-300 group-hover/item:scale-110", isActive && "text-accent")} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                        </div>

                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-active-pill"
                                                className="absolute inset-0 bg-white/5 rounded-full border border-white/10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden relative z-[110] w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? <X className="w-5 h-5" key="x" /> : <Menu className="w-5 h-5" key="m" />}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[90] lg:hidden bg-slate-950/98 backdrop-blur-3xl p-6 pt-32"
                    >
                        <div className="max-w-lg mx-auto w-full grid grid-cols-2 gap-3">
                            {NAV_ITEMS.map((item, idx) => {
                                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300",
                                                isActive
                                                    ? "bg-accent/10 border-accent/40 text-accent"
                                                    : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:border-white/20"
                                            )}
                                        >
                                            <Icon className="w-6 h-6 mb-3" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

