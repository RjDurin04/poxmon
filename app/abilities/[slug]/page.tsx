import { getAbilityDetail } from "@/lib/api";
import Link from "next/link";
import {
    Zap,
    Info,
    ArrowLeft,
    Sparkles,
    Atom,
    Dna,
    History
} from "lucide-react";
import { GenericPokemonCarousel } from "@/components/GenericPokemonCarousel";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function AbilityDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const ability = await getAbilityDetail(slug);

    const effectEntry = ability.effect_entries.find((e) => e.language.name === "en");
    const shortEffect = effectEntry?.short_effect || "No short effect data available.";
    const fullEffect = effectEntry?.effect || "No full effect data available.";
    const latestFlavor = ability.flavor_text_entries.find(f => f.language.name === "en")?.flavor_text || shortEffect;
    const history = ability.flavor_text_entries.filter(f => f.language.name === "en").slice(-5);
    const effectChanges = ability.effect_changes || [];

    return (
        <div className="min-h-screen bg-bg-primary pb-20">
            {/* Immersive Header */}
            <div className="relative overflow-hidden pt-20 pb-16 px-4 md:px-8 border-b border-border">
                {/* Background Aura */}
                <div className={`absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent`} />
                <div className={`absolute -bottom-24 -right-24 w-96 h-96 blur-[120px] rounded-full opacity-5 bg-accent`} />

                <div className="max-w-7xl mx-auto relative px-4 md:px-0">
                    <Link
                        href="/abilities"
                        className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Abilities</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-border shadow-sm bg-bg-secondary text-accent">
                                    Ability Data
                                </span>
                                {ability.is_main_series && (
                                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20 bg-accent/5 text-accent-hover">
                                        Main Series
                                    </span>
                                )}
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-text-primary capitalize tracking-tighter mb-4">
                                {ability.name.replace(/-/g, " ")}
                            </h1>
                            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed italic opacity-80">
                                &quot;{latestFlavor.replace(/\n|§/g, " ")}&quot;
                            </p>
                        </div>

                        <div className="flex items-center gap-6 bg-bg-secondary/50 backdrop-blur-md p-6 rounded-2xl border border-border shadow-xl">
                            <div className="text-center px-4">
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Index</div>
                                <div className="text-2xl font-black text-text-primary font-mono">#{ability.id.toString().padStart(3, "0")}</div>
                            </div>
                            <div className="w-px h-10 bg-border" />
                            <div className="text-center px-4">
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Origin</div>
                                <div className="text-2xl font-black text-text-primary uppercase font-mono">{ability.generation.name.split("-")[1]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Mechanism Insights */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border bg-gradient-to-br from-bg-secondary to-bg-tertiary/30 shadow-sm relative overflow-hidden">
                            <Dna className="absolute -top-4 -right-4 w-24 h-24 text-accent/5 rotate-12" />
                            <div className="flex items-center gap-3 mb-8">
                                <Atom className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Effect</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2 px-1">Short Effect</h3>
                                    <div className="p-4 bg-bg-tertiary/50 border border-border rounded-xl text-sm text-text-primary font-medium leading-relaxed">
                                        {shortEffect}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 bg-bg-tertiary/30 border border-border rounded-xl">
                                        <div className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">Generation</div>
                                        <div className="text-xs font-black text-text-primary uppercase">{ability.generation.name.replace("generation-", "Gen ")}</div>
                                    </div>
                                    <div className="p-4 bg-bg-tertiary/30 border border-border rounded-xl">
                                        <div className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">Effect Chance</div>
                                        <div className="text-xs font-black text-text-primary">100% Fixed</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats/Info */}
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Info className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Ability Metadata</h2>
                            </div>
                            <div className="space-y-4">
                                <MetaItem label="Main Series" value={ability.is_main_series ? "Yes" : "No"} />
                                <MetaItem label="Species Count" value={`${ability.pokemon.length} Total`} />
                                <MetaItem label="Data Source" value="PokeAPI v2" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Clinical Description */}
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm relative overflow-hidden group">
                            <Sparkles className="absolute top-8 right-8 w-24 h-24 text-accent/5 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                            <div className="flex items-center gap-3 mb-6">
                                <Zap className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Full Effect</h2>
                            </div>
                            <div className="space-y-4">
                                <p className="text-text-primary text-xl font-medium leading-relaxed">
                                    {fullEffect}
                                </p>
                            </div>
                        </div>

                        {/* Version History */}
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <History className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Flavor Text History</h2>
                            </div>
                            <div className="space-y-4">
                                {history.map((entry, idx) => (
                                    <div key={idx} className="p-4 rounded-xl hover:bg-bg-tertiary/30 transition-colors border border-transparent hover:border-border group/v">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[9px] font-black text-accent uppercase tracking-widest px-2 py-0.5 rounded bg-accent/5 border border-accent/10">
                                                {entry.version_group.name.replace(/-/g, " ")}
                                            </span>
                                            <div className="h-px flex-1 bg-border/30" />
                                        </div>
                                        <p className="text-sm text-text-secondary leading-relaxed italic group-hover/v:text-text-primary transition-colors">
                                            &quot;{entry.flavor_text.replace(/\n|§/g, " ")}&quot;
                                        </p>
                                    </div>
                                ))}
                                {history.length === 0 && (
                                    <div className="text-sm text-text-muted italic px-2">No historical flavor text available.</div>
                                )}
                            </div>
                        </div>

                        {/* Effect Changes */}
                        {effectChanges.length > 0 && (
                            <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <History className="w-5 h-5 text-amber-500" />
                                    <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Effect Changes</h2>
                                </div>
                                <div className="space-y-6">
                                    {effectChanges.map((change, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-bg-tertiary border border-border/50 border-l-4 border-l-amber-500">
                                            <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                Modified in {change.version_group.name.replace(/-/g, " ")}
                                            </div>
                                            <p className="text-sm text-text-secondary leading-relaxed font-medium">
                                                {change.effect_entries.find(e => e.language.name === "en")?.effect || "Unknown modification recorded."}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Practitioners */}
                        <GenericPokemonCarousel
                            title="Pokemon With This Ability"
                            description="All Pokemon that can have this ability"
                            items={ability.pokemon.map(p => ({ name: p.pokemon.name, url: p.pokemon.url }))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetaItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-between py-1 border-b border-border/30 last:border-0 pb-3 last:pb-0">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-tight">{label}</span>
            <span className="text-xs font-black text-text-primary capitalize">{value}</span>
        </div>
    );
}
