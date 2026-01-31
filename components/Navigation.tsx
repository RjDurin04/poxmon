"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, LayoutGrid } from "lucide-react";

const NAV_ITEMS = [
    { href: "/", label: "Pokemon", icon: LayoutGrid },
    { href: "/regions", label: "Regions" },
    { href: "/locations", label: "Locations" },
    { href: "/moves", label: "Moves" },
    { href: "/abilities", label: "Abilities" },
    { href: "/types", label: "Types" },
    { href: "/items", label: "Items" },
    { href: "/berries", label: "Berries" },
    { href: "/games", label: "Games" },
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

    // Close mobile menu on path change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b",
                    scrolled
                        ? "bg-bg-primary/80 backdrop-blur-xl border-border/50 py-3"
                        : "bg-transparent border-transparent py-5"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group relative z-[110]">
                            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                                <span className="text-white font-black text-xl italic tracking-tighter">P</span>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="font-black text-xl text-text-primary uppercase tracking-tighter group-hover:text-accent transition-colors">Pokédex</span>
                                <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.3em]">Encyclopedia</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1 bg-bg-secondary/40 backdrop-blur-md p-1 rounded-2xl border border-white/5">
                            {NAV_ITEMS.map((item) => {
                                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "relative px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden group/item",
                                            isActive
                                                ? "text-accent"
                                                : "text-text-muted hover:text-text-primary"
                                        )}
                                    >
                                        <span className="relative z-10">{item.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-active"
                                                className="absolute inset-0 bg-accent/10 rounded-xl"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-accent scale-x-0 group-hover/item:scale-x-100 transition-transform origin-left opacity-0 group-hover/item:opacity-100" />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden relative z-[110] w-10 h-10 flex items-center justify-center rounded-xl bg-bg-secondary border border-border/50 text-text-primary"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0, rotate: 90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: -90 }}
                                    >
                                        <Menu className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-bg-primary/60 backdrop-blur-md z-[90] lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-bg-secondary border-l border-border/50 z-[100] lg:hidden flex flex-col pt-20 pb-8 px-6 overflow-hidden"
                        >
                            <div className="flex flex-col h-full">
                                <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em] mb-6">Navigation</span>

                                <div className="grid grid-cols-2 gap-2 mb-8">
                                    {NAV_ITEMS.map((item, idx) => {
                                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                                        return (
                                            <motion.div
                                                key={item.href}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.03 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 text-center h-full min-h-[70px]",
                                                        isActive
                                                            ? "bg-accent/10 border-accent/20 text-accent"
                                                            : "bg-white/5 border-white/5 text-text-secondary hover:border-white/10 hover:bg-white/10"
                                                    )}
                                                >
                                                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <div className="mt-auto">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-3 p-4 rounded-xl bg-accent text-white font-black uppercase tracking-[0.2em] text-[10px] justify-center shadow-lg shadow-accent/20 hover:scale-[1.02] transition-transform active:scale-95"
                                    >
                                        Explore Pokedex
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

