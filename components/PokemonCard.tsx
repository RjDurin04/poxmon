"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PokemonDetail } from "@/lib/api";
import { getTypeColor, cn } from "@/lib/utils";

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
            variants={{
                initial: { y: 0 },
                hover: { y: -8 }
            }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            onMouseMove={handleMouseMove}
        >
            <Link
                href={`/pokemon/${pokemon.name}`}
                className="relative block h-full group"
            >
                {/* Card Background & Border */}
                <div
                    ref={cardRef}
                    className={cn(
                        "relative h-full bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden transition-all duration-500",
                        "group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]"
                    )}
                >
                    {/* Dynamic Type Glow */}
                    <div
                        className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                        style={{ backgroundColor: typeColor }}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-32 h-32 blur-[80px] opacity-10 transition-opacity duration-500 group-hover:opacity-30"
                        style={{ backgroundColor: typeColor }}
                    />

                    <div className="p-5 flex flex-col h-full items-center">
                        {/* Header: ID Badge */}
                        <div className="w-full flex justify-between items-start mb-4">
                            <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
                                Gen 01
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/50">
                                #{pokemon.id.toString().padStart(3, "0")}
                            </span>
                        </div>

                        {/* Image Section */}
                        <div className="relative w-full aspect-square mb-6 flex items-center justify-center">
                            {/* Decorative Background Element */}
                            <motion.div
                                variants={{
                                    initial: { scale: 0.8, opacity: 0.3, rotate: 0 },
                                    hover: { scale: 1.1, opacity: 0.6, rotate: 90 }
                                }}
                                className="absolute w-3/4 h-3/4 border-2 border-dashed border-white/5 rounded-full"
                            />

                            {/* Holographic Platform */}
                            <div className="absolute bottom-4 w-1/2 h-2 bg-white/5 rounded-[100%] blur-md transition-all duration-500 group-hover:scale-150 group-hover:opacity-40" />

                            <div className="relative z-10 w-full h-full p-4">
                                {pokemon.sprites.other["official-artwork"].front_default ? (
                                    <motion.div
                                        variants={{
                                            initial: { y: 0, scale: 1, filter: "drop-shadow(0 0 0px transparent)" },
                                            hover: {
                                                y: -20,
                                                scale: 1.15,
                                                filter: `drop-shadow(0 20px 30px ${typeColor}66)`
                                            }
                                        }}
                                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                        className="w-full h-full relative"
                                    >
                                        <Image
                                            src={pokemon.sprites.other["official-artwork"].front_default}
                                            alt={pokemon.name}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                                            priority={pokemon.id <= 10}
                                        />
                                    </motion.div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                        No Image
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Title & Info */}
                        <div className="text-center w-full mt-auto">
                            <h3 className="text-lg font-bold text-white mb-3 capitalize tracking-tight transition-colors duration-300 group-hover:text-white">
                                {pokemon.name}
                            </h3>

                            <div className="flex flex-wrap justify-center gap-1.5">
                                {pokemon.types.map((t) => {
                                    const tColor = getTypeColor(t.type.name);
                                    return (
                                        <span
                                            key={t.type.name}
                                            className="px-2.5 py-1 text-[10px] font-bold rounded-lg border uppercase tracking-wider transition-all duration-300"
                                            style={{
                                                backgroundColor: `${tColor}15`,
                                                borderColor: `${tColor}40`,
                                                color: tColor
                                            }}
                                        >
                                            {t.type.name}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Scanline Effect Overlay (Subtle) */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px]" />

                    {/* Border Shine Effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(400px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.06),transparent_40%)]" />
                </div>
            </Link>
        </motion.div>
    );
}
