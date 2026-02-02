import { getPokedex } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import {
    BookOpen,
    ArrowLeft,
    Hash
} from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PokedexDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const pokedex = await getPokedex(slug);

    const englishName = pokedex.names.find(n => n.language.name === "en")?.name || pokedex.name;
    const description = pokedex.descriptions.find(d => d.language.name === "en")?.description || "A regional biological database indexing indigenous species.";

    return (
        <div className="min-h-screen bg-bg-primary pb-20">
            {/* Immersive Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />

                <div className="max-w-7xl mx-auto relative px-4 md:px-0">
                    <Link
                        href="/regions"
                        className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-12"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-black uppercase tracking-widest text-[10px]">Back to Regional Atlas</span>
                    </Link>

                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-12 text-center md:text-left">
                        <div className="relative">
                            {/* Decorative Background Label */}
                            <span className="text-[5rem] sm:text-[8rem] lg:text-[14rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1] uppercase">
                                POKEDEX
                            </span>

                            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-accent text-white shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-border bg-bg-secondary text-text-primary">
                                    {pokedex.is_main_series ? "Main Series Database" : "Auxiliary Catalog"}
                                </span>
                            </div>
                            <h1 className="text-6xl md:text-9xl font-black text-text-primary capitalize tracking-tighter mb-6 relative">
                                {englishName}
                                <span className="absolute -top-6 -right-12 text-sm font-mono text-accent opacity-40 rotate-12">DEX-{pokedex.id.toString().padStart(3, '0')}</span>
                            </h1>
                            <p className="text-xl text-text-secondary max-w-2xl leading-relaxed italic opacity-80">
                                &quot;{description.replace(/\n|§/g, " ")}&quot;
                            </p>
                        </div>

                        <div className="bg-bg-secondary/40 backdrop-blur-xl p-8 rounded-[32px] border border-border shadow-2xl relative overflow-hidden group">
                            <div className="text-center">
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2">Stored Entries</div>
                                <div className="text-4xl font-black text-text-primary font-mono tracking-tighter">{pokedex.pokemon_entries.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Entry Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pokedex.pokemon_entries.map((entry) => (
                        <Link
                            key={entry.entry_number}
                            href={`/pokemon/${entry.pokemon_species.name}`}
                            className="group p-6 bg-bg-secondary border border-border rounded-[28px] hover:border-accent/40 hover:bg-bg-tertiary transition-all relative overflow-hidden h-full flex flex-col"
                        >
                            <div className="absolute top-0 right-0 p-4 font-mono text-4xl font-black text-accent/5 group-hover:scale-110 transition-transform">
                                #{entry.entry_number.toString().padStart(3, '0')}
                            </div>

                            <div className="relative flex-1">
                                <div className="w-20 h-20 rounded-2xl bg-bg-tertiary border border-border flex items-center justify-center p-2 mb-6 group-hover:bg-accent/10 transition-colors relative overflow-hidden">
                                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Image
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${entry.pokemon_species.url.split("/").filter(Boolean).pop()}.png`}
                                        alt={entry.pokemon_species.name}
                                        fill
                                        className="object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                                        sizes="64px"
                                    />
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Hash className="w-3 h-3 text-accent" />
                                    <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Registry Index</span>
                                </div>
                                <h3 className="text-2xl font-black text-text-primary capitalize tracking-tighter group-hover:text-accent transition-colors">
                                    {entry.pokemon_species.name.replace(/-/g, " ")}
                                </h3>
                            </div>

                            <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
                                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Entry Verified</span>
                                <div className="w-2 h-2 rounded-full bg-accent opacity-30" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
