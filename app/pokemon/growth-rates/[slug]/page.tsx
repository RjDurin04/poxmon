import { getGrowthRate } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { TrendingUp, Activity } from "lucide-react";

import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function GrowthRateDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const growthRate = await getGrowthRate(slug);
    const englishName = growthRate.descriptions.find((d) => d.language.name === "en")?.description ?? growthRate.name;

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
                                    <TrendingUp className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Growth Rate ID #{growthRate.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {growthRate.name.replace(/-/g, " ")}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                {englishName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Layer: Formula & Details */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                            <h3 className="text-lg font-black text-text-primary mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-accent" />
                                Growth Formula
                            </h3>
                            <div className="p-4 bg-bg-tertiary rounded-2xl border border-border font-mono text-xs text-accent break-all">
                                {growthRate.formula}
                            </div>
                            <p className="text-text-muted text-xs mt-4 leading-relaxed font-medium">
                                This formula determines exactly how much experience is required to reach each level.
                            </p>
                        </div>

                        <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                            <h3 className="text-lg font-black text-text-primary mb-6 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-accent" />
                                Experience Stats
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-text-muted font-bold">Max Experience</span>
                                    <span className="text-sm font-black text-text-primary">
                                        {growthRate.levels[growthRate.levels.length - 1]?.experience.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-text-muted font-bold">Max Level</span>
                                    <span className="text-sm font-black text-text-primary">
                                        {growthRate.levels[growthRate.levels.length - 1]?.level}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Layer: Species List */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-text-primary flex items-center gap-3">
                                    Affected Species
                                    <span className="text-sm font-bold px-2 py-0.5 bg-accent/10 text-accent rounded-lg border border-accent/20">
                                        {growthRate.pokemon_species.length}
                                    </span>
                                </h2>
                                <p className="text-text-muted text-sm mt-1">Species that follow this experience curve</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {growthRate.pokemon_species.map((species) => {
                                const id = species.url.split("/").filter(Boolean).pop();
                                const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

                                return (
                                    <Link
                                        key={species.name}
                                        href={`/pokemon/${species.name}`}
                                        className="group p-4 bg-bg-secondary border border-border rounded-[24px] hover:border-accent/40 transition-all hover:shadow-xl hover:shadow-accent/10 flex flex-col items-center"
                                    >
                                        <div className="w-16 h-16 bg-bg-tertiary rounded-xl flex items-center justify-center mb-3 group-hover:bg-accent/10 transition-colors relative">
                                            <div className="relative w-12 h-12">
                                                <Image
                                                    src={spriteUrl}
                                                    alt={species.name}
                                                    fill
                                                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                                                    sizes="48px"
                                                />
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-text-primary capitalize tracking-tight group-hover:text-accent transition-colors text-center truncate w-full">
                                            {species.name.replace(/-/g, " ")}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div >
                    </div >
                </div >
            </div >
        </div >
    );
}
