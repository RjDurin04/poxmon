"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { PokemonDetail } from "@/lib/api";

interface PokemonCardProps {
    pokemon: PokemonDetail;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
        >
            <Link
                href={`/pokemon/${pokemon.name}`}
                className="block bg-bg-secondary rounded-xl border border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group"
            >
                <div className="p-4 flex flex-col items-center relative">
                    <div className="relative w-full aspect-square mb-2 z-10">
                        {/* Hologram Glow Effect */}
                        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-125" />

                        {pokemon.sprites.other["official-artwork"].front_default ? (
                            <Image
                                src={pokemon.sprites.other["official-artwork"].front_default}
                                alt={pokemon.name}
                                fill
                                className="object-contain transform transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-4 group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted">
                                No Image
                            </div>
                        )}
                    </div>

                    <div className="text-xs text-text-muted mb-1 relative z-20">
                        #{pokemon.id.toString().padStart(3, "0")}
                    </div>
                    <div className="text-sm font-medium text-text-primary capitalize text-center relative z-20">
                        {pokemon.name}
                    </div>
                    <div className="flex gap-1 mt-2 relative z-20">
                        {pokemon.types.map((t) => (
                            <span
                                key={t.type.name}
                                className="px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent capitalize"
                            >
                                {t.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
