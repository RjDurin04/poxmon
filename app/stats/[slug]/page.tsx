import { getStat } from "@/lib/api";
import Link from "next/link";
import { Zap, ArrowLeft, BarChart3 } from "lucide-react";
import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function StatDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const statData = await getStat(slug);
    const englishName = statData.names.find((n) => n.language.name === "en")?.name ?? statData.name;

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
                                    <BarChart3 className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Stat ID #{statData.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {englishName}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Definition and mechanics for the {englishName.toLowerCase()} attribute in battle.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Stat Metadata */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-bg-secondary rounded-[32px] p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Zap className="w-5 h-5 text-accent" />
                                <h2 className="text-xs font-black uppercase tracking-widest text-text-primary">Stat Mechanics</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-bg-tertiary rounded-2xl border border-border">
                                    <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-1">Battle Only</span>
                                    <span className="text-sm font-bold text-text-primary">{statData.is_battle_only ? "Yes" : "No"}</span>
                                </div>
                                {statData.game_index && (
                                    <div className="p-4 bg-bg-tertiary rounded-2xl border border-border">
                                        <span className="text-sm font-bold text-text-primary">Index #{statData.game_index}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Affected Species */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-text-primary flex items-center gap-3">
                                    Pokemon Species
                                    <span className="text-sm font-bold px-2 py-0.5 bg-accent/10 text-accent rounded-lg border border-accent/20">
                                        Pokemon with this stat
                                    </span>
                                </h2>
                                <p className="text-text-muted text-sm mt-1">Species notable for their {englishName.toLowerCase()} affinity</p>
                            </div>
                        </div>

                        <div className="p-12 bg-bg-secondary rounded-[40px] border border-border border-dashed text-center">
                            <p className="text-text-muted italic">
                                High performing species for this stat are determined by base stats.
                            </p>
                            <Link
                                href="/"
                                className="inline-block mt-6 px-6 py-3 bg-accent text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                            >
                                Browse All Pokemon
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
