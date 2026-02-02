import { getPokeathlonStat } from "@/lib/api";
import Link from "next/link";
import { Zap, TrendingUp, TrendingDown } from "lucide-react";

import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PokeathlonStatDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const stat = await getPokeathlonStat(slug);
    const englishName = stat.names.find((n) => n.language.name === "en")?.name ?? stat.name;

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />

                <div className="relative max-w-7xl mx-auto">
                    <BackButton label="Back to Library" className="mb-8" />

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-lg shadow-accent/5">
                                    <Zap className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Pokeathlon ID #{stat.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {englishName}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Athletic performance metric used during Johto-era physical competitions and performance evaluations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Positive Biases</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {stat.affecting_natures.increase.map(node => (
                                <Link
                                    key={node.nature.name}
                                    href={`/pokemon/natures/${node.nature.name}`}
                                    className="px-4 py-2 rounded-xl bg-bg-tertiary border border-border flex justify-between items-center gap-4 hover:border-accent group transition-all"
                                >
                                    <span className="text-xs font-black text-text-primary capitalize group-hover:text-accent transition-colors">{node.nature.name}</span>
                                    <span className="text-[10px] font-black text-green-400">+{node.max_change}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingDown className="w-5 h-5 text-red-400" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Negative Biases</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {stat.affecting_natures.decrease.map(node => (
                                <Link
                                    key={node.nature.name}
                                    href={`/pokemon/natures/${node.nature.name}`}
                                    className="px-4 py-2 rounded-xl bg-bg-tertiary border border-border flex justify-between items-center gap-4 hover:border-accent group transition-all"
                                >
                                    <span className="text-xs font-black text-text-primary capitalize group-hover:text-accent transition-colors">{node.nature.name}</span>
                                    <span className="text-[10px] font-black text-red-400">{node.max_change}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
