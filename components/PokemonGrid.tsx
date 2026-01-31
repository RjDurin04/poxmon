"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PokemonCard } from "./PokemonCard";
import type { PokemonDetail } from "@/lib/api";
import { cn } from "@/lib/utils";

interface PokemonGridProps {
    initialPokemon: PokemonDetail[];
}

export function PokemonGrid({ initialPokemon }: PokemonGridProps) {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const [cols, setCols] = useState(0);
    const gridTopRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    // Track columns based on window size
    useEffect(() => {
        if (!isMounted) return;

        const updateCols = () => {
            const width = window.innerWidth;
            if (width < 640) setCols(2);
            else if (width < 768) setCols(3);
            else if (width < 1024) setCols(4);
            else if (width < 1280) setCols(5);
            else setCols(6);
        };

        updateCols();
        window.addEventListener("resize", updateCols);
        return () => window.removeEventListener("resize", updateCols);
    }, [isMounted]);

    const effectiveCols = cols || 2;
    const itemsPerPage = effectiveCols * 5;

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
        if (gridTopRef.current) {
            gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [safePage]);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-b from-bg-secondary to-bg-primary py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">
                        Pokédex
                    </h1>
                    <p className="text-text-secondary text-lg mb-8">
                        Explore the complete Pokemon database
                    </p>

                    <div className="relative max-w-md">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search Pokemon..."
                            className="w-full px-4 py-3 bg-bg-tertiary border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8" ref={gridTopRef}>
                <div className="flex justify-between items-end mb-6">
                    <div className="text-sm text-text-secondary">
                        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length} Pokemon
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 min-h-[800px] content-start"
                >
                    <AnimatePresence mode="popLayout">
                        {paginatedItems.map((p) => (
                            <PokemonCard key={p.id} pokemon={p} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filtered.length === 0 && (
                    <div className="text-center py-20 text-text-muted">
                        No Pokemon found matching &quot;{query}&quot;
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-border bg-bg-secondary text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-tertiary transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar">
                            {Array.from({ length: totalPages }, (_, i) => {
                                const pageNum = i + 1;
                                const isVisible =
                                    pageNum === 1 ||
                                    pageNum === totalPages ||
                                    (pageNum >= safePage - 1 && pageNum <= safePage + 1);

                                if (!isVisible) {
                                    if (pageNum === 2 || pageNum === totalPages - 1) {
                                        return <span key={pageNum} className="px-1 text-text-muted self-center">...</span>;
                                    }
                                    return null;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={cn(
                                            "w-10 h-10 flex-shrink-0 rounded-lg border text-sm font-medium transition-all",
                                            safePage === pageNum
                                                ? "bg-accent border-accent text-white shadow-lg shadow-accent/20"
                                                : "bg-bg-secondary border-border text-text-secondary hover:text-text-primary hover:border-text-secondary"
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
                            className="p-2 rounded-lg border border-border bg-bg-secondary text-text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-tertiary transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
