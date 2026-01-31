"use client";

import { motion } from "framer-motion";
import { type PokemonDetail, type PokemonSpecies, type EvolutionChain, type NamedAPIResource } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { EvolutionChainDisplay } from "./EvolutionChainDisplay";
import {
    MapPin,
    TrendingUp,
    Palette,
    Shapes,
    TreeDeciduous,
    Egg,
    Volume2,
    VolumeX
} from "lucide-react";
import { useState, useRef } from "react";

interface TaxonomyDetailProps {
    pokemon: PokemonDetail;
    species: PokemonSpecies;
    evolution: EvolutionChain;
    encounters?: { location_area: NamedAPIResource }[];
}

function AudioPlayer({ cries }: { cries: { latest?: string | null; legacy?: string | null; } }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const playSound = () => {
        const src = cries.latest || cries.legacy;
        if (!src || !audioRef.current) return;
        audioRef.current.src = src;
        audioRef.current.play();
        setIsPlaying(true);
    };

    if (!cries.latest && !cries.legacy) return null;

    return (
        <div className="flex items-center gap-2">
            <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
            <button onClick={playSound} className="text-void-acid hover:text-void-white transition-colors">
                {isPlaying ? <Volume2 size={12} className="animate-pulse" /> : <VolumeX size={12} />}
            </button>
        </div>
    );
}

