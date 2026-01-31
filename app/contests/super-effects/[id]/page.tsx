import { getSuperContestEffect } from "@/lib/api";
import Link from "next/link";
import { Sparkles, ArrowLeft, Zap, Target } from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SuperContestEffectDetailPage({ params }: PageProps) {
    const { id } = await params;
    const effect = await getSuperContestEffect(parseInt(id));
    const flavor = effect.flavor_text_entries.find(f => f.language.name === "en") || effect.flavor_text_entries[0];

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />

                <div className="relative max-w-7xl mx-auto">
                    <Link
                        href="/moves"
                        className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors mb-8 group"
                    >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">Back to Moves</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/5">
                                    <Sparkles className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Super Effect ID #{effect.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                Super Appeal
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                &quot;{flavor?.flavor_text.replace(/\f/g, " ")}&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-12">
                        <div className="bg-bg-secondary rounded-[32px] p-8 border border-border mb-8">
                            <div className="flex items-center justify-between p-6 bg-bg-tertiary rounded-2xl border border-border">
                                <span className="text-xs font-black text-text-muted uppercase flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-accent" /> Base Appeal
                                </span>
                                <div className="text-2xl font-black text-text-primary">
                                    +{effect.appeal} Points
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-text-primary flex items-center gap-3">
                                    Compatible Moves
                                    <span className="text-sm font-bold px-2 py-0.5 bg-accent/10 text-accent rounded-lg border border-accent/20">
                                        {effect.moves.length}
                                    </span>
                                </h2>
                                <p className="text-text-muted text-sm mt-1">Moves that trigger this specific super appeal effect</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {effect.moves.map((move) => (
                                <Link
                                    key={move.name}
                                    href={`/moves/${move.name}`}
                                    className="group p-4 bg-bg-secondary border border-border rounded-2xl hover:border-accent/40 transition-all hover:shadow-lg flex flex-col items-center gap-2"
                                >
                                    <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                                        <Target className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-black text-text-primary capitalize text-center leading-tight">
                                        {move.name.replace(/-/g, " ")}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
