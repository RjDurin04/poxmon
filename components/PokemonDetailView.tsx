"use client";

import { motion } from "framer-motion";
import {
    type PokemonDetail,
    type PokemonSpecies,
    type EvolutionChain,
    type LocationAreaEncounter,
} from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { EvolutionChainDisplay } from "./EvolutionChainDisplay";
import {
    Sparkles,
    Star,
    Baby,
    Volume2,
    MapPin,
    Palette,
    Shapes,
    TrendingUp,
    TreeDeciduous,
    Egg,
    Package,
    Dna,
    ChevronRight,
    ChevronLeft,
    ChevronDown,
    Images,
    Target,
    Activity,
    Info,
    ArrowLeft,
    Box,
    Zap,
    Scan,
    Fingerprint,
    History,
    Gamepad2,
    Globe,
    Book,
    Trees,
    Layers,
    Hash,
    FileText,
} from "lucide-react";
import React, { useState, useRef, useMemo, type ComponentType } from "react";

interface PokemonDetailViewProps {
    pokemon: PokemonDetail;
    species: PokemonSpecies;
    evolution: EvolutionChain;
    encounters?: LocationAreaEncounter[];
}

/**
 * COMPONENT: StatRing
 * A modern, circular representation for base stats.
 */
function StatRing({ value, label, max = 255, color = "text-accent" }: { value: number; label: string; max?: number; color?: string }) {
    const percentage = Math.min(100, (value / max) * 100);
    const radius = 32;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-1 sm:gap-3 group/stat overflow-visible">
            <div className="relative w-12 h-12 sm:w-16 sm:w-20 lg:w-20 lg:h-20 flex items-center justify-center overflow-visible">
                <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-visible">
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        className="stroke-white/5 fill-bg-secondary/10 sm:fill-bg-secondary/40 backdrop-blur-sm sm:backdrop-blur-xl"
                        strokeWidth="8"
                    />
                    <motion.circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        className={`${color} fill-none`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-sm sm:text-base lg:text-xl font-black text-text-primary tracking-tighter">{value}</span>
                </div>
            </div>
            {label && (
                <span className="text-[7px] sm:text-[8px] lg:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-text-muted group-hover/stat:text-accent transition-colors text-center">
                    {label}
                </span>
            )}
        </div>
    );
}

/**
 * COMPONENT: SectionHeader
 * A clean header for integrated sections.
 */
function SectionHeader({ title, icon: Icon, delay = 0 }: { title: string, icon: ComponentType<{ className?: string }>, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-12"
        >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-text-muted">{title}</h3>
        </motion.div>
    );
}

/**
 * COMPONENT: InfoBlock
 * A reusable technical info block for the fluid layout.
 */
function InfoBlock({ label, children, className = "", delay = 0 }: { label: string, children: React.ReactNode, className?: string, delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            className={`flex flex-col gap-2 ${className}`}
        >
            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{label}</span>
            <div className="text-text-primary">
                {children}
            </div>
        </motion.div>
    );
}

function AudioPlayer({ cries }: { cries: { latest: string | null; legacy: string | null } }) {
    const [isPlaying, setIsPlaying] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const play = async (type: 'latest' | 'legacy') => {
        const src = cries[type];
        if (!src || !audioRef.current) return;

        try {
            // If already playing something else, pause it first
            audioRef.current.pause();
            audioRef.current.src = src;
            audioRef.current.load(); // Ensure new source is loaded

            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                await playPromise;
            }
            setIsPlaying(type);
        } catch (error) {
            // Silently handle AbortError which occurs when play() is interrupted
            if (error instanceof Error && error.name !== 'AbortError') {
                console.error("Audio playback failed:", error);
            }
            setIsPlaying(null);
        }
    };

    if (!cries.latest && !cries.legacy) return null;

    return (
        <div className="flex items-center gap-3">
            <audio ref={audioRef} onEnded={() => setIsPlaying(null)} />
            {cries.latest && (
                <button
                    onClick={() => play('latest')}
                    className={`p-3 rounded-2xl border transition-all flex items-center gap-2 group ${isPlaying === 'latest' ? 'bg-accent border-accent text-bg-primary' : 'bg-bg-tertiary border-border hover:border-accent text-text-primary'
                        }`}
                >
                    <Volume2 className={`w-4 h-4 ${isPlaying === 'latest' ? 'animate-pulse' : ''}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Latest</span>
                </button>
            )}
            {cries.legacy && (
                <button
                    onClick={() => play('legacy')}
                    className={`p-3 rounded-2xl border transition-all flex items-center gap-2 group ${isPlaying === 'legacy' ? 'bg-accent border-accent text-bg-primary' : 'bg-bg-tertiary border-border hover:border-accent text-text-primary'
                        }`}
                >
                    <Volume2 className={`w-4 h-4 ${isPlaying === 'legacy' ? 'animate-pulse' : ''}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Legacy</span>
                </button>
            )}
        </div>
    );
}

