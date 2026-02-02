"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PokemonDetail } from "@/lib/api";
import { getTypeColor, cn } from "@/lib/utils";
import { PokemonTypeEffect } from "./TypeEffects";
import { ArrowUpRight, Hexagon, Crosshair, Sparkles } from "lucide-react";

interface PokemonCardProps {
    pokemon: PokemonDetail;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    const mainType = pokemon.types[0].type.name;
    const typeColor = getTypeColor(mainType);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty("--mouse-x", `${x}px`);
        cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            whileTap="hover"
            whileFocus="hover"
            variants={{
                initial: { y: 0 },
                hover: { y: -10 }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            className="group"
        >
            <Link
                href={`/pokemon/${pokemon.name}`}
                className="relative block h-full w-full"
            >
                {/* Tech Card Container */}
                <div
                    ref={cardRef}
                    className={cn(
                        "relative h-full bg-bg-secondary/40 backdrop-blur-sm rounded-[24px] border overflow-hidden transition-all duration-500",
                        "hover:shadow-[0_0_40px_-10px_var(--type-color-alpha)]"
                    )}
                    style={{
                        borderColor: `${typeColor}30`, // 30 = Hex opacity ~20%
                        "--type-color": typeColor,
                        "--type-color-alpha": `${typeColor}40`,
                    } as React.CSSProperties}
                >
                    {/* Dynamic Ambient Background */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(circle at center, ${typeColor}15, transparent 70%)`
                        }}
                    />

                    {/* Visual Decor - Tech Grid */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                        style={{
                            backgroundImage: `linear-gradient(${typeColor}30 1px, transparent 1px), linear-gradient(90deg, ${typeColor}30 1px, transparent 1px)`,
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {/* Content Layout */}
                    <div className="relative z-10 p-5 flex flex-col h-full min-h-[320px]">

                        {/* Header: ID & Status */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-mono font-black tracking-widest uppercase mb-1" style={{ color: typeColor }}>
                                    Specimen
                                </span>
                                <span className="text-xs font-mono text-text-muted/60">
                                    #{pokemon.id.toString().padStart(4, "0")}
                                </span>
                            </div>

                            <motion.div
                                variants={{
                                    initial: { opacity: 0, scale: 0.8, backgroundColor: `${typeColor}00` },
                                    hover: { opacity: 1, scale: 1, backgroundColor: typeColor }
                                }}
                                className="w-8 h-8 rounded-full text-white flex items-center justify-center transition-colors duration-300"
                            >
                                <ArrowUpRight className="w-4 h-4" />
                            </motion.div>
                        </div>

                        {/* Centered Image Showcase */}
                        <div className="relative flex-1 flex items-center justify-center my-4">

                            {/* Center Halo (Static Base Glow) - z-0 background layer */}
                            <div
                                className="absolute w-32 h-32 blur-[40px] opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full z-0"
                                style={{ backgroundColor: typeColor }}
                            />

                            {/* Pokemon Image Container */}
                            <div className="relative w-40 h-40">
                                {pokemon.sprites.other["official-artwork"].front_default ? (
                                    <motion.div
                                        variants={{
                                            initial: { scale: 1, y: 0, filter: "grayscale(20%) contrast(100%)" },
                                            hover: {
                                                scale: 1.35,
                                                y: -10,
                                                filter: "grayscale(0%) contrast(110%) drop-shadow(0 10px 20px rgba(0,0,0,0.3))"
                                            }
                                        }}
                                        transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 15 }}
                                        className="w-full h-full relative"
                                    >
                                        <Image
                                            src={pokemon.sprites.other["official-artwork"].front_default}
                                            alt={pokemon.name}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 640px) 50vw, 33vw"
                                            priority={pokemon.id <= 10}
                                        />
                                    </motion.div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-text-muted/20">
                                        <Hexagon className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-auto pt-4 border-t" style={{ borderColor: `${typeColor}20` }}>
                            <div className="flex items-center justify-between items-end">
                                <div>
                                    <h3 className="text-xl font-black text-text-primary capitalize tracking-tight mb-2 group-hover:text-[var(--type-color)] transition-colors duration-300">
                                        {pokemon.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5">
                                        {pokemon.types.map((typeObj) => {
                                            const currentType = typeObj.type.name.toLowerCase().trim();
                                            const currentTypeColor = getTypeColor(currentType);
                                            return (
                                                <span
                                                    key={currentType}
                                                    data-type={currentType}
                                                    className="px-2 py-0.5 rounded-[4px] border text-[9px] font-bold uppercase tracking-wider transition-all duration-300"
                                                    style={{
                                                        backgroundColor: `${currentTypeColor}15`,
                                                        borderColor: `${currentTypeColor}30`,
                                                        color: currentTypeColor
                                                    }}
                                                >
                                                    {currentType}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: typeColor }} />
                                    <Crosshair className="w-4 h-4 text-text-muted/30 group-hover:opacity-0 transition-opacity duration-300" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Elemental Particle Effects - z-20 layer, centered around the image area */}
                    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
                        <div className="relative w-56 h-56 overflow-visible">
                            <PokemonTypeEffect types={pokemon.types} />
                        </div>
                    </div>

                    {/* Spotlight overlay effect */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${typeColor}10, transparent 40%)`
                        }}
                    />
                </div>
            </Link>
        </motion.div>
    );
}
