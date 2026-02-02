"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
    Zap,
    Search,
    Database,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    Activity,
    Layers,
    Filter,
    Flame,
    LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NamedAPIResource {
    name: string;
    url: string;
}

interface TypesClientProps {
    initialTypes: NamedAPIResource[];
    totalCount: number;
}

const TYPE_COLORS: Record<string, { color: string, border: string, bg: string }> = {
    normal: { color: "text-gray-400", border: "border-gray-400/30", bg: "bg-gray-400/5" },
    fire: { color: "text-red-500", border: "border-red-500/30", bg: "bg-red-500/5" },
    water: { color: "text-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/5" },
    electric: { color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/5" },
    grass: { color: "text-green-500", border: "border-green-500/30", bg: "bg-green-500/5" },
    ice: { color: "text-cyan-300", border: "border-cyan-300/30", bg: "bg-cyan-300/5" },
    fighting: { color: "text-orange-600", border: "border-orange-600/30", bg: "bg-orange-600/5" },
    poison: { color: "text-purple-500", border: "border-purple-500/30", bg: "bg-purple-500/5" },
    ground: { color: "text-amber-600", border: "border-amber-600/30", bg: "bg-amber-600/5" },
    flying: { color: "text-indigo-300", border: "border-indigo-300/30", bg: "bg-indigo-300/5" },
    psychic: { color: "text-pink-500", border: "border-pink-500/30", bg: "bg-pink-500/5" },
    bug: { color: "text-lime-500", border: "border-lime-500/30", bg: "bg-lime-500/5" },
    rock: { color: "text-stone-500", border: "border-stone-500/30", bg: "bg-stone-500/5" },
    ghost: { color: "text-purple-700", border: "border-purple-700/30", bg: "bg-purple-700/5" },
    dragon: { color: "text-violet-600", border: "border-violet-600/30", bg: "bg-violet-600/5" },
    dark: { color: "text-stone-700", border: "border-stone-700/30", bg: "bg-stone-700/5" },
    steel: { color: "text-slate-400", border: "border-slate-400/30", bg: "bg-slate-400/5" },
    fairy: { color: "text-pink-300", border: "border-pink-300/30", bg: "bg-pink-300/5" },
};

export function TypesClient({ initialTypes, totalCount }: TypesClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [cols, setCols] = useState(4);

    useEffect(() => {
        const updateCols = () => {
            if (window.innerWidth < 640) setCols(2);
            else if (window.innerWidth < 1024) setCols(3);
            else if (window.innerWidth < 1280) setCols(4);
            else setCols(6);
        };
        updateCols();
        window.addEventListener("resize", updateCols);
        return () => window.removeEventListener("resize", updateCols);
    }, []);

    const ROWS = 5;
    const itemsPerPage = cols * ROWS;

    const filteredTypes = useMemo(() => {
        return initialTypes.filter(type =>
            type.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [initialTypes, searchQuery]);

    const totalPages = Math.ceil(filteredTypes.length / itemsPerPage);
    const paginatedTypes = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredTypes.slice(start, start + itemsPerPage);
    }, [filteredTypes, currentPage, itemsPerPage]);

    useEffect(() => {
        if (currentPage !== 1) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentPage(1);
        }
    }, [searchQuery, currentPage]);

    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.02
            }
        }
    };

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white pb-20 font-sans">
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent-rgb)_0.5px,_transparent_0.5px)] bg-[size:48px_48px] opacity-[0.03]" />
                <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full" />
            </div>

            <header className="relative z-10 pt-32 sm:pt-44 lg:pt-52 pb-16 px-4 md:px-8 border-b border-border/50 bg-bg-primary/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center p-2 shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.3)]">
                            <Layers className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent leading-none mb-1.5">Type Registry</span>
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
                                Type<br />
                                <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/20">Listing</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl text-text-secondary max-w-2xl leading-relaxed font-medium opacity-70"
                            >
                                Elemental classification system for Pokémon. Data reflects the official 18 types and special categories catalogued in the API.
                            </motion.p>
                        </div>

                        <div className="flex flex-col gap-6 w-full lg:w-auto">
                            <div className="flex items-center gap-6">
                                <DashboardStat label="Total Types" value={totalCount} icon={Database} />
                                <DashboardStat label="System Status" value="Online" icon={Activity} color="text-emerald-400" />
                            </div>

                            <div className="relative group max-w-md">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-accent transition-colors" />
                                <input
                                    id="type-search"
                                    name="type-search"
                                    type="text"
                                    placeholder="Filter categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-bg-secondary/50 border border-border h-16 pl-14 pr-8 rounded-3xl outline-none focus:border-accent/50 focus:bg-bg-tertiary transition-all font-black uppercase tracking-widest text-xs"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${currentPage}-${searchQuery}`}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
                    >
                        {paginatedTypes.map((type) => {
                            const id = type.url.split("/").filter(Boolean).pop();
                            return (
                                <TypeCard key={type.name} type={type} id={id || "0"} />
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {filteredTypes.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-40 text-center"
                    >
                        <Filter className="w-16 h-16 text-text-muted mx-auto mb-6 opacity-20" />
                        <h3 className="text-2xl font-black text-text-secondary uppercase tracking-widest">Classification not found</h3>
                    </motion.div>
                )}

                {totalPages > 1 && (
                    <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-border/50 pt-12">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Viewing</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-black text-text-primary">{(currentPage - 1) * itemsPerPage + 1}</span>
                                <span className="text-[10px] font-black text-text-muted mx-1">/</span>
                                <span className="text-xl font-black text-accent">{filteredTypes.length}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
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

function DashboardStat({ label, value, icon: Icon, color = "text-text-primary" }: { label: string, value: string | number, icon: LucideIcon, color?: string }) {
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

function PaginationButton({ onClick, disabled, icon: Icon }: { onClick: () => void, disabled: boolean, icon: LucideIcon }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all border border-border",
                disabled
                    ? "opacity-20 cursor-not-allowed"
                    : "bg-bg-secondary text-text-primary hover:border-accent/40 hover:bg-bg-tertiary shadow-sm"
            )}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
}

function TypeCard({ type, id }: { type: NamedAPIResource, id: string }) {
    const style = TYPE_COLORS[type.name] || TYPE_COLORS.normal;

    return (
        <motion.div
            layout
            variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1 }
            }}
            whileHover={{ y: -5 }}
            className="group"
        >
            <Link href={`/types/${type.name}`} className="block relative h-full">
                <div className={cn(
                    "relative h-full border rounded-[28px] p-6 transition-all duration-300 shadow-sm overflow-hidden",
                    "bg-bg-secondary group-hover:bg-bg-tertiary",
                    style.border,
                    "group-hover:border-accent/40"
                )}>
                    <div className={cn("absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none", style.bg)} />

                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                        <Flame className={cn("w-16 h-16", style.color)} />
                    </div>

                    <div className="relative z-10 flex flex-col h-full min-h-[100px]">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <div className={cn("p-2 rounded-lg bg-bg-primary border border-white/5", style.color)}>
                                    <Zap className="w-3.5 h-3.5" />
                                </div>
                                <span className={cn("text-[8px] font-mono font-black tracking-widest", style.color)}>TYP-{id.padStart(3, '0')}</span>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-all font-black" />
                        </div>

                        <h2 className={cn("text-xl font-black capitalize tracking-tighter leading-tight transition-colors group-hover:text-accent", style.color)}>
                            {type.name}
                        </h2>

                        <div className="mt-auto pt-4 flex items-center justify-between">
                            <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.2em]">Listing Entry</span>
                            <div className={cn("h-0.5 w-6 transition-all group-hover:w-10 group-hover:bg-accent", style.bg.replace('/5', '/30'))} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
