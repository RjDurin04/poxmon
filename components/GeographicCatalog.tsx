"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Map as MapIcon,
    Navigation,
    Landmark,
    Compass,
    MapPin,
    ChevronRight,
    ChevronLeft
} from "lucide-react";

interface Location {
    name: string;
    url: string;
}

interface GeographicCatalogProps {
    locations: Location[];
}

const ITEMS_PER_PAGE = 20;

export function GeographicCatalog({ locations }: GeographicCatalogProps) {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(locations.length / ITEMS_PER_PAGE);

    const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
    const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

    const startIndex = page * ITEMS_PER_PAGE;
    const currentItems = locations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <MapIcon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter">Geographic Catalog</h2>
                        <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">A comprehensive list of all registered sectors</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-text-muted bg-bg-tertiary px-3 py-1 rounded-full border border-border">
                        {locations.length} SECTORS
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

            <div className="relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={page}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                        {currentItems.map((loc) => {
                            const isCity = loc.name.toLowerCase().includes('city') || loc.name.toLowerCase().includes('town');
                            const isPath = loc.name.toLowerCase().includes('route') || loc.name.toLowerCase().includes('path');
                            const isNature = loc.name.toLowerCase().includes('cave') || loc.name.toLowerCase().includes('forest') || loc.name.toLowerCase().includes('mountain');

                            return (
                                <div
                                    key={loc.name}
                                    className="group flex items-center justify-between p-4 bg-bg-secondary border border-border rounded-2xl hover:bg-bg-tertiary transition-all hover:translate-x-1 cursor-default"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-xl border border-border bg-bg-tertiary transition-colors group-hover:border-accent/30 ${isCity ? 'text-blue-400' : isPath ? 'text-amber-400' : isNature ? 'text-green-400' : 'text-text-muted'}`}>
                                            {isCity ? <Landmark className="w-4 h-4" /> : isPath ? <Compass className="w-4 h-4" /> : isNature ? <Navigation className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                                        </div>
                                        <span className="text-sm font-black text-text-primary capitalize tracking-tight group-hover:text-accent transition-colors">
                                            {loc.name.replace(/-/g, " ")}
                                        </span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