export function TaxonomyDetail({ pokemon, species, evolution, encounters }: TaxonomyDetailProps) {
    const flavorText = species.flavor_text_entries.find(e => e.language.name === "en")?.flavor_text || "NO DATA AVAILABLE";
    const genus = species.genera.find(g => g.language.name === "en")?.genus || "UNKNOWN_CLASSIFICATION";

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col relative overflow-hidden">
            <Link href="/" className="text-xs font-mono text-void-acid hover:underline mb-8 block">
                &lt; RETURN_TO_VOID
            </Link>

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-void-fog/30 pb-4">
                <div>
                    <div className="flex items-center gap-2 mb-2 font-mono text-[10px]">
                        {species.is_legendary && <span className="text-void-acid">[LEGENDARY]</span>}
                        {species.is_mythical && <span className="text-purple-400">[MYTHICAL]</span>}
                        {species.is_baby && <span className="text-pink-400">[BABY]</span>}
                        <AudioPlayer cries={pokemon.cries} />
                    </div>
                    <h1 className="text-4xl md:text-8xl font-display font-bold text-void-white uppercase tracking-tighter">
                        {pokemon.name}
                    </h1>
                    <div className="text-void-acid text-xs font-mono uppercase mt-1 opacity-70 tracking-widest">
                        {genus}
                    </div>
                    <div className="flex gap-2 mt-4">
                        {pokemon.types.map(t => (
                            <Link key={t.type.name} href={`/types/${t.type.name}`} className="px-2 py-1 border border-void-acid text-void-acid text-xs font-mono uppercase hover:bg-void-acid hover:text-void-black transition-colors">
                                {t.type.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="text-right mt-4 md:mt-0 font-mono text-void-fog">
                    <div className="text-xl">#{pokemon.id.toString().padStart(4, "0")}</div>
                    <div className="text-xs uppercase opacity-50 mb-2">SPECIMEN_ID</div>
                    {species.generation && (
                        <div className="text-[10px] text-void-acid border border-void-acid/30 px-2 py-0.5 inline-block uppercase">
                            ORIGIN_{species.generation.name.replace(/-/g, "_")}
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                {/* Left: Stats & Info */}
                <div className="lg:col-span-3 space-y-8 font-mono text-sm text-void-white/80">
                    <div>
                        <h3 className="text-void-acid mb-2 text-xs uppercase">{'///'} PHYSICAL_DATA</h3>
                        <div className="flex justify-between border-b border-void-fog py-2">
                            <span>HEIGHT</span>
                            <span>{pokemon.height / 10} M</span>
                        </div>
                        <div className="flex justify-between border-b border-void-fog py-2">
                            <span>WEIGHT</span>
                            <span>{pokemon.weight / 10} KG</span>
                        </div>
                        <div className="flex justify-between border-b border-void-fog py-2">
                            <span>BASE_EXP</span>
                            <span>{pokemon.base_experience || "NULL"}</span>
                        </div>
                        {species.growth_rate && (
                            <div className="flex justify-between border-b border-void-fog py-2 group">
                                <span className="flex items-center gap-1"><TrendingUp size={10} /> GROWTH</span>
                                <Link href={`/pokemon/growth-rates/${species.growth_rate.name}`} className="text-void-acid truncate ml-4 group-hover:underline">
                                    {species.growth_rate.name.toUpperCase()}
                                </Link>
                            </div>
                        )}
                        {species.color && (
                            <div className="flex justify-between border-b border-void-fog py-2">
                                <span className="flex items-center gap-1"><Palette size={10} /> COLOR</span>
                                <span>{species.color.name.toUpperCase()}</span>
                            </div>
                        )}
                        {species.shape && (
                            <div className="flex justify-between border-b border-void-fog py-2">
                                <span className="flex items-center gap-1"><Shapes size={10} /> SHAPE</span>
                                <span>{species.shape.name.toUpperCase()}</span>
                            </div>
                        )}
                        {species.habitat && (
                            <div className="flex justify-between border-b border-void-fog py-2 group">
                                <span className="flex items-center gap-1"><TreeDeciduous size={10} /> HABITAT</span>
                                <Link href={`/pokemon/habitats/${species.habitat.name}`} className="text-void-acid group-hover:underline">
                                    {species.habitat.name.toUpperCase()}
                                </Link>
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-void-acid mb-2 text-xs uppercase">{'///'} COMBAT_STATS</h3>
                        <div className="space-y-2">
                            {pokemon.stats.map(s => (
                                <div key={s.stat.name} className="group">
                                    <div className="flex justify-between text-xs mb-1 uppercase">
                                        <span>{s.stat.name}</span>
                                        <span>{s.base_stat}</span>
                                    </div>
                                    <div className="h-1 bg-void-fog relative overflow-hidden">
                                        <motion.div
                                            className="absolute top-0 left-0 h-full bg-void-white group-hover:bg-void-acid transition-colors"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(s.base_stat / 255) * 100}%` }}
                                            transition={{ duration: 1, ease: "circOut" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-void-acid mb-2 text-xs uppercase">{'///'} ABILITIES</h3>
                        <div className="space-y-1">
                            {pokemon.abilities.map(a => (
                                <Link
                                    key={a.ability.name}
                                    href={`/abilities/${a.ability.name}`}
                                    className="block p-2 border border-void-fog/30 hover:border-void-acid text-xs uppercase flex justify-between"
                                >
                                    <span>{a.ability.name.replace(/-/g, "_")}</span>
                                    {a.is_hidden && <span className="text-void-acid">HIDDEN</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center: Visual */}
                <div className="lg:col-span-6 flex items-center justify-center relative min-h-[400px]">
                    <div className="absolute inset-0 border border-void-fog/20 rounded-full animate-spin-slow opacity-20 border-dashed" />
                    <div className="absolute inset-10 border border-void-acid/10 rounded-full animate-reverse-spin opacity-20" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {pokemon.sprites.other["official-artwork"].front_default && (
                            <Image
                                src={pokemon.sprites.other["official-artwork"].front_default}
                                alt={pokemon.name}
                                width={500}
                                height={500}
                                priority
                                className="object-contain drop-shadow-[0_0_50px_rgba(204,255,0,0.3)]"
                            />
                        )}
                    </motion.div>
                </div>

                {/* Right: Flavor, Evolution, Species Info */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <div className="bg-void-fog/10 p-4 border-l-2 border-void-acid">
                        <h3 className="text-void-acid mb-2 text-xs uppercase">{'///'} FIELD_NOTES</h3>
                        <p className="font-mono text-xs leading-relaxed uppercase">
                            {flavorText.replace(/\f/g, " ")}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-void-acid mb-2 text-xs uppercase">{'///'} BREEDING</h3>
                        <div className="font-mono text-xs space-y-1">
                            <div className="flex justify-between border-b border-void-fog/30 py-1 group">
                                <span className="text-void-fog flex items-center gap-1"><Egg size={10} /> EGG_GROUPS</span>
                                <span className="text-right">{species.egg_groups.map(g => g.name.toUpperCase()).join(", ")}</span>
                            </div>
                            <div className="flex justify-between border-b border-void-fog/30 py-1">
                                <span className="text-void-fog">HATCH_CYCLE</span>
                                <span>{species.hatch_counter || "NULL"}</span>
                            </div>
                            <div className="flex justify-between border-b border-void-fog/30 py-1">
                                <span className="text-void-fog">CATCH_RATE</span>
                                <span>{species.capture_rate}</span>
                            </div>
                            <div className="flex justify-between border-b border-void-fog/30 py-1">
                                <span className="text-void-fog">HAPPINESS</span>
                                <span>{species.base_happiness}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-void-acid mb-4 text-xs uppercase">{'///'} EVOLUTION_NODE</h3>
                        <div className="invert grayscale opacity-80 brightness-75 bg-void-black p-4 border border-void-fog/30">
                            <EvolutionChainDisplay chain={evolution} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Forms section */}
            {species.varieties && species.varieties.length > 1 && (
                <div className="mt-12 border-t border-void-fog/30 pt-8">
                    <h2 className="text-void-acid font-mono text-xs mb-4 uppercase">{'///'} GENETIC_VARIATIONS ({species.varieties.length})</h2>
                    <div className="flex flex-wrap gap-2">
                        {species.varieties.map(v => (
                            <Link key={v.pokemon.name} href={`/pokemon/${v.pokemon.name}`} className={`px-3 py-1 border text-[10px] font-mono uppercase transition-colors ${v.is_default ? 'bg-void-acid text-void-black border-void-acid' : 'border-void-fog hover:border-void-acid text-void-white/70'}`}>
                                {v.pokemon.name.replace(/-/g, "_")}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Encounter Section */}
            {encounters && encounters.length > 0 && (
                <div className="mt-12 border-t border-void-fog/30 pt-8">
                    <h2 className="text-void-acid font-mono text-xs mb-4 uppercase flex items-center gap-2"><MapPin size={10} /> {'///'} DETECTED_IN_LOCATIONS ({encounters.length})</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        {encounters.map(enc => (
                            <div key={enc.location_area.name} className="p-2 border border-void-fog/30 text-[9px] font-mono uppercase bg-void-black">
                                {enc.location_area.name.replace(/-/g, " ")}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Moves Section */}
            <div className="mt-12 border-t border-void-fog/30 pt-8 mb-20">
                <h2 className="text-void-acid font-mono text-xs mb-4 uppercase">{'///'} MOVE_SET ({pokemon.moves.length} TECHNIQUES)</h2>
                <div className="max-h-[300px] overflow-y-auto scrollbar-hide grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1">
                    {pokemon.moves.slice(0, 100).map(m => (
                        <Link
                            key={m.move.name}
                            href={`/moves/${m.move.name}`}
                            className="p-2 border border-void-fog/20 hover:border-void-acid text-xs font-mono uppercase transition-colors"
                        >
                            {m.move.name.replace(/-/g, "_")}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
