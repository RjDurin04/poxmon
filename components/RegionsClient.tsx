"use client";

import Link from "next/link";
import { Globe2, Layers, Search, Database, Navigation, ChevronRight, Map } from "lucide-react";
import { motion } from "framer-motion";

interface RegionSummary {
    name: string;
    url: string;
}

interface RegionListResponse {
    count: number;
    results: RegionSummary[];
}

export function RegionsClient({ regionList }: { regionList: RegionListResponse }) {
    const containerVariants = {
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent-rgb)_0.5px,_transparent_0.5px)] bg-[size:48px_48px] opacity-[0.03]" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-bg-primary via-transparent to-bg-primary opacity-60" />
            </div>

            {/* Immersive Header */}
            <header className="relative z-10 pt-32 sm:pt-40 lg:pt-48 pb-16 px-4 md:px-8 border-b border-border/50 bg-bg-primary/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-8 sm:mb-10"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center p-2 shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.3)]">
                            <Map className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent leading-none mb-1.5">Official Registry</span>
                            <span className="text-xs font-black text-text-muted uppercase tracking-widest">Version 4.0.0</span>
                        </div>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="relative">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-5xl sm:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] sm:leading-[0.8] mb-6 sm:mb-8"
                            >
                                Regions<br />
                                <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/20">List</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-base sm:text-xl text-text-secondary max-w-2xl leading-relaxed font-medium opacity-70"
                            >
                                Browse all available regions in the Pokémon world. Each entry provides detailed geographic and biological data for the selected area.
                            </motion.p>
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                            <DashboardStat label="Total Regions" value={regionList.count} />
                            <DashboardStat label="System Status" value="Online" color="text-emerald-400" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Listing Grid */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24">
                <motion.div
                    variants={containerVariants}
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {regionList.results.map((region) => {
                        const regionId = region.url.split("/").filter(Boolean).pop();
                        return (
                            <RegionCard key={region.name} region={region} id={regionId || "0"} />
                        );
                    })}
                </motion.div>
            </main>
        </div>
    );
}

function DashboardStat({ label, value, color = "text-text-primary" }: { label: string, value: string | number, color?: string }) {
    return (
        <div className="bg-bg-secondary/40 border border-border px-8 py-5 rounded-3xl backdrop-blur-md">
            <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-1.5">{label}</div>
            <div className={`text-3xl font-black ${color} tracking-tighter`}>{value}</div>
        </div>
    );
}

function RegionCard({ region, id }: { region: RegionSummary, id: string }) {
    return (
        <motion.div
            variants={{
                visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group"
        >
            <Link href={`/regions/${region.name}`} className="block relative h-full">
                <div className="relative h-full bg-bg-secondary border border-border/60 rounded-[32px] p-8 transition-all duration-300 group-hover:border-accent/50 group-hover:bg-bg-tertiary">
                    {/* Visual Decor */}
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Globe2 className="w-20 h-20 text-accent" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full min-h-[160px]">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-mono text-accent font-black tracking-widest bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                                SECTOR {id.padStart(3, '0')}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>

                        <h2 className="text-4xl font-black text-text-primary capitalize tracking-tighter mb-4">
                            {region.name}
                        </h2>

                        <div className="mt-auto flex items-center gap-3 text-text-muted">
                            <Layers className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Registry</span>
                        </div>
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-[32px]" />
                </div>
            </Link>
        </motion.div>
    );
}
