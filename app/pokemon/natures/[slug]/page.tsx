import { getNatureDetail } from "@/lib/api";
import Link from "next/link";
import { Brain, ArrowLeft, TrendingUp, TrendingDown, Soup } from "lucide-react";
import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function NatureDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const nature = await getNatureDetail(slug);
    const englishName = nature.names.find((n) => n.language.name === "en")?.name ?? nature.name;

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
                                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/5">
                                    <Brain className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Nature ID #{nature.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {englishName} Nature
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Biological temperament defining stat growth bias and dietary preferences for species performance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Stat Bonus</h2>
                        </div>
                        <div className="p-6 bg-bg-tertiary rounded-2xl border border-border">
                            {nature.increased_stat ? (
                                <Link href={`/stats/${nature.increased_stat.name}`} className="text-2xl font-black text-green-400 capitalize hover:underline italic">
                                    {nature.increased_stat.name.replace(/-/g, " ")} (+10%)
                                </Link>
                            ) : (
                                <span className="text-2xl font-black text-text-muted italic">No Bias (Neutral)</span>
                            )}
                        </div>
                    </div>

                    <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingDown className="w-5 h-5 text-red-400" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Stat Penalty</h2>
                        </div>
                        <div className="p-6 bg-bg-tertiary rounded-2xl border border-border">
                            {nature.decreased_stat ? (
                                <Link href={`/stats/${nature.decreased_stat.name}`} className="text-2xl font-black text-red-400 capitalize hover:underline italic">
                                    {nature.decreased_stat.name.replace(/-/g, " ")} (-10%)
                                </Link>
                            ) : (
                                <span className="text-2xl font-black text-text-muted italic">No Bias (Neutral)</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-bg-secondary rounded-[32px] p-8 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Soup className="w-5 h-5 text-accent" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Dietary Preferences</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-bg-tertiary rounded-xl border border-border flex justify-between items-center">
                                <span className="text-xs font-bold text-text-muted uppercase">Likes Flavor</span>
                                {nature.likes_flavor ? (
                                    <Link href={`/berries/flavors/${nature.likes_flavor.name}`} className="text-sm font-black text-accent capitalize">{nature.likes_flavor.name}</Link>
                                ) : (
                                    <span className="text-sm font-black text-text-muted">None</span>
                                )}
                            </div>
                            <div className="p-4 bg-bg-tertiary rounded-xl border border-border flex justify-between items-center">
                                <span className="text-xs font-bold text-text-muted uppercase">Hates Flavor</span>
                                {nature.hates_flavor ? (
                                    <Link href={`/berries/flavors/${nature.hates_flavor.name}`} className="text-sm font-black text-red-400 capitalize">{nature.hates_flavor.name}</Link>
                                ) : (
                                    <span className="text-sm font-black text-text-muted">None</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-5 h-5 text-accent" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Pokeathlon Bias</h2>
                        </div>
                        <div className="space-y-2">
                            {nature.pokeathlon_stat_changes.map(sc => (
                                <div key={sc.pokeathlon_stat.name} className="flex justify-between items-center p-3 bg-bg-tertiary rounded-xl border border-border">
                                    <span className="text-xs font-bold text-text-secondary capitalize">{sc.pokeathlon_stat.name}</span>
                                    <span className={`text-sm font-black ${sc.max_change > 0 ? "text-green-400" : "text-red-400"}`}>
                                        {sc.max_change > 0 ? "+" : ""}{sc.max_change}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
