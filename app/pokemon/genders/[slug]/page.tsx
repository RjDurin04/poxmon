import { getGender } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Dna } from "lucide-react";

import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function GenderDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const gender = await getGender(slug);

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />

                <div className="relative max-w-7xl mx-auto">
                    <BackButton label="Back to Pokemon" className="mb-8" />

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/5">
                                    <Dna className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Gender ID #{gender.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {gender.name}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Species with {gender.name.toLowerCase()} gender representation and specific breeding requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Species List */}
                    <div className="lg:col-span-12">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-text-primary flex items-center gap-3">
                                    Representative Species
                                    <span className="text-sm font-bold px-2 py-0.5 bg-accent/10 text-accent rounded-lg border border-accent/20">
                                        {gender.pokemon_species_details.length}
                                    </span>
                                </h2>
                                <p className="text-text-muted text-sm mt-1">Pokemon with {gender.name.toLowerCase()} gender traits</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {gender.pokemon_species_details.map((detail) => {
                                const id = detail.pokemon_species.url.split("/").filter(Boolean).pop();
                                const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

                                return (
                                    <Link
                                        key={detail.pokemon_species.name}
                                        href={`/pokemon/${detail.pokemon_species.name}`}
                                        className="group p-4 bg-bg-secondary border border-border rounded-[24px] hover:border-accent/40 transition-all hover:shadow-xl hover:shadow-accent/10 flex flex-col items-center"
                                    >
                                        <div className="w-20 h-20 bg-bg-tertiary rounded-2xl flex items-center justify-center mb-3 group-hover:bg-accent/10 transition-colors overflow-hidden relative">
                                            <div className="relative w-16 h-16">
                                                <Image
                                                    src={spriteUrl}
                                                    alt={detail.pokemon_species.name}
                                                    fill
                                                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                                                    sizes="64px"
                                                />
                                            </div>
                                            <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-bg-primary/80 border border-border rounded text-[8px] font-black text-accent z-10">
                                                {detail.rate}/8
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-text-primary capitalize tracking-tight group-hover:text-accent transition-colors text-center truncate w-full">
                                            {detail.pokemon_species.name.replace(/-/g, " ")}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
