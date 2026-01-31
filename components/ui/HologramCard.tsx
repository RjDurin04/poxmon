"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type PokemonDetail } from "@/lib/api";
import { cn } from "@/lib/utils";

interface HologramCardProps {
    pokemon: PokemonDetail;
    className?: string;
}

export function HologramCard({ pokemon, className }: HologramCardProps) {
    return (
        <motion.div
            className={cn(
                "relative group aspect-[3/4] overflow-hidden bg-void-black border border-void-fog hover:border-void-acid transition-colors duration-300",
                className
            )}
            whileHover={{ scale: 1.02 }}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

            {/* ID Overlay */}
            <div className="absolute top-2 right-2 text-xs font-mono text-void-fog group-hover:text-void-acid">
                #{pokemon.id.toString().padStart(4, "0")}
            </div>

            {/* Image Container */}
            <div className="absolute inset-4 bottom-12 flex items-center justify-center">
                <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500">
                    {pokemon.sprites.other["official-artwork"].front_default && (
                        <Image
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={pokemon.name}
                            fill
                            className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]"
                            unoptimized
                        />
                    )}
                </div>
            </div>

            {/* Name Label */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-void-black/80 backdrop-blur-sm border-t border-void-fog group-hover:border-void-acid transition-colors">
                <h3 className="font-display text-lg uppercase tracking-wider text-void-white group-hover:text-void-acid truncate">
                    {pokemon.name}
                </h3>
                <div className="flex gap-1 mt-1">
                    {pokemon.types.map((t) => (
                        <span key={t.type.name} className="text-[10px] uppercase font-mono px-1 border border-void-fog text-void-fog group-hover:text-white group-hover:border-white">
                            {t.type.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-transparent pointer-events-none group-hover:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%]" />
        </motion.div>
    );
}
