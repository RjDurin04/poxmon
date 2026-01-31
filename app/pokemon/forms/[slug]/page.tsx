import { getPokemonForm } from "@/lib/api";
import Link from "next/link";
import { Layers, ArrowLeft, Zap, Info } from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PokemonFormDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const form = await getPokemonForm(slug);

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />

                <div className="relative max-w-7xl mx-auto">
                    <Link
                        href={`/pokemon/${form.pokemon.name}`}
                        className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors mb-8 group"
                    >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">Back to {form.pokemon.name.replace(/-/g, " ")}</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-lg shadow-accent/5">
                                    <Layers className="w-6 h-6 text-accent" />
                                </div>
                                <div className="flex gap-2">
                                    {form.is_mega && <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[8px] font-black uppercase tracking-widest">Mega Evolution</span>}
                                    {form.is_battle_only && <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[8px] font-black uppercase tracking-widest">Battle Only</span>}
                                    <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-widest">Form ID #{form.id}</span>
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {form.name.replace(/-/g, " ")}
                            </h1>
                        </div>

                        {form.sprites.front_default && (
                            <div className="w-48 h-48 bg-bg-secondary rounded-[40px] border border-border flex items-center justify-center p-4 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <img src={form.sprites.front_default} alt={form.name} className="w-32 h-32 object-contain relative z-10 group-hover:scale-110 transition-transform" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                            <div className="flex items-center gap-3 mb-6">
                                <Zap className="w-5 h-5 text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Elemental Affinity</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {form.types.map(t => (
                                    <Link
                                        key={t.type.name}
                                        href={`/types/${t.type.name}`}
                                        className="px-6 py-2 rounded-xl bg-bg-tertiary border border-border text-xs font-black text-text-primary capitalize hover:border-accent transition-colors"
                                    >
                                        {t.type.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                            <div className="flex items-center gap-3 mb-6">
                                <Info className="w-5 h-5 text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Technical Context</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                    <span className="text-[10px] font-black text-text-muted uppercase">Version Group</span>
                                    <Link href={`/games/version-groups/${form.version_group.name}`} className="text-xs font-black text-text-primary capitalize hover:text-accent">{form.version_group.name.replace(/-/g, " ")}</Link>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-border/50">
                                    <span className="text-[10px] font-black text-text-muted uppercase">Order Index</span>
                                    <span className="text-xs font-black text-text-primary">{form.order} / {form.form_order}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-bg-secondary rounded-[40px] p-12 border border-border border-dashed text-center">
                            <h3 className="text-2xl font-black text-text-primary mb-4 uppercase tracking-tighter">Phenotype Documentation</h3>
                            <p className="text-text-muted italic max-w-xl mx-auto text-lg leading-relaxed">
                                This specialized form represents a unique morphological state of the {form.pokemon.name.replace(/-/g, " ")} biological sequence, often triggered by environmental stress, specific hold items, or battle-transition energy bursts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
