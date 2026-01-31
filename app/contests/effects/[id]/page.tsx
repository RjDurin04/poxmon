import { getContestEffect } from "@/lib/api";
import Link from "next/link";
import { Sparkles, ArrowLeft, Zap, ShieldAlert } from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ContestEffectDetailPage({ params }: PageProps) {
    const { id } = await params;
    const effect = await getContestEffect(parseInt(id));
    const entry = effect.effect_entries.find(e => e.language.name === "en") || effect.effect_entries[0];
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
                                    <Zap className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Effect ID #{effect.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                Appeal Mechanics
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-5 h-5 text-accent" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Appeal Potency</h2>
                        </div>
                        <div className="flex items-center justify-between p-6 bg-bg-tertiary rounded-2xl border border-border">
                            <span className="text-xs font-black text-text-muted uppercase">Base Appeal</span>
                            <div className="flex gap-1">
                                {[...Array(effect.appeal)].map((_, i) => (
                                    <div key={i} className="w-3 h-6 bg-pink-500 rounded-full" />
                                ))}
                                {[...Array(5 - effect.appeal)].map((_, i) => (
                                    <div key={i} className="w-3 h-6 bg-bg-primary rounded-full border border-border" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldAlert className="w-5 h-5 text-red-400" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Jamming Threshold</h2>
                        </div>
                        <div className="flex items-center justify-between p-6 bg-bg-tertiary rounded-2xl border border-border">
                            <span className="text-xs font-black text-text-muted uppercase">Jam Points</span>
                            <div className="flex gap-1">
                                {[...Array(effect.jam)].map((_, i) => (
                                    <div key={i} className="w-3 h-6 bg-red-500 rounded-full" />
                                ))}
                                {[...Array(5 - effect.jam)].map((_, i) => (
                                    <div key={i} className="w-3 h-6 bg-bg-primary rounded-full border border-border" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-bg-secondary rounded-[32px] p-8 border border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <ShieldAlert className="w-5 h-5 text-accent" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Extended Description</h2>
                        </div>
                        <p className="text-text-primary leading-relaxed text-lg">
                            {entry?.effect}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
