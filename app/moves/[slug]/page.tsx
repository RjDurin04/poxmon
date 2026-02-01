import { getMoveDetail } from "@/lib/api";
import Link from "next/link";
import {
    Zap,
    Swords,
    Target,
    Activity,
    Gamepad2,
    Info,
    ArrowLeft,
    Crosshair,
    Droplets,
    Sparkles,
    ShieldAlert,
    Dices,
    Skull,
    TrendingUp,
    Disc,
    History,
} from "lucide-react";
import { GenericPokemonCarousel } from "@/components/GenericPokemonCarousel";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const TYPE_THEMES: Record<string, { color: string, border: string, bg: string }> = {
    normal: { color: "text-gray-400", border: "border-gray-500/20", bg: "bg-gray-500/10" },
    fire: { color: "text-red-500", border: "border-red-500/20", bg: "bg-red-500/10" },
    water: { color: "text-blue-500", border: "border-blue-500/20", bg: "bg-blue-500/10" },
    electric: { color: "text-yellow-400", border: "border-yellow-400/20", bg: "bg-yellow-400/10" },
    grass: { color: "text-green-500", border: "border-green-500/20", bg: "bg-green-500/10" },
    ice: { color: "text-cyan-400", border: "border-cyan-400/20", bg: "bg-cyan-400/10" },
    fighting: { color: "text-orange-600", border: "border-orange-600/20", bg: "bg-orange-600/10" },
    poison: { color: "text-purple-500", border: "border-purple-500/20", bg: "bg-purple-500/10" },
    ground: { color: "text-amber-600", border: "border-amber-600/20", bg: "bg-amber-600/10" },
    flying: { color: "text-indigo-400", border: "border-indigo-400/20", bg: "bg-indigo-400/10" },
    psychic: { color: "text-pink-500", border: "border-pink-500/20", bg: "bg-pink-500/10" },
    bug: { color: "text-lime-500", border: "border-lime-500/20", bg: "bg-lime-500/10" },
    rock: { color: "text-stone-500", border: "border-stone-500/20", bg: "bg-stone-500/10" },
    ghost: { color: "text-purple-400", border: "border-purple-400/20", bg: "bg-purple-400/10" },
    dragon: { color: "text-violet-500", border: "border-violet-500/20", bg: "bg-violet-500/10" },
    dark: { color: "text-stone-400", border: "border-stone-400/20", bg: "bg-stone-400/10" },
    steel: { color: "text-slate-400", border: "border-slate-400/20", bg: "bg-slate-400/10" },
    fairy: { color: "text-pink-400", border: "border-pink-400/20", bg: "bg-pink-400/10" },
};

