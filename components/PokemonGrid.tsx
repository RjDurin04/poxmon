"use client";

import React from "react";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PokemonCard } from "./PokemonCard";
import type { PokemonDetail } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
    Search,
    Database,
    Activity,
    Crosshair,
    ChevronLeft,
    ChevronRight,
    Terminal
} from "lucide-react";
import Image from "next/image";

interface PokemonGridProps {
    initialPokemon: PokemonDetail[];
}

export function PokemonGrid({ initialPokemon }: PokemonGridProps) {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(30); // Default to desktop 6*5
    const gridTopRef = useRef<HTMLDivElement>(null);

    // Calculate items per page for exactly 5 rows based on responsive columns
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let columns = 1; // base
            if (width >= 1280) columns = 4;      // xl
            else if (width >= 1024) columns = 3; // lg
            else if (width >= 640) columns = 2;  // sm

            setItemsPerPage(columns * 5);
        };

        // Initial call
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filtered = useMemo(() =>
        initialPokemon.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
        ),
        [initialPokemon, query]
    );

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    // Ensure currentPage is valid (reset if out of bounds)
    const safePage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));

    const startIndex = (safePage - 1) * itemsPerPage;
    const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

    // Scroll to top on page change
    useEffect(() => {
        if (currentPage !== 1 && gridTopRef.current) {
            const yOffset = -100; // offset if needed
            const element = gridTopRef.current;
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, [safePage, currentPage]);

    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white pb-20">
            {/* Ambient Background Accents */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent-rgb)_0.5px,_transparent_0.5px)] bg-[size:40px_40px] opacity-[0.03]" />
                <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-accent/5 blur-[120px] rounded-full" />
            </div>

            {/* Immersive Header */}
            <header className="relative z-10 pt-32 sm:pt-44 lg:pt-52 pb-12 px-4 md:px-8 border-b border-border/50 bg-bg-primary/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-10"
                    >
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center relative shadow-lg shadow-accent/20 overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Primary Database Logo"
                                fill
                                className="object-contain p-1"
                                sizes="40px"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent leading-none mb-1">
                                Primary Database
                            </span>
                            <span className="text-xs font-black text-text-muted uppercase tracking-widest">
                                PokeAPI v2.0
                            </span>
                        </div>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="relative">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] sm:leading-[0.8] mb-8"
                            >
                                Pokemon<br />
                                <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/10">Index</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed font-medium opacity-70 italic"
                            >
                                Access the complete biological data of all known specimens.
                            </motion.p>
                        </div>

                        {/* Technical Dashboard Stats */}
                        <div className="flex items-center gap-6">
                            <TechnicalMetric label="Total Entries" value={filtered.length} icon={Database} />
                            <div className="hidden sm:block w-px h-12 bg-border" />
                            <TechnicalMetric label="System Status" value="Online" icon={Activity} color="text-emerald-400" />
                        </div>
                    </div>

                    {/* Search Interface */}
                    <div className="mt-16 relative max-w-2xl">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-accent" />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="SEARCH DATABASE BY NAME..."
                            className="block w-full pl-12 pr-4 py-4 bg-bg-secondary/50 border border-border rounded-2xl text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent font-mono text-sm tracking-wider uppercase backdrop-blur-md transition-all"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-text-muted border border-border px-1.5 py-0.5 rounded">CTRL+K</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Grid Section */}
            <main
                className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 scroll-mt-32"
                ref={gridTopRef}
                id="query-results"
            >
                <div className="flex justify-between items-center mb-10 pb-4 border-b border-border/50">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-accent" />
                        <span className="text-xs font-mono text-accent font-black tracking-widest uppercase">
                            QUERY RESULTS
                        </span>
                    </div>
                    <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                        Showing {filtered.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length}
                    </div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start min-h-[600px]"
                >
                    <AnimatePresence mode="popLayout">
                        {paginatedItems.map((p) => (
                            <PokemonCard key={p.id} pokemon={p} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-text-muted border border-dashed border-border rounded-[32px] bg-bg-secondary/20">
                        <Crosshair className="w-12 h-12 mb-4 opacity-20" />
                        <div className="text-xl font-black uppercase tracking-widest mb-2">No Matches Found</div>
                        <div className="text-sm font-mono opacity-50">Try adjusting your search parameters</div>
                    </div>
                )}

                {/* Technical Pagination */}
                {totalPages > 1 && (
                    <div className="mt-20 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-4 bg-bg-secondary/50 p-2 rounded-2xl border border-border backdrop-blur-sm">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-primary border border-border text-text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <div className="flex gap-2 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar px-2">
                                {Array.from({ length: totalPages }, (_, i) => {
                                    const pageNum = i + 1;
                                    const isVisible =
                                        pageNum === 1 ||
                                        pageNum === totalPages ||
                                        (pageNum >= safePage - 1 && pageNum <= safePage + 1);

                                    if (!isVisible) {
                                        if (pageNum === 2 || pageNum === totalPages - 1) {
                                            return <span key={pageNum} className="w-8 flex items-center justify-center text-text-muted/50">...</span>;
                                        }
                                        return null;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={cn(
                                                "w-8 h-8 flex-shrink-0 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center justify-center",
                                                safePage === pageNum
                                                    ? "bg-accent text-white shadow-lg shadow-accent/20 scale-110"
                                                    : "bg-transparent text-text-muted hover:text-text-primary hover:bg-bg-tertiary"
                                            )}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-bg-primary border border-border text-text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-[9px] font-mono text-text-muted/40 uppercase tracking-[0.3em]">
                            System Page Navigation
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function TechnicalMetric({ label, value, icon: Icon, color = "text-text-primary" }: { label: string, value: string | number, icon: React.ComponentType<{ className?: string }>, color?: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border flex items-center justify-center">
                <Icon className="w-5 h-5 text-accent" />
            </div>
            <div>
                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1.5">{label}</p>
                <p className={cn("text-2xl font-black tracking-tighter leading-none font-mono", color)}>{value}</p>
            </div>
        </div>
    );
}
