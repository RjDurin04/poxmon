"use client";

import { useState } from "react";
import { GlitchText } from "@/components/ui/GlitchText";
import { VoidGrid } from "@/components/ui/VoidGrid";
import { HologramCard } from "@/components/ui/HologramCard";
import type { PokemonDetail } from "@/lib/api";

interface VoidInterfaceProps {
    initialPokemon: PokemonDetail[];
}

export function VoidInterface({ initialPokemon }: VoidInterfaceProps) {
    const [query, setQuery] = useState("");
    const [pokemonList] = useState(initialPokemon);

    // Filter logic (simple client-side for the initial batch for now)
    const filtered = pokemonList.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Panel: Data Stream / Grid */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen overflow-y-auto p-4 md:p-8 border-r border-void-fog/30 scrollbar-hide">
                <p className="font-mono text-xs text-void-fog uppercase tracking-widest">
                    {'///'} A Brutalist Archive of Pocket Monsters
                </p>

                <VoidGrid
                    items={filtered}
                    renderItem={(p) => <HologramCard pokemon={p} />}
                />

                {filtered.length === 0 && (
                    <div className="mt-20 text-center font-mono text-void-fog">
                        [NO_DATA_FOUND_IN_SECTOR]
                    </div>
                )}
            </div>

            {/* Right Panel: Interactive Search */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen bg-void-black flex flex-col justify-center items-center p-8 relative overflow-hidden">

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-void-acid rounded-full blur-[100px] animate-pulse" />
                </div>

                <div className="relative z-10 w-full max-w-md">
                    <GlitchText text="INIT_SEARCH_PROTOCOL" as="h2" className="text-sm font-mono text-void-acid mb-4 block" />

                    <div className="relative group">
                        <input
                            id="void-search"
                            name="void-search"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="ENTER_DESIGNATION..."
                            className="w-full bg-transparent border-b-2 border-void-fog text-4xl font-display text-void-white placeholder:text-void-fog/50 focus:outline-none focus:border-void-acid focus:placeholder:text-transparent transition-all py-4 uppercase"
                            autoFocus
                        />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-void-acid group-focus-within:w-full transition-all duration-500 ease-out" />
                    </div>

                    <div className="mt-8 flex justify-between font-mono text-xs text-void-fog">
                        <span>STATUS: ONLINE</span>
                        <span>NODES: {pokemonList.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