export default async function MoveDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const move = await getMoveDetail(slug);

    const theme = TYPE_THEMES[move.type.name] || { color: "text-accent", border: "border-accent/20", bg: "bg-accent/10" };
    const shortEffect = move.effect_entries.find(e => e.language.name === "en")?.short_effect || "No effect data available.";
    const latestFlavor = move.flavor_text_entries.find(f => f.language.name === "en")?.flavor_text || shortEffect;
    const history = move.flavor_text_entries.filter(f => f.language.name === "en").slice(-5);

    // Technical data
    const hasHits = move.meta.min_hits !== null;
    const hasAilment = move.meta.ailment.name !== "none";
    const hasStatChanges = move.stat_changes && move.stat_changes.length > 0;
    const machines = move.machines || [];

    return (
        <div className="min-h-screen bg-bg-primary pb-20">
            {/* Immersive Header */}
            <div className="relative overflow-hidden pt-20 pb-16 px-4 md:px-8 border-b border-border">
                {/* Background Aura */}
                <div className={`absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-20 ${theme.bg}`} />
                <div className={`absolute -bottom-24 -right-24 w-96 h-96 blur-[120px] rounded-full opacity-10 ${theme.bg}`} />

                <div className="max-w-7xl mx-auto relative">
                    <Link
                        href="/moves"
                        className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Moves</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-border shadow-sm bg-bg-secondary ${theme.color}`}>
                                    {move.type.name}
                                </span>
                                <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-border bg-bg-secondary text-text-secondary">
                                    {move.damage_class.name}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tight mb-4">
                                {move.name.replace(/-/g, " ")}
                            </h1>
                            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed italic">
                                &quot;{latestFlavor.replace(/\n/g, " ")}&quot;
                            </p>
                        </div>

                        <div className="flex items-center gap-6 bg-bg-secondary/50 backdrop-blur-md p-6 rounded-2xl border border-border shadow-xl">
                            <div className="text-center px-4">
                                <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">ID</div>
                                <div className="text-2xl font-black text-text-primary">#{move.id.toString().padStart(3, "0")}</div>
                            </div>
                            <div className="w-px h-10 bg-border" />
                            <div className="text-center px-4">
                                <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">GEN</div>
                                <div className="text-2xl font-black text-text-primary uppercase">{move.generation.name.split("-")[1]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Battle Performance Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Activity className="w-5 h-5 text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Stats</h2>
                            </div>

                            <div className="space-y-8">
                                <StatItem icon={<Swords className="w-4 h-4" />} label="Power" value={move.power ?? "--"} color="text-red-400" />
                                <StatItem icon={<Crosshair className="w-4 h-4" />} label="Accuracy" value={move.accuracy ? `${move.accuracy}%` : "--"} color="text-blue-400" />
                                <StatItem icon={<Zap className="w-4 h-4" />} label="PP" value={move.pp} color="text-yellow-400" />
                                <StatItem icon={<Target className="w-4 h-4" />} label="Priority" value={move.priority} color="text-emerald-400" />
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Info className="w-5 h-5 text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Move Info</h2>
                            </div>
                            <div className="space-y-4">
                                <MetaItem label="Target" value={move.target.name.replace(/-/g, " ")} />
                                <MetaItem label="Ailment" value={move.meta.ailment.name !== "none" ? move.meta.ailment.name : "None"} />
                                <MetaItem label="Category" value={move.meta.category.name.replace(/-/g, " ")} />
                                <MetaItem label="Contest Type" value={move.contest_type?.name || "None"} />
                                <MetaItem label="Generation" value={move.generation.name.replace(/-/g, " ")} />
                            </div>
                        </div>

                        {/* Contest Combos */}
                        {move.contest_combos && (
                            <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <Sparkles className="w-4 h-4 text-accent" />
                                    <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Contest Combos</h2>
                                </div>
                                <div className="space-y-4">
                                    {move.contest_combos.normal.use_before && (
                                        <div>
                                            <span className="text-[8px] font-black uppercase text-text-muted block mb-2">Use Before</span>
                                            <div className="flex flex-wrap gap-1">
                                                {move.contest_combos.normal.use_before.map(m => (
                                                    <Link key={m.name} href={`/moves/${m.name}`} className="px-2 py-1 bg-bg-tertiary rounded border border-border text-[9px] capitalize hover:text-accent">
                                                        {m.name.replace(/-/g, " ")}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {move.contest_combos.normal.use_after && (
                                        <div>
                                            <span className="text-[8px] font-black uppercase text-text-muted block mb-2">Use After</span>
                                            <div className="flex flex-wrap gap-1">
                                                {move.contest_combos.normal.use_after.map(m => (
                                                    <Link key={m.name} href={`/moves/${m.name}`} className="px-2 py-1 bg-bg-tertiary rounded border border-border text-[9px] capitalize hover:text-accent">
                                                        {m.name.replace(/-/g, " ")}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary & Effects */}
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm relative overflow-hidden">
                            <Sparkles className="absolute top-8 right-8 w-24 h-24 text-accent/5 -rotate-12" />
                            <div className="flex items-center gap-3 mb-6">
                                <Gamepad2 className="w-5 h-5 text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Move Effect</h2>
                            </div>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-text-secondary text-lg leading-relaxed mb-8">
                                    {shortEffect}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <DetailCard
                                        icon={<ShieldAlert className="w-4 h-4 text-orange-400" />}
                                        label="Crit Rate Bonus"
                                        value={`+${move.meta.crit_rate}`}
                                    />
                                    <DetailCard
                                        icon={<Activity className="w-4 h-4 text-pink-400" />}
                                        label="Flinch Chance"
                                        value={`${move.meta.flinch_chance}%`}
                                    />
                                    {hasHits && (
                                        <DetailCard
                                            icon={<Dices className="w-4 h-4 text-cyan-400" />}
                                            label="Hit Count"
                                            value={move.meta.min_hits === move.meta.max_hits ? `${move.meta.max_hits} hits` : `${move.meta.min_hits}-${move.meta.max_hits} hits`}
                                        />
                                    )}
                                    {hasAilment && move.meta.ailment_chance > 0 && (
                                        <DetailCard
                                            icon={<Skull className="w-4 h-4 text-purple-400" />}
                                            label="Ailment Chance"
                                            value={`${move.meta.ailment_chance}%`}
                                        />
                                    )}
                                    {move.meta.drain !== 0 && (
                                        <DetailCard
                                            icon={<Droplets className="w-4 h-4 text-indigo-400" />}
                                            label="HP Drain"
                                            value={`${move.meta.drain > 0 ? "+" : ""}${move.meta.drain}%`}
                                        />
                                    )}
                                    {move.meta.healing !== 0 && (
                                        <DetailCard
                                            icon={<Sparkles className="w-4 h-4 text-green-400" />}
                                            label="Healing"
                                            value={`${move.meta.healing}%`}
                                        />
                                    )}
                                </div>

                                {/* Stat Changes */}
                                {hasStatChanges && (
                                    <div className="mt-8">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-text-muted mb-4 flex items-center gap-2">
                                            <TrendingUp className="w-3 h-3" /> Stat Modifications
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {move.stat_changes.map((sc, i) => (
                                                <div key={i} className="px-3 py-1.5 rounded-lg bg-bg-tertiary border border-border flex items-center gap-2 text-xs">
                                                    <span className="capitalize font-bold text-text-primary">{sc.stat.name.replace(/-/g, " ")}</span>
                                                    <span className={`font-black ${sc.change > 0 ? "text-green-400" : "text-red-400"}`}>
                                                        {sc.change > 0 ? "+" : ""}{sc.change} stage{Math.abs(sc.change) > 1 ? "s" : ""}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Machine Info */}
                        {machines.length > 0 && (
                            <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <Disc className="w-5 h-5 text-accent" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">TMs/HMs</h2>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {machines.map((m, i) => (
                                        <div key={i} className="px-4 py-2 rounded-xl bg-bg-tertiary border border-border flex flex-col items-center min-w-[100px]">
                                            <span className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">{m.version_group.name.replace(/-/g, " ")}</span>
                                            <span className="text-sm font-black text-accent uppercase">{m.machine.url.split("/").slice(-2)[0]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Version & Stat History */}
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <History className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Version History</h2>
                            </div>

                            {/* Past Stat Values */}
                            {move.past_values && move.past_values.length > 0 && (
                                <div className="mb-8 space-y-4">
                                    <span className="text-[8px] font-black uppercase text-text-muted block mb-2">Past Values</span>
                                    {move.past_values.map((v, i) => (
                                        <div key={i} className="p-4 bg-bg-tertiary/50 rounded-xl border border-border text-xs">
                                            <div className="font-black text-accent uppercase mb-2 tracking-widest">{v.version_group.name.replace(/-/g, " ")}</div>
                                            <div className="grid grid-cols-2 gap-4">
                                                {v.power && <div><span className="text-text-muted">Power:</span> {v.power}</div>}
                                                {v.accuracy && <div><span className="text-text-muted">Accuracy:</span> {v.accuracy}%</div>}
                                                {v.pp && <div><span className="text-text-muted">PP:</span> {v.pp}</div>}
                                                {v.type && <div><span className="text-text-muted">Type:</span> <span className="capitalize">{v.type.name}</span></div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Effect Changes */}
                            {move.effect_changes && move.effect_changes.length > 0 && (
                                <div className="mb-8 space-y-4">
                                    <span className="text-[8px] font-black uppercase text-text-muted block mb-2">Effect Changes</span>
                                    {move.effect_changes.map((change, idx) => (
                                        <div key={idx} className="p-4 bg-bg-tertiary/50 rounded-xl border border-border border-l-4 border-l-amber-500">
                                            <div className="font-black text-amber-500 uppercase mb-2 tracking-widest text-xs flex items-center gap-2">
                                                <History className="w-3 h-3" />
                                                Modified in {change.version_group.name.replace(/-/g, " ")}
                                            </div>
                                            <p className="text-sm text-text-secondary leading-relaxed">
                                                {change.effect_entries.find(e => e.language.name === "en")?.effect || "Unknown modification recorded."}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-4">
                                <span className="text-[8px] font-black uppercase text-text-muted block mb-2">Flavor Text History</span>
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
                            </div>
                        </div>

                        <GenericPokemonCarousel
                            title="Learned By"
                            description="Pokemon that can learn this move"
                            items={move.learned_by_pokemon}
                            icon="target"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatItem({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-bg-tertiary border border-border transition-colors group-hover:border-accent/30 ${color}`}>
                    {icon}
                </div>
                <span className="text-sm font-bold text-text-secondary">{label}</span>
            </div>
            <span className="text-lg font-black text-text-primary">{value ?? "--"}</span>
        </div>
    );
}

function MetaItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-between py-1">
            <span className="text-xs font-bold text-text-muted uppercase tracking-tight">{label}</span>
            <span className="text-xs font-black text-text-primary capitalize">{value}</span>
        </div>
    );
}

function DetailCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-tertiary border border-border hover:border-accent/20 transition-all">
            <div className="p-2 rounded-lg bg-bg-secondary border border-border shadow-sm">
                {icon}
            </div>
            <div>
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{label}</div>
                <div className="text-sm font-black text-text-primary">{value}</div>
            </div>
        </div>
    );
}
