"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LucideIcon, Users, Target, Zap, Layers } from "lucide-react";

interface PokemonItem {
    name: string;
    url: string;
}

const ICON_MAP = {
    users: Users,
    target: Target,
    zap: Zap,
    layers: Layers,
} as const;

interface GenericPokemonCarouselProps {
    items: PokemonItem[];
    title: string;
    description?: string;
    icon?: keyof typeof ICON_MAP;
}

const ITEMS_PER_PAGE = 8;

export function GenericPokemonCarousel({
    items,
    title,
    description,
    icon = "users"
}: GenericPokemonCarouselProps) {
    const Icon = ICON_MAP[icon] || Users;
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

    const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
    const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

    const startIndex = page * ITEMS_PER_PAGE;
    const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-8">
                <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-accent" />
                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">{title}</h2>
                        {description && <p className="text-[9px] text-text-muted font-bold uppercase tracking-tight">{description}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-text-muted bg-bg-tertiary px-3 py-1 rounded-full border border-border">
                        {items.length} TOTAL
                    </span>

                    {totalPages > 1 && (
                        <div className="flex items-center gap-1">
                            <button
                                onClick={prevPage}
                                className="p-1.5 rounded-lg border border-border bg-bg-tertiary hover:bg-bg-secondary hover:border-accent/40 text-text-muted hover:text-accent transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-[10px] font-mono font-bold text-text-muted px-2">
                                {page + 1} / {totalPages}
                            </span>
                            <button
                                onClick={nextPage}
                                className="p-1.5 rounded-lg border border-border bg-bg-tertiary hover:bg-bg-secondary hover:border-accent/40 text-text-muted hover:text-accent transition-all"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative min-h-[340px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={page}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    >
                        {currentItems.map((p) => {
                            const id = p.url.split("/").filter(Boolean).pop();
                            const artworkUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

                            return (
                                <Link
                                    key={p.name}
                                    href={`/pokemon/${p.name}`}
                                    className="group relative flex flex-col items-center p-4 bg-bg-tertiary/20 border border-border rounded-2xl hover:bg-bg-tertiary/40 hover:border-accent/30 transition-all overflow-hidden"
                                >
                                    {/* Glass Highlight */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="text-[9px] font-black text-text-muted mb-4 self-start font-mono tracking-tighter bg-bg-secondary/50 px-2 py-0.5 rounded border border-border/50">
                                        #{id?.padStart(3, '0')}
                                    </div>

                                    <div className="relative w-24 h-24 mb-4 drop-shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        <Image
                                            src={artworkUrl}
                                            alt={p.name}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>

                                    <div className="text-xs font-black text-text-primary capitalize text-center tracking-tight group-hover:text-accent transition-colors">
                                        {p.name.replace(/-/g, " ")}
                                    </div>
                                </Link>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {items.length === 0 && (
                <div className="h-[200px] flex items-center justify-center text-text-muted text-xs font-bold uppercase tracking-widest italic opacity-50">
                    No records found.
                </div>
            )}
        </div>
    );
}