export function PokemonDetailView({ pokemon, species, evolution, encounters }: PokemonDetailViewProps) {
    const flavorText = useMemo(() => species.flavor_text_entries.find((e) => e.language.name === "en")?.flavor_text || "Flavor text unavailable.", [species]);
    const genus = useMemo(() => species.genera.find((g) => g.language.name === "en")?.genus || "Species Unknown", [species]);
    const japaneseName = useMemo(() => species.names.find((n) => n.language.name === "ja-Hrkt")?.name, [species]);

    const [hasMounted, setHasMounted] = useState(false);
    const [cols, setCols] = useState(2);
    const [locCols, setLocCols] = useState(1);
    const [movePage, setMovePage] = useState(1);
    const [locationPage, setLocationPage] = useState(1);

    React.useEffect(() => {
        setHasMounted(true);
        const updateLayout = () => {
            const width = window.innerWidth;

            // Update Move Grid Columns
            if (width < 640) setCols(2); // grid-cols-2
            else if (width < 768) setCols(4); // sm:grid-cols-4
            else if (width < 1024) setCols(4); // sm:grid-cols-4
            else if (width < 1280) setCols(6); // lg:grid-cols-6
            else setCols(8); // xl:grid-cols-8

            // Update Location Grid Columns
            let newLocCols = 1;
            if (width >= 1280) newLocCols = 4;
            else if (width >= 1024) newLocCols = 3;
            else if (width >= 640) newLocCols = 2;
            setLocCols(newLocCols);
        };

        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    }, []);

    const itemsPerPage = useMemo(() => cols * 2, [cols]);
    const totalMovePages = Math.ceil(pokemon.moves.length / itemsPerPage);
    const paginatedMoves = useMemo(() => {
        const start = (movePage - 1) * itemsPerPage;
        return pokemon.moves.slice(start, start + itemsPerPage);
    }, [pokemon.moves, movePage, itemsPerPage]);

    const itemsPerLocationPage = useMemo(() => locCols * 3, [locCols]);

    const totalLocationPages = Math.ceil((encounters?.length || 0) / itemsPerLocationPage);
    const paginatedLocations = useMemo(() => {
        if (!encounters) return [];
        const start = (locationPage - 1) * itemsPerLocationPage;
        return encounters.slice(start, start + itemsPerLocationPage);
    }, [encounters, locationPage, itemsPerLocationPage]);

    // If not mounted, return a simplified version or just nothing to avoid hydration mismatch
    // But since Next.js recommends avoiding branching on mounted state for the top-level 
    // we'll instead wrap the dynamic parts if possible.
    // In this case, most of the layout is already built to handle defaults gracefully.

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 font-sans overflow-x-hidden relative">
            {/* Floating Back Button - Persistent navigation, moved below navbar height */}
            <div className="fixed top-28 left-6 sm:left-12 z-[110]">
                <BackButton variant="floating" label="Back to Library" fallbackPath="/pokedex" />
            </div>

            {/* Background Accents - Optimized for mobile viewport */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[-10%] sm:left-[-5%] w-[80%] sm:w-[40%] h-[40%] bg-accent/5 blur-[80px] sm:blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-10%] sm:right-[-5%] w-[80%] sm:w-[40%] h-[40%] bg-accent/5 blur-[80px] sm:blur-[120px] rounded-full" />
            </div>

            {/* Header Content - Pushed down to clear fixed navbar */}
            <header className="relative z-20 pt-32 sm:pt-48 pb-12 sm:pb-32 px-4 sm:px-8 max-w-7xl mx-auto overflow-visible">

                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 relative overflow-visible max-w-full">
                    <div className="relative max-w-full overflow-visible">
                        <span className="text-[5rem] sm:text-[8rem] lg:text-[16rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1] block uppercase">
                            POKEMON
                        </span>
                        <div className="relative z-10 flex flex-col max-w-full overflow-hidden sm:overflow-visible">
                            <div className="flex items-center gap-4 mb-4 flex-wrap">
                                <span className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    ID #{pokemon.id.toString().padStart(3, "0")}
                                </span>
                                {japaneseName && (
                                    <span className="text-2xl font-black text-text-muted/30 font-japanese">
                                        {japaneseName}
                                    </span>
                                )}
                                <span className="px-4 py-1.5 rounded-full bg-bg-secondary border border-border/50 text-text-muted text-[10px] font-black uppercase tracking-widest">
                                    {species.generation.name.replace("generation-", "Gen ")}
                                </span>
                                {pokemon.is_default && (
                                    <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                        Default Form
                                    </span>
                                )}
                                {pokemon.order > 0 && (
                                    <span className="px-4 py-1.5 rounded-full bg-bg-secondary border border-border/50 text-text-muted text-[10px] font-black uppercase tracking-widest">
                                        Order #{pokemon.order}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-[10rem] font-black text-text-primary uppercase tracking-tighter leading-[0.8] mb-6">
                                {pokemon.name}
                            </h1>
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex gap-2">
                                    {pokemon.types.map((t) => (
                                        <Link
                                            key={t.type.name}
                                            href={`/types/${t.type.name}`}
                                            className="px-6 py-2 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-all shadow-lg"
                                        >
                                            {t.type.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className="h-4 w-px bg-border" />
                                <span className="text-xl font-bold text-text-muted italic">{genus}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center lg:items-end gap-4 sm:gap-6 text-center lg:text-right w-full lg:w-auto">
                        <AudioPlayer cries={pokemon.cries} />
                        <div className="flex justify-center lg:justify-end gap-6 sm:gap-8 lg:gap-12">
                            <div className="flex flex-col">
                                <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Height</span>
                                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-text-primary capitalize">{pokemon.height / 10} m</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Weight</span>
                                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-text-primary capitalize">{pokemon.weight / 10} kg</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Fluid Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-32 space-y-20 sm:space-y-32">

                {/* Section 1: The Specimen (Asymmetric Stats + Artwork) */}
                <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[800px] flex items-center justify-center py-12 lg:py-20">
                    {/* Background Visualizations (Kinetic Biosphere) - Enhanced blending masks */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden max-w-full" style={{ maskImage: 'radial-gradient(circle at center, black 0%, transparent 100%)', WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 100%)' }}>
                        {/* Dynamic Core Glow */}
                        <div className="absolute w-[250vw] sm:w-[1500px] h-[250vw] sm:h-[1500px] bg-accent/[0.02] sm:bg-accent/[0.03] blur-[80px] sm:blur-[150px] rounded-full animate-pulse" />

                        {/* Kinetic Rings Array */}
                        <div className="absolute inset-0 flex items-center justify-center scale-75 sm:scale-100">
                            {[
                                { size: "w-[800px] h-[800px]", rotate: "animate-[spin_40s_linear_infinite]", opacity: "opacity-10 sm:opacity-20" },
                                { size: "w-[600px] h-[600px]", rotate: "animate-[spin_30s_linear_infinite_reverse]", opacity: "opacity-15 sm:opacity-30" },
                                { size: "w-[400px] h-[400px]", rotate: "animate-[spin_20s_linear_infinite]", opacity: "opacity-20 sm:opacity-40" }
                            ].map((ring, i) => (
                                <div key={i} className={`absolute ${ring.size} ${ring.rotate} ${ring.opacity} transition-opacity duration-1000`}>
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <circle
                                            cx="50" cy="50" r="48"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="0.2"
                                            strokeDasharray="1 4"
                                            className="text-accent"
                                        />
                                    </svg>
                                </div>
                            ))}
                        </div>

                        {/* Scanline/Grid Texture Overlay - Extended fade to remove edges */}
                        <div
                            className="absolute inset-0 opacity-[0.01] sm:opacity-[0.02]"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                                backgroundSize: '60px 60px',
                                maskImage: 'radial-gradient(ellipse 70% 50% at center, black 0%, transparent 80%)',
                                WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at center, black 0%, transparent 80%)'
                            }}
                        />

                        {/* Pulse Waveform (Visual Flaring) */}
                        <div
                            className="absolute w-full h-[1.5px] top-1/2 -translate-y-1/2 animate-[pulse_4s_ease-in-out_infinite] opacity-50 sm:opacity-100"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(var(--accent-rgb), 0.2) 30%, rgba(var(--accent-rgb), 0.2) 70%, transparent 100%)'
                            }}
                        />
                    </div>

                    <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Artwork Centerpiece */}
                        <div className="lg:col-span-6 lg:col-start-4 relative z-20">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                className="relative aspect-square w-full max-w-[280px] sm:max-w-[450px] lg:max-w-[650px] mx-auto group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-accent/15 to-transparent blur-[60px] lg:blur-[120px] rounded-full scale-110 group-hover:scale-125 transition-all duration-1000" />
                                <Image
                                    src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default || ""}
                                    alt={pokemon.name}
                                    fill
                                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] sm:drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)] lg:drop-shadow-[0_80px_120px_rgba(0,0,0,0.8)] group-hover:scale-105 lg:group-hover:-translate-y-8 transition-all duration-1000 relative z-10"
                                    priority
                                />

                                {/* Dimension Callouts */}
                                <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-8 lg:gap-16 bg-bg-secondary/40 backdrop-blur-3xl px-4 sm:px-8 lg:px-12 py-2 sm:py-4 lg:py-6 rounded-[1rem] sm:rounded-[2rem] lg:rounded-[2.5rem] border border-white/5 shadow-2xl z-50">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[6px] sm:text-[8px] lg:text-[9px] font-black text-text-muted uppercase tracking-[0.3em] mb-1">Height</span>
                                        <span className="text-sm sm:text-xl lg:text-2xl font-black text-text-primary uppercase">{pokemon.height / 10}<span className="text-[8px] sm:text-xs text-accent ml-1">M</span></span>
                                    </div>
                                    <div className="h-4 sm:h-8 w-px bg-white/10" />
                                    <div className="flex flex-col items-center">
                                        <span className="text-[6px] sm:text-[8px] lg:text-[9px] font-black text-text-muted uppercase tracking-[0.3em] mb-1">Weight</span>
                                        <span className="text-sm sm:text-xl lg:text-2xl font-black text-text-primary uppercase">{pokemon.weight / 10}<span className="text-[8px] sm:text-xs text-accent ml-1">KG</span></span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Group 1: Left Stats + Growth Rate */}
                        <div className="lg:contents">
                            {/* Floating Stats Left */}
                            <div className="lg:col-span-3 lg:col-start-1 relative z-30 lg:absolute lg:top-1/2 lg:left-0 lg:w-[25%] flex flex-col items-center lg:items-start group/left-stack">
                                <div className="lg:-translate-y-1/2 w-full flex flex-col items-center lg:items-start">
                                    <div className="flex lg:flex-col items-start gap-2 sm:gap-8 lg:space-y-10 w-full justify-center lg:justify-start">
                                        {pokemon.stats.slice(0, 3).map((s, i) => (
                                            <motion.div
                                                key={s.stat.name}
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + (i * 0.1) }}
                                                className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-5 group w-fit"
                                            >
                                                <StatRing
                                                    label=""
                                                    value={s.base_stat}
                                                    color={i % 2 === 0 ? "text-accent" : "text-white/40"}
                                                />
                                                <div className="flex flex-col items-start min-w-[80px] sm:min-w-[120px]">
                                                    <span className="text-[7px] sm:text-[10px] font-black text-text-muted uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-1">{s.stat.name.replace("-", " ")}</span>
                                                    <div className="h-1 sm:h-1.5 w-16 sm:w-28 bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${(s.base_stat / 255) * 100}%` }}
                                                            className={`h-full ${i % 2 === 0 ? "bg-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]" : "bg-white/40"}`}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    {/* Growth Rate */}
                                    <div className="mt-16 sm:mt-24 lg:mt-10 w-full flex flex-col items-center lg:items-start">
                                        <span className="text-[8px] sm:text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-1 sm:mb-2">Growth Rate</span>
                                        <Link href={`/pokemon/growth-rates/${species.growth_rate?.name}`} className="text-lg sm:text-3xl lg:text-5xl font-black uppercase tracking-tighter hover:text-accent transition-colors leading-none text-center lg:text-left">
                                            {species.growth_rate?.name.replace(/-/g, " ")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Group 2: Right Stats + Base Exp */}
                        <div className="lg:contents">
                            {/* Floating Stats Right */}
                            <div className="lg:col-span-3 lg:col-start-10 relative z-30 lg:absolute lg:top-1/2 lg:right-0 lg:w-[25%] flex flex-col items-center lg:items-end group/right-stack">
                                <div className="lg:-translate-y-1/2 w-full flex flex-col items-center lg:items-end">
                                    <div className="flex lg:flex-col items-start lg:items-end gap-2 sm:gap-8 lg:space-y-10 w-full justify-center lg:justify-start">
                                        {pokemon.stats.slice(3, 6).map((s, i) => (
                                            <motion.div
                                                key={s.stat.name}
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + (i * 0.1) }}
                                                className="flex flex-col sm:flex-row lg:flex-row-reverse items-center gap-1.5 sm:gap-5 group w-fit"
                                            >
                                                <StatRing
                                                    label=""
                                                    value={s.base_stat}
                                                    color={i % 2 === 0 ? "text-accent" : "text-white/40"}
                                                />
                                                <div className="flex flex-col items-start lg:items-end min-w-[80px] sm:min-w-[120px]">
                                                    <span className="text-[7px] sm:text-[10px] font-black text-text-muted uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-1 text-left lg:text-right">{s.stat.name.replace("-", " ")}</span>
                                                    <div className="h-1 sm:h-1.5 w-16 sm:w-28 bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            whileInView={{ width: `${(s.base_stat / 255) * 100}%` }}
                                                            className={`h-full ${i % 2 === 0 ? "bg-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]" : "bg-white/40"}`}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    {/* Base Experience */}
                                    <div className="mt-16 sm:mt-24 lg:mt-10 w-full flex flex-col items-center lg:items-end">
                                        <span className="text-[8px] sm:text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-1 sm:mb-2">Base Experience</span>
                                        <span className="text-xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-none">{pokemon.base_experience}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Badges Overlay - Properly blended and visible */}
                        <div className="absolute -top-16 lg:-top-12 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 lg:gap-4 z-40 w-full max-w-4xl px-4 pointer-events-none">
                            {[
                                { show: species.is_legendary, label: "Legendary", color: "text-amber-400", icon: Star },
                                { show: species.is_mythical, label: "Mythical", color: "text-indigo-400", icon: Sparkles },
                                { show: species.is_baby, label: "Baby", color: "text-pink-400", icon: Baby },
                                { show: species.has_gender_differences, label: "Gender Differences", color: "text-rose-400", icon: Dna },
                                { show: species.forms_switchable, label: "Forms Switchable", color: "text-emerald-400", icon: Activity },
                            ].filter(b => b.show).map((b, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1 + (i * 0.1) }}
                                    className={`flex items-center gap-2 lg:gap-3 bg-bg-secondary/40 sm:bg-bg-secondary/60 backdrop-blur-xl sm:backdrop-blur-2xl px-3 sm:px-6 py-1 sm:py-2.5 rounded-lg sm:rounded-2xl border border-white/5 sm:border-white/10 shadow-2xl ${b.color} pointer-events-auto`}
                                >
                                    <b.icon className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                                    <span className="text-[7px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">{b.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 2: Narrative & Taxonomy - Bento Grid Layout */}
                <section className="relative">
                    {/* Floating accent orb */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Narrative Card - Spans 2 columns */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative p-6 sm:p-10 lg:p-14 bg-bg-secondary/40 backdrop-blur-xl border border-white/5 rounded-[2rem] h-full overflow-visible">
                                {/* Decorative quote mark */}
                                <div className="absolute -top-8 -left-4 text-[15rem] font-black text-accent/5 leading-none select-none pointer-events-none">&quot;</div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                            <Info className="w-5 h-5 text-accent" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Flavor Text</span>
                                    </div>

                                    <p className="text-lg sm:text-2xl lg:text-4xl font-black leading-[1.15] tracking-tight text-text-primary">
                                        {flavorText.replace(/\f/g, " ")}
                                    </p>

                                    {/* Animated underline */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "30%" }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        className="h-1 bg-gradient-to-r from-accent to-transparent rounded-full mt-8"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Taxonomy Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative p-6 sm:p-10 bg-bg-secondary/40 backdrop-blur-xl border border-white/5 rounded-[2rem] h-full overflow-visible">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                        <Shapes className="w-5 h-5 text-accent" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Species Info</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: "Color", value: species.color?.name, icon: Palette, color: "text-blue-400", href: `/pokemon/colors/${species.color?.name}` },
                                        { label: "Shape", value: species.shape?.name, icon: Shapes, color: "text-purple-400", href: `/pokemon/shapes/${species.shape?.name}` },
                                        { label: "Habitat", value: species.habitat?.name || "Unknown", icon: TreeDeciduous, color: "text-emerald-400", href: `/pokemon/habitats/${species.habitat?.name}` },
                                        { label: "Base Happiness", value: species.base_happiness, icon: Star, color: "text-amber-400", href: null },
                                    ].map((item, i) => (
                                        <div key={i} className="group/item relative">
                                            {item.href ? (
                                                <Link href={item.href} className="block p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-[8px] sm:text-[9px] font-black text-text-muted uppercase tracking-[0.2em]">{item.label}</span>
                                                        <item.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${item.color} opacity-40 group-hover/item:opacity-100 transition-opacity`} />
                                                    </div>
                                                    <div className="text-lg sm:text-xl font-black capitalize text-text-primary group-hover/item:text-accent transition-colors truncate">
                                                        {item.value}
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 transition-all duration-300">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-[8px] sm:text-[9px] font-black text-text-muted uppercase tracking-[0.2em]">{item.label}</span>
                                                        <item.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${item.color} opacity-40`} />
                                                    </div>
                                                    <div className="text-lg sm:text-xl font-black text-text-primary">
                                                        {item.value}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Section 3: Biological Assets & Ecological Cycle - Creative Cards */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Biological Assets */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="p-6 sm:p-10 bg-bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-visible">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20">
                                    <Dna className="w-5 h-5 text-accent" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Abilities</span>
                            </div>

                            <div className="space-y-4">
                                {pokemon.abilities.map((a, i) => (
                                    <Link
                                        key={a.ability.name}
                                        href={`/abilities/${a.ability.name}`}
                                        className="group relative flex items-center gap-5 p-6 bg-white/[0.03] hover:bg-accent/5 border border-white/5 hover:border-accent/30 rounded-2xl transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="absolute -right-2 -bottom-4 text-7xl font-black text-white/[0.03] italic group-hover:text-accent/5 transition-colors select-none">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center border border-accent/10 group-hover:border-accent/40 transition-colors shrink-0">
                                            <Dna className="w-5 h-5 text-accent opacity-60 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className="relative z-10 flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.2em]">
                                                    {a.is_hidden ? "Hidden Ability" : "Regular Ability"}
                                                </span>
                                                {a.is_hidden && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(var(--accent-rgb),1)]" />
                                                )}
                                            </div>
                                            <span className="text-xl font-black text-text-primary capitalize group-hover:text-accent transition-colors truncate block">
                                                {a.ability.name.replace(/-/g, " ")}
                                            </span>
                                        </div>
                                        <div className="relative z-10 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-all shrink-0">
                                            <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Ecological Cycle */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="p-6 sm:p-10 bg-bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-[2rem] h-full overflow-visible">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20">
                                    <Egg className="w-5 h-5 text-accent" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Egg Groups</span>
                            </div>

                            {/* Egg Groups */}
                            <div className="mb-10">
                                <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.3em] block mb-4 italic opacity-50">Egg Groups</span>
                                <div className="flex flex-wrap gap-3">
                                    {species.egg_groups.map((g) => (
                                        <Link
                                            key={g.name}
                                            href={`/pokemon/egg-groups/${g.name}`}
                                            className="group/egg relative overflow-hidden px-6 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:border-accent/40 transition-all duration-500"
                                        >
                                            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors" />
                                            <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-text-secondary group-hover:text-accent transition-colors">
                                                {g.name.replace(/-/g, " ")}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Gender Ratio - Redesigned */}
                            <div className="mb-10 p-6 bg-white/[0.03] rounded-2xl border border-white/5 relative overflow-hidden group/gender">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.3em] italic opacity-50">Gender Probability</span>
                                    {species.gender_rate !== -1 && (
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-1.5 grayscale opacity-50 group-hover/gender:grayscale-0 group-hover/gender:opacity-100 transition-all">
                                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                <span className="text-[10px] font-black text-text-muted">MALE</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 grayscale opacity-50 group-hover/gender:grayscale-0 group-hover/gender:opacity-100 transition-all">
                                                <div className="w-2 h-2 rounded-full bg-pink-500" />
                                                <span className="text-[10px] font-black text-text-muted">FEMALE</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-5">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/5 bg-white/5 ${species.gender_rate === -1 ? 'opacity-20' : 'text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]'}`}>
                                        <Star className="w-4 h-4 fill-current" />
                                    </div>

                                    <div className="flex-1 h-3 bg-bg-primary rounded-full overflow-hidden flex p-0.5 border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: species.gender_rate === -1 ? "100%" : `${100 - (species.gender_rate / 8) * 100}%` }}
                                            className={`h-full rounded-full transition-all duration-1000 ${species.gender_rate === -1 ? "bg-white/10" : "bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)]"}`}
                                        />
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: species.gender_rate === -1 ? "0%" : `${(species.gender_rate / 8) * 100}%` }}
                                            className="h-full rounded-full bg-gradient-to-r from-pink-400 to-pink-600 shadow-[0_0_10px_rgba(236,72,153,0.4)]"
                                        />
                                    </div>

                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/5 bg-white/5 ${species.gender_rate === -1 ? 'opacity-20' : 'text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]'}`}>
                                        <Sparkles className="w-4 h-4 fill-current" />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-between items-end">
                                    {species.gender_rate === -1 ? (
                                        <span className="w-full text-center text-xs font-black text-text-muted uppercase tracking-[0.4em] animate-pulse">Asymmetric / Genderless</span>
                                    ) : (
                                        <>
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-black text-text-primary tracking-tighter">{100 - (species.gender_rate / 8) * 100}<span className="text-[10px] text-blue-400 ml-0.5">%</span></span>
                                            </div>
                                            <div className="flex flex-col text-right">
                                                <span className="text-2xl font-black text-text-primary tracking-tighter">{(species.gender_rate / 8) * 100}<span className="text-[10px] text-pink-400 ml-0.5">%</span></span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 group/stat-tile transition-all duration-300 hover:bg-accent/5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Egg className="w-3 h-3 text-accent group-hover/stat-tile:scale-125 transition-transform" />
                                        <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.2em]">Hatch Counter</span>
                                    </div>
                                    <span className="text-3xl font-black text-text-primary tracking-tighter">{species.hatch_counter}</span>
                                </div>
                                <div className="p-6 bg-white/[0.03] rounded-2xl border border-white/5 group/stat-tile transition-all duration-300 hover:bg-accent/5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Target className="w-3 h-3 text-accent group-hover/stat-tile:scale-125 transition-transform" />
                                        <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.2em]">Catch Rate</span>
                                    </div>
                                    <span className="text-3xl font-black text-text-primary tracking-tighter">{species.capture_rate}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Section 4: Visual Archive */}
                <section className="space-y-12">
                    <SectionHeader title="Sprites" icon={Images} />
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                        {[
                            { url: pokemon.sprites.other.showdown.front_default, label: "Showdown Front", isShiny: false },
                            { url: pokemon.sprites.other.showdown.front_shiny, label: "Showdown Shiny", isShiny: true },
                            { url: pokemon.sprites.other.home.front_default, label: "Home Sprite", isShiny: false },
                            { url: pokemon.sprites.front_default, label: "Official Front", isShiny: false },
                            { url: pokemon.sprites.back_default, label: "Official Back", isShiny: false },
                            { url: pokemon.sprites.front_shiny, label: "Official Shiny Front", isShiny: true },
                            { url: pokemon.sprites.back_shiny, label: "Official Shiny Back", isShiny: true },
                        ].filter(s => s.url).map((s, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className={`group/spr relative p-4 bg-bg-secondary/40 border border-white/5 rounded-[2rem] transition-all duration-500 hover:border-accent/30 overflow-hidden ${s.isShiny ? 'hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]' : 'hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.15)]'}`}
                            >
                                {/* Static Background Tech */}
                                <div className="absolute inset-0 z-0">
                                    <div className={`absolute inset-0 opacity-0 group-hover/spr:opacity-100 transition-opacity duration-700 ${s.isShiny ? 'bg-gradient-to-b from-amber-400/5 to-transparent' : 'bg-gradient-to-b from-accent/5 to-transparent'}`} />
                                    <div className="absolute inset-x-0 bottom-0 h-px bg-white/5" />
                                </div>

                                {/* Radial Glow */}
                                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 blur-[40px] rounded-full opacity-0 group-hover/spr:opacity-20 transition-all duration-700 ${s.isShiny ? 'bg-amber-400' : 'bg-accent'}`} />

                                {/* Scanline Surface */}
                                <div
                                    className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none"
                                    style={{
                                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)`,
                                        backgroundSize: '100% 4px'
                                    }}
                                />

                                <div className="relative z-20 flex flex-col items-center gap-6">
                                    <div className="relative w-full aspect-square flex items-center justify-center p-2">
                                        <img
                                            src={s.url!}
                                            alt={s.label}
                                            className="w-full h-full object-contain filter drop-shadow-2xl group-hover/spr:scale-125 transition-transform duration-700 relative z-30"
                                        />

                                        {/* Shiny Indicator Overlays Removed as per user request */}
                                    </div>

                                    <div className="flex flex-col items-center gap-1.5 w-full">
                                        <div className="h-px w-8 bg-white/10 group-hover/spr:w-full transition-all duration-700" />
                                        <div className="flex items-center gap-2">
                                            {s.isShiny && <Star className="w-3 h-3 text-amber-400 fill-current" />}
                                            <span className={`text-[8px] font-black uppercase tracking-[0.3em] transition-colors ${s.isShiny ? 'text-amber-500/60 group-hover/spr:text-amber-400' : 'text-text-muted group-hover/spr:text-accent'}`}>
                                                {s.label}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Corner Decals */}
                                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/10 group-hover/spr:border-accent/40" />
                                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/10 group-hover/spr:border-accent/40" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Section 5: Evolution Sequence */}
                <section className="space-y-16">
                    <div className="flex flex-col items-center text-center">
                        <SectionHeader title="Evolution Chain" icon={Dna} />
                        <p className="text-xl font-black text-text-muted max-w-2xl tracking-tighter">Natural evolution sequence and growth phases.</p>
                    </div>
                    <div className="w-full overflow-x-auto pb-8 mask-gradient">
                        <EvolutionChainDisplay chain={evolution} />
                    </div>
                </section>

                {/* Section 6: Mastery Catalog (Moves) */}
                <section className="space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <SectionHeader title="Moves" icon={Zap} />

                        {/* Moves Pagination */}
                        <div className="flex flex-col items-center md:items-end gap-3">
                            <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.3em] italic opacity-50 ml-2">Moves Pagination</span>
                            <div className="flex items-center bg-white/[0.03] backdrop-blur-md rounded-2xl p-1.5 sm:p-2 border border-white/5 shadow-2xl gap-2 sm:gap-3 group/limit max-w-full overflow-x-auto no-scrollbar">
                                <button
                                    onClick={() => setMovePage(prev => Math.max(1, prev - 1))}
                                    disabled={movePage <= 1}
                                    className="p-2 sm:p-3 rounded-xl hover:bg-white/5 text-text-muted hover:text-accent disabled:opacity-10 transition-all duration-300 active:scale-95"
                                >
                                    <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                                </button>

                                <div className="flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2">
                                    {Array.from({ length: Math.min(5, totalMovePages) }, (_, i) => {
                                        // Simple sliding window for pagination numbers
                                        let pageNum = i + 1;
                                        if (totalMovePages > 5) {
                                            if (movePage > 3) {
                                                pageNum = movePage - 3 + i + 1;
                                                if (pageNum > totalMovePages) pageNum = totalMovePages - (5 - i - 1);
                                            }
                                        }

                                        if (pageNum <= 0 || pageNum > totalMovePages) return null;

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => setMovePage(pageNum)}
                                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-[9px] sm:text-[10px] font-black tracking-widest transition-all duration-300 border ${movePage === pageNum
                                                    ? "bg-accent border-accent text-bg-primary shadow-lg shadow-accent/20 scale-105"
                                                    : "bg-white/5 border-white/5 text-text-muted hover:text-text-primary hover:border-white/10"
                                                    }`}
                                            >
                                                {String(pageNum).padStart(2, '0')}
                                            </button>
                                        );
                                    })}
                                    {totalMovePages > 5 && movePage < totalMovePages - 2 && (
                                        <span className="text-text-muted opacity-30 select-none px-1">...</span>
                                    )}
                                </div>

                                <button
                                    onClick={() => setMovePage(prev => Math.min(totalMovePages, prev + 1))}
                                    disabled={movePage >= totalMovePages}
                                    className="p-2 sm:p-3 rounded-xl hover:bg-white/5 text-text-muted hover:text-accent disabled:opacity-10 transition-all duration-300 active:scale-95"
                                >
                                    <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 min-h-[360px]">
                        {paginatedMoves.map((m, idx) => {
                            const detail = m.version_group_details[0];
                            const level = detail?.level_learned_at;
                            const method = detail?.move_learn_method.name.replace(/-/g, " ");

                            return (
                                <motion.div
                                    key={m.move.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (idx % 24) * 0.02 }}
                                >
                                    <Link
                                        href={`/moves/${m.move.name}`}
                                        className="group/move relative p-5 h-44 flex flex-col justify-between bg-white/[0.02] border border-white/5 hover:border-accent/40 rounded-2xl transition-all duration-500 overflow-hidden"
                                    >
                                        {/* Vertical Technical Accent */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5 group-hover/move:bg-accent transition-colors duration-500" />

                                        {/* Background Slot Indicator */}
                                        <div className="absolute -right-2 -bottom-4 text-7xl font-black text-white/[0.02] italic group-hover/move:text-accent/[0.04] transition-colors select-none">
                                            {level > 0 ? String(level).padStart(2, '0') : "TU"}
                                        </div>

                                        <div className="relative z-10 flex justify-between items-start">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 opacity-40 group-hover/move:opacity-100 transition-opacity">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                                    <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">{method}</span>
                                                </div>
                                                <div className="text-sm font-black uppercase tracking-tight text-text-primary group-hover/move:text-accent transition-colors leading-tight">
                                                    {m.move.name.replace(/-/g, " ")}
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-text-muted group-hover/move:text-accent group-hover/move:translate-x-1 transition-all shrink-0" />
                                        </div>

                                        <div className="relative z-10 flex items-end justify-between min-h-[40px]">
                                            {level > 0 && (
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.2em] mb-1">LEARN LEVEL</span>
                                                    <span className="text-2xl font-black text-accent tracking-tighter tabular-nums">
                                                        {level}<span className="text-[10px] ml-0.5 opacity-50">.0</span>
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Cyber Glow Effect */}
                                        <div className="absolute inset-0 bg-accent/0 group-hover/move:bg-accent/5 transition-colors duration-500" />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Section 7: Geographic Catalog (Locations) */}
                <section className="space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <SectionHeader title="Locations" icon={MapPin} />

                        {/* Locations Pagination */}
                        {totalLocationPages > 1 && (
                            <div className="flex flex-col items-center md:items-end gap-3">
                                <span className="text-[8px] font-black text-text-muted uppercase tracking-[0.3em] italic opacity-50 ml-2">Locations Pagination</span>
                                <div className="flex items-center bg-white/[0.03] backdrop-blur-md rounded-2xl p-1.5 sm:p-2 border border-white/5 shadow-2xl gap-2 sm:gap-3 group/limit max-w-full overflow-x-auto no-scrollbar">
                                    <button
                                        onClick={() => setLocationPage(prev => Math.max(1, prev - 1))}
                                        disabled={locationPage <= 1}
                                        className="p-2 sm:p-3 rounded-xl hover:bg-white/5 text-text-muted hover:text-accent disabled:opacity-10 transition-all duration-300 active:scale-95"
                                    >
                                        <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    </button>

                                    <div className="flex items-center gap-1.5 px-2">
                                        {Array.from({ length: Math.min(5, totalLocationPages) }, (_, i) => {
                                            let pageNum = i + 1;
                                            if (totalLocationPages > 5) {
                                                if (locationPage > 3) {
                                                    pageNum = locationPage - 3 + i + 1;
                                                    if (pageNum > totalLocationPages) pageNum = totalLocationPages - (5 - i - 1);
                                                }
                                            }
                                            if (pageNum <= 0 || pageNum > totalLocationPages) return null;

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setLocationPage(pageNum)}
                                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-[9px] sm:text-[10px] font-black tracking-widest transition-all duration-300 border ${locationPage === pageNum
                                                        ? "bg-accent border-accent text-bg-primary shadow-lg shadow-accent/20 scale-105"
                                                        : "bg-white/5 border-white/5 text-text-muted hover:text-text-primary hover:border-white/10"
                                                        }`}
                                                >
                                                    {String(pageNum).padStart(2, '0')}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => setLocationPage(prev => Math.min(totalLocationPages, prev + 1))}
                                        disabled={locationPage >= totalLocationPages}
                                        className="p-2 sm:p-3 rounded-xl hover:bg-white/5 text-text-muted hover:text-accent disabled:opacity-10 transition-all duration-300 active:scale-95"
                                    >
                                        <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden min-h-[480px]">
                        {paginatedLocations.length > 0 ? (
                            paginatedLocations.map((enc) => (
                                <div key={enc.location_area.name} className="p-8 bg-bg-primary hover:bg-accent/[0.02] transition-colors group/loc flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-md font-black uppercase tracking-tighter text-text-primary group-hover/loc:text-accent transition-colors">{enc.location_area.name.replace(/-/g, " ")}</span>
                                        <ChevronRight className="w-4 h-4 text-text-muted group-hover/loc:text-accent group-hover:translate-x-1" />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {enc.version_details.map(v => (
                                            <span key={v.version.name} className="text-[8px] font-black text-accent bg-accent/5 px-2 py-0.5 rounded-md border border-accent/10">
                                                {v.version.name.replace(/-/g, " ")}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center bg-bg-primary italic font-black text-text-muted tracking-widest opacity-20 capitalize">
                                No Geographic Signatures Detected
                            </div>
                        )}
                    </div>
                </section>

                {/* Section 8: Specimen Variations (Species Varieties) */}
                <section className="space-y-12">
                    <SectionHeader title="Species Varieties" icon={Package} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {species.varieties && species.varieties.length > 1 ? (
                            species.varieties.map((v) => (
                                <Link
                                    key={v.pokemon.name}
                                    href={`/pokemon/${v.pokemon.name}`}
                                    className={`flex items-center justify-between p-8 rounded-[2rem] border transition-all ${v.is_default
                                        ? "bg-accent/10 border-accent/30 text-accent"
                                        : "bg-bg-secondary/30 border-white/5 hover:border-accent"
                                        }`}
                                >
                                    <span className="text-xs font-black uppercase tracking-widest">{v.pokemon.name.replace(/-/g, " ")}</span>
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full p-12 border-2 border-dashed border-white/5 rounded-[3rem] text-center text-[10px] font-black text-text-muted uppercase tracking-widest opacity-30">
                                Single Form Identified
                            </div>
                        )}
                    </div>
                </section>

                {/* Section 9: Historical Type Changes (past_types) */}
                {pokemon.past_types && pokemon.past_types.length > 0 && (
                    <section className="space-y-12">
                        <SectionHeader title="Historical Types" icon={History} />
                        <div className="p-6 sm:p-10 bg-bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-[2rem]">
                            <p className="text-sm text-text-muted font-bold mb-8">
                                Type classifications that were changed across different generations.
                            </p>
                            <div className="space-y-6">
                                {pokemon.past_types.map((pt, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-white/[0.03] border border-white/5 rounded-2xl"
                                    >
                                        <div className="flex items-center gap-3 shrink-0">
                                            <History className="w-4 h-4 text-amber-400" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                                                Before {pt.generation.name.replace("generation-", "Gen ")}
                                            </span>
                                        </div>
                                        <div className="h-4 w-px bg-white/10 hidden sm:block" />
                                        <div className="flex flex-wrap gap-2">
                                            {pt.types && pt.types.map((t) => t.type && (
                                                <Link
                                                    key={t.type.name}
                                                    href={`/types/${t.type.name}`}
                                                    className="px-4 py-2 rounded-xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest hover:border-accent hover:text-accent transition-all"
                                                >
                                                    {t.type.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Section 10: Historical Ability Changes (past_abilities) */}
                {pokemon.past_abilities && pokemon.past_abilities.length > 0 && (
                    <section className="space-y-12">
                        <SectionHeader title="Historical Abilities" icon={History} />
                        <div className="p-6 sm:p-10 bg-bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-[2rem]">
                            <p className="text-sm text-text-muted font-bold mb-8">
                                Ability assignments that were changed across different generations.
                            </p>
                            <div className="space-y-6">
                                {pokemon.past_abilities.map((pa, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <History className="w-4 h-4 text-purple-400" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">
                                                Before {pa.generation.name.replace("generation-", "Gen ")}
                                            </span>
                                        </div>
                                        <div className="space-y-3">
                                            {pa.abilities && pa.abilities.map((a, i) => a.ability && (
                                                <Link
                                                    key={i}
                                                    href={`/abilities/${a.ability.name}`}
                                                    className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-accent transition-all group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Dna className="w-4 h-4 text-accent opacity-50 group-hover:opacity-100" />
                                                        <span className="font-black capitalize text-sm group-hover:text-accent transition-colors">
                                                            {a.ability.name.replace(/-/g, " ")}
                                                        </span>
                                                    </div>
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">
                                                        {a.is_hidden ? "Hidden" : `Slot ${a.slot}`}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Section 11: Pokédex Entries (pokedex_numbers) */}
                {species.pokedex_numbers && species.pokedex_numbers.length > 0 && (
                    <section className="space-y-12">
                        <SectionHeader title="Pokédex Entries" icon={Book} />
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {species.pokedex_numbers.map((entry, idx) => entry.pokedex && (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="p-6 bg-bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-2xl hover:border-accent/30 transition-all group"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <Hash className="w-3 h-3 text-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                                        <span className="text-2xl font-black text-text-primary tracking-tighter">
                                            {entry.entry_number}
                                        </span>
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">
                                        {entry.pokedex.name.replace(/-/g, " ")}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Section 12: Version Appearances (game_indices) */}
                {pokemon.game_indices && pokemon.game_indices.length > 0 && (
                    <section className="space-y-12">
                        <SectionHeader title="Version Appearances" icon={Gamepad2} />
                        <div className="p-6 sm:p-10 bg-bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-[2rem]">
                            <p className="text-sm text-text-muted font-bold mb-8">
                                Internal version indices for this Pokémon across different game releases.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                                {pokemon.game_indices.map((gi, idx) => gi.version && (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.02 }}
                                        className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:border-accent/30 transition-all group"
                                    >
                                        <span className="text-[9px] font-black uppercase tracking-widest text-text-muted group-hover:text-accent transition-colors truncate flex-1">
                                            {gi.version.name}
                                        </span>
                                        <span className="text-sm font-black text-accent ml-2">
                                            #{gi.game_index}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Section 13: Pokemon Forms from pokemon.forms */}
                {pokemon.forms && pokemon.forms.length > 1 && (
                    <section className="space-y-12">
                        <SectionHeader title="Registered Forms" icon={Layers} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {pokemon.forms.map((form, idx) => form && (
                                <motion.div
                                    key={form.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-6 bg-bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-2xl hover:border-accent/30 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                                            <Layers className="w-5 h-5 text-accent" />
                                        </div>
                                        <span className="text-sm font-black uppercase tracking-widest text-text-primary group-hover:text-accent transition-colors">
                                            {form.name.replace(/-/g, " ")}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Section 14: Form Descriptions (form_descriptions) */}
                {species.form_descriptions && species.form_descriptions.length > 0 && (
                    <section className="space-y-12">
                        <SectionHeader title="Form Descriptions" icon={FileText} />
                        <div className="space-y-4">
                            {species.form_descriptions
                                .filter(fd => fd.language.name === "en")
                                .map((fd, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 sm:p-10 bg-bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-[2rem]"
                                    >
                                        <p className="text-lg font-bold text-text-primary leading-relaxed">
                                            {fd.description}
                                        </p>
                                    </motion.div>
                                ))}
                        </div>
                    </section>
                )}

                {/* Section 15: Pal Park Encounters (pal_park_encounters) */}
                {species.pal_park_encounters && species.pal_park_encounters.length > 0 && (
                    <section className="space-y-12">
                        <SectionHeader title="Pal Park Data" icon={Trees} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {species.pal_park_encounters.map((ppe, idx) => ppe.area && (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 sm:p-8 bg-bg-secondary/30 backdrop-blur-xl border border-white/5 rounded-[2rem] group hover:border-emerald-500/30 transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                            <Trees className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-text-muted block">Area</span>
                                            <span className="text-xl font-black capitalize text-text-primary group-hover:text-emerald-400 transition-colors">
                                                {ppe.area.name.replace(/-/g, " ")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-text-muted block mb-2">Base Score</span>
                                            <span className="text-2xl font-black text-emerald-400">{ppe.base_score}</span>
                                        </div>
                                        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-text-muted block mb-2">Encounter Rate</span>
                                            <span className="text-2xl font-black text-accent">{ppe.rate}%</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Final Held Items Section */}
                <section className="pt-32 border-t border-white/5 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4 max-w-xl">
                            <SectionHeader title="Held Items" icon={Scan} />
                            <p className="text-sm text-text-muted font-bold tracking-tight leading-relaxed">
                                Analysis of items held by wild specimens. Probability data generated from version-specific encounter rates.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {pokemon.held_items && pokemon.held_items.length > 0 ? (
                            pokemon.held_items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="relative p-1 bg-white/[0.02] border border-white/5 rounded-[3rem] group/payload overflow-visible"
                                >
                                    {/* Scanner Corner Brackets */}
                                    <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-accent/30 rounded-tl-xl group-hover/payload:border-accent transition-colors duration-500" />
                                    <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-xl group-hover/payload:border-accent transition-colors duration-500" />
                                    <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-accent/30 rounded-bl-xl group-hover/payload:border-accent transition-colors duration-500" />
                                    <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-accent/30 rounded-br-xl group-hover/payload:border-accent transition-colors duration-500" />

                                    <div className="p-6 sm:p-10 space-y-8 sm:space-y-10 relative z-10">
                                        {/* Header Area */}
                                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 pb-8 border-b border-white/5">
                                            <div className="flex items-center gap-6">
                                                <div className="w-20 h-20 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10 group-hover/payload:bg-accent/10 group-hover/payload:border-accent/30 transition-all duration-500 overflow-hidden shrink-0">
                                                    <img
                                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.item.name}.png`}
                                                        alt={item.item.name}
                                                        className="w-12 h-12 object-contain filter drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
                                                        }}
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-3 text-accent mb-1">
                                                        <Fingerprint size={14} className="animate-pulse" />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">ITEM_ANALYSIS</span>
                                                    </div>
                                                    <h4 className="text-4xl font-black uppercase tracking-tighter text-text-primary group-hover/payload:text-accent transition-colors duration-500">
                                                        {item.item.name.replace(/-/g, " ")}
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-12">
                                                <div>
                                                    <span className="text-[8px] font-black text-text-muted uppercase tracking-widest block mb-2">PROBABILITY_READY</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                                        <span className="text-[10px] font-black text-text-primary tracking-widest uppercase">AVAILABLE</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="text-[8px] font-black text-text-muted uppercase tracking-widest block mb-2">NATIONAL_ITEM_ID</span>
                                                    <span className="text-[10px] font-black text-text-primary tracking-widest uppercase font-mono">
                                                        #{item.item.url.split('/').filter(Boolean).pop()?.padStart(4, '0')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Rarity Grid Section */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-px w-8 bg-accent/30" />
                                                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">VERSION_SPECIFIC_RARITIES</span>
                                                <div className="h-px flex-1 bg-white/5" />
                                            </div>

                                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                                                {item.version_details.map(v => (
                                                    <div key={v.version.name} className="flex flex-col p-3 rounded-xl bg-bg-primary/50 border border-white/5 group/version hover:border-accent/20 transition-all">
                                                        <span className="text-[8px] font-black text-text-muted uppercase tracking-wider mb-1 whitespace-pre-wrap leading-tight">{v.version.name.replace(/-/g, " ")}</span>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-lg font-black text-text-primary font-mono">{v.rarity}</span>
                                                            <span className="text-[10px] font-black text-accent">%</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Hold Data Footer */}
                                        <div className="pt-6 border-t border-white/5">
                                            <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 inline-flex items-center gap-6 max-w-2xl">
                                                <div className="shrink-0 text-[10px] font-black text-accent uppercase tracking-widest border-r border-accent/20 pr-6">HOLD_DATA</div>
                                                <div className="text-[9px] font-bold text-text-muted leading-tight uppercase tracking-tight">
                                                    Automated Probability of occurrence during wild encounter across identified regions.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-accent/5 to-transparent h-32 w-full -top-32 group-hover/payload:animate-scan-fast opacity-0 group-hover/payload:opacity-100" />

                                    {/* Background Glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-[80px] rounded-full opacity-0 group-hover/payload:opacity-100 transition-opacity duration-700" />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full p-24 border-2 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center gap-6 group">
                                <Scan size={48} className="text-text-muted opacity-20 group-hover:rotate-90 transition-transform duration-700" />
                                <div className="text-center space-y-2">
                                    <div className="text-sm font-black text-text-muted uppercase tracking-[0.5em] opacity-30">NO_HELD_ITEMS</div>
                                    <p className="text-[10px] font-bold text-text-muted/40 uppercase tracking-widest">This Pokemon does not typically hold items in the wild.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Termination Footer */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-white/5 relative z-10 flex flex-col items-center text-center">
                <Link href="/" className="group flex flex-col items-center gap-8">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-bg-secondary border border-white/5 group-hover:border-accent group-hover:bg-accent/20 flex items-center justify-center transition-all duration-700">
                        <ArrowLeft className="w-8 h-8 text-text-muted group-hover:text-accent transition-colors" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[1em] text-text-muted group-hover:text-accent transition-all pl-[1em]">Back to List</span>
                </Link>
            </div>
        </div >
    );
}
