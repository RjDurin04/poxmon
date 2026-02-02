"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    Zap,
    Search,
    Database,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    Activity,
    Swords,
    Target,
    Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NamedAPIResource {
    name: string;
    url: string;
}

interface MovesClientProps {
    initialMoves: NamedAPIResource[];
    totalCount: number;
}

export function MovesClient({ initialMoves, totalCount }: MovesClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [cols, setCols] = useState(4); // Default to desktop

    // Handle responsive column count for accurate 5-row pagination
    useEffect(() => {
        const updateCols = () => {
            if (window.innerWidth < 640) setCols(1);      // Mobile
            else if (window.innerWidth < 1024) setCols(2); // Tablet
            else if (window.innerWidth < 1280) setCols(3); // Desktop
            else setCols(4);                               // Ultra-wide
        };
        updateCols();
        window.addEventListener("resize", updateCols);
        return () => window.removeEventListener("resize", updateCols);
    }, []);

    // Reset page when search changes
    const handleSearchChange = useCallback((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, []);

    const ROWS = 5;
    const itemsPerPage = cols * ROWS;

    const filteredMoves = useMemo(() => {
        return initialMoves.filter(move =>
            move.name.replace(/-/g, " ").toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [initialMoves, searchQuery]);

    const totalPages = Math.ceil(filteredMoves.length / itemsPerPage);
    const paginatedMoves = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredMoves.slice(start, start + itemsPerPage);
    }, [filteredMoves, currentPage, itemsPerPage]);

    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.02
            }
        }
    };

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white pb-20 font-sans">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent-rgb)_0.5px,_transparent_0.5px)] bg-[size:48px_48px] opacity-[0.03]" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[160px] rounded-full" />
            </div>

            {/* Technical Header */}
            <header className="relative z-10 pt-32 sm:pt-44 lg:pt-52 pb-16 px-4 md:px-8 border-b border-border/50 bg-bg-primary/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center p-2 shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.3)]">
                            <Swords className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent leading-none mb-1.5">Move Registry</span>
                            <span className="text-xs font-black text-text-muted uppercase tracking-widest">PokeAPI v2</span>
                        </div>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="relative">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] sm:leading-[0.8] mb-8"
                            >
                                Moves<br />
                                <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/20">Database</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl text-text-secondary max-w-2xl leading-relaxed font-medium opacity-70"
                            >
                                Technical listing of all moves available in the Pokémon series. Data is retrieved directly from the official PokeAPI database.
                            </motion.p>
                        </div>

                        {/* Stats & Search */}
                        <div className="flex flex-col gap-6 w-full lg:w-auto">
                            <div className="flex items-center gap-6">
                                <DashboardStat label="Total Records" value={totalCount} icon={Database} />
                                <DashboardStat label="System Status" value="Online" icon={Activity} color="text-emerald-400" />
                            </div>

                            {/* Integrated Search */}
                            <div className="relative group max-w-md">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-accent transition-colors" />
                                <input
                                    id="move-search"
                                    name="move-search"
                                    type="text"
                                    placeholder="Search techniques..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    className="w-full bg-bg-secondary/50 border border-border h-16 pl-14 pr-8 rounded-3xl outline-none focus:border-accent/50 focus:bg-bg-tertiary transition-all font-black uppercase tracking-widest text-xs"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Listing Grid */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${currentPage}-${searchQuery}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    >
                        {paginatedMoves.map((move) => {
                            const id = move.url.split("/").filter(Boolean).pop();
                            return (
                                <MoveCard key={move.name} move={move} id={id || "0"} />
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {filteredMoves.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-40 text-center"
                    >
                        <Filter className="w-16 h-16 text-text-muted mx-auto mb-6 opacity-20" />
                        <h3 className="text-2xl font-black text-text-secondary uppercase tracking-widest">No techniques match your search</h3>
                        <p className="text-text-muted mt-2">Try checking for typos or using broader terms.</p>
                    </motion.div>
                )}

                {/* Technical Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-border/50 pt-12">
                        <div className="flex items-center gap-4 order-2 sm:order-1">
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Viewing</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-black text-text-primary">{(currentPage - 1) * itemsPerPage + 1}</span>
                                <span className="text-[10px] font-black text-text-muted mx-1">TO</span>
                                <span className="text-xl font-black text-text-primary">{Math.min(currentPage * itemsPerPage, filteredMoves.length)}</span>
                            </div>
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">OF</span>
                            <span className="text-xl font-black text-accent">{filteredMoves.length}</span>
                        </div>

                        <div className="flex items-center gap-2 order-1 sm:order-2">
                            <PaginationButton
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                icon={ChevronLeft}
                            />

                            <div className="flex items-center gap-1 mx-4">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum = i + 1;
                                    if (totalPages > 5 && currentPage > 3) {
                                        pageNum = currentPage - 2 + i;
                                        if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                                    }
                                    if (pageNum < 1) return null;
                                    if (pageNum > totalPages) return null;

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={cn(
                                                "w-10 h-10 rounded-xl font-black text-xs transition-all",
                                                currentPage === pageNum
                                                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                                                    : "bg-bg-secondary text-text-muted hover:text-text-primary hover:bg-bg-tertiary"
                                            )}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <PaginationButton
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                icon={ChevronRight}
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function PaginationButton({ onClick, disabled, icon: Icon }: { onClick: () => void, disabled: boolean, icon: React.ComponentType<{ className?: string }> }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all border border-border",
                disabled
                    ? "opacity-20 cursor-not-allowed"
                    : "bg-bg-secondary text-text-primary hover:border-accent/40 hover:bg-bg-tertiary active:scale-95 shadow-sm"
            )}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
}

function DashboardStat({ label, value, icon: Icon, color = "text-text-primary" }: { label: string, value: string | number, icon: React.ComponentType<{ className?: string }>, color?: string }) {
    return (
        <div className="bg-bg-secondary/40 border border-border px-8 py-5 rounded-3xl backdrop-blur-md flex-1 lg:flex-none">
            <div className="flex items-center gap-3 mb-1.5">
                <Icon className="w-3 h-3 text-accent" />
                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{label}</span>
            </div>
            <div className={`text-2xl font-black ${color} tracking-tighter`}>{value}</div>
        </div>
    );
}

function MoveCard({ move, id }: { move: NamedAPIResource, id: string }) {
    return (
        <motion.div
            layout
            variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
            }}
            whileHover={{ scale: 1.02 }}
            className="group"
        >
            <Link href={`/moves/${move.name}`} className="block relative h-full">
                <div className="relative h-full bg-bg-secondary border border-border/60 rounded-[28px] p-6 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-bg-tertiary shadow-sm">
                    {/* Visual Decor */}
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                        <Target className="w-20 h-20 text-accent" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full min-h-[120px]">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-bg-primary border border-border group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <span className="text-[9px] font-mono text-accent font-black tracking-widest">MOV-{id.padStart(4, '0')}</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>

                        <h2 className="text-xl font-black text-text-primary capitalize tracking-tighter leading-tight group-hover:text-accent transition-colors">
                            {move.name.replace(/-/g, " ")}
                        </h2>

                        <div className="mt-auto pt-4 flex items-center justify-between">
                            <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Entry Index</span>
                            <div className="h-0.5 w-8 bg-border group-hover:w-16 group-hover:bg-accent transition-all duration-300" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
