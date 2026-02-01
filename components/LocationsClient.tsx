"use client";

import Link from "next/link";
import {
    Globe,
    MapPin,
    Map as MapIcon,
    ChevronRight,
    ArrowUpRight,
    Navigation,
    Compass,
    Target,
    Layers,
    Activity,
    Search
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RegionSummary {
    name: string;
    url: string;
}

interface LocationSummary {
    name: string;
    url: string;
}

interface LocationsClientProps {
    regionList: { results: RegionSummary[] };
    initialLocations: { results: LocationSummary[] };
}

export function LocationsClient({ regionList, initialLocations }: LocationsClientProps) {
    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const cardVariants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white pb-20">
            {/* Ambient Background Accents */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent-rgb)_0.5px,_transparent_0.5px)] bg-[size:32px_32px] opacity-[0.03]" />
                <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full" />
            </div>

            {/* Immersive Header - Responsive padding for navbar clearance */}
            <header className="relative z-10 pt-32 sm:pt-44 lg:pt-52 pb-16 px-4 md:px-8 border-b border-border/50 bg-bg-primary/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-10"
                    >
                        <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center p-2 shadow-lg shadow-accent/20">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent leading-none mb-1">Database Atlas</span>
                            <span className="text-xs font-black text-text-muted uppercase tracking-widest">PokeAPI v2</span>
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
                                Global<br />
                                <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/10">Locations</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed font-medium opacity-70 italic"
                            >
                                Comprehensive catalog of geographical points of interest.
                            </motion.p>
                        </div>

                        {/* Technical Dashboard Stats */}
                        <div className="flex items-center gap-6">
                            <TechnicalMetric label="Mapped POIs" value={initialLocations.results.length} icon={Search} />
                            <div className="hidden sm:block w-px h-12 bg-border" />
                            <TechnicalMetric label="Survey Status" value="Active" icon={Activity} color="text-emerald-400" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Geographical Hierarchy Hub */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-24">

                    {/* Left Sidebar: Regional Registry */}
                    <div className="lg:col-span-1 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
                                <Globe className="w-4 h-4 text-accent" />
                                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-text-primary">Regional Registry</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-2.5">
                                {regionList.results.map((region, idx) => (
                                    <motion.div
                                        key={region.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link
                                            href={`/regions/${region.name}`}
                                            className="group flex items-center justify-between p-4 rounded-2xl bg-bg-secondary/40 border border-border/60 hover:border-accent/40 hover:bg-bg-tertiary transition-all duration-300"
                                        >
                                            <span className="text-xs font-black text-text-primary uppercase tracking-widest group-hover:text-accent transition-colors">
                                                {region.name}
                                            </span>
                                            <div className="w-6 h-6 rounded-full bg-bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                                                <ChevronRight className="w-3 h-3 text-accent" />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Navigation Advisory Card */}
                        <div className="p-8 rounded-[32px] bg-bg-secondary/40 border border-border border-dashed relative overflow-hidden">
                            <h3 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] mb-4">Regional Distribution</h3>
                            <p className="text-[10px] font-medium text-text-secondary leading-relaxed">
                                Selection of a region filters the biological and geographical data available in the central directory.
                            </p>
                        </div>
                    </div>

                    {/* Right Main Grid: Points of Interest */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-5">
                                <div className="p-4 rounded-2xl bg-bg-secondary border border-border shadow-sm">
                                    <Navigation className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent block mb-1">API Results</span>
                                    <h3 className="text-3xl sm:text-4xl font-black text-text-primary tracking-tighter">Location Index</h3>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            {initialLocations.results.map((loc) => {
                                const id = loc.url.split("/").filter(Boolean).pop();
                                return (
                                    <LocationCard key={loc.name} loc={loc} id={id || "000"} />
                                );
                            })}
                        </motion.div>

                        <div className="mt-20 flex items-center justify-center gap-4">
                            <div className="h-px flex-1 bg-border" />
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] whitespace-nowrap">End of synchronized feed</span>
                            <div className="h-px flex-1 bg-border" />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

function TechnicalMetric({ label, value, icon: Icon, color = "text-text-primary" }: { label: string, value: string | number, icon: any, color?: string }) {
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

function LocationCard({ loc, id }: { loc: LocationSummary, id: string }) {
    return (
        <motion.div
            variants={{
                visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -6 }}
            className="group"
        >
            <Link
                href={`/locations/${loc.name}`}
                className="block relative h-full bg-bg-secondary border border-border/60 rounded-[32px] p-8 transition-all duration-300 group-hover:border-accent/50 group-hover:bg-bg-tertiary overflow-hidden"
            >
                {/* Visual Architecture */}
                <div className="absolute top-0 right-0 p-8 text-accent/5 group-hover:text-accent/10 transition-colors pointer-events-none group-hover:scale-110 duration-500">
                    <MapIcon className="w-20 h-20" />
                </div>

                <div className="relative z-10 flex flex-col h-full min-h-[140px]">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[9px] font-mono text-accent font-black tracking-widest uppercase">
                                POI-{id.padStart(4, '0')}
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>

                    <h4 className="text-2xl font-black text-text-primary capitalize tracking-tighter group-hover:text-accent transition-colors leading-tight mb-3">
                        {loc.name.replace(/-/g, " ")}
                    </h4>

                    <div className="mt-auto flex items-center gap-2 text-text-muted">
                        <MapPin className="w-3 h-3 text-accent" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Verified Coordinate</span>
                    </div>
                </div>

                {/* Technical Overlay */}
                <div className="absolute inset-0 border-r-2 border-accent/0 group-hover:border-accent/40 transition-all pointer-events-none" />
            </Link>
        </motion.div>
    );
}
