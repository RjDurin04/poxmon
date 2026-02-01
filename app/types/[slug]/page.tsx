import { getTypeDetail } from "@/lib/api";
import Link from "next/link";
import {
    ArrowLeft,
    Swords,
    Shield,
    Activity,
    BrainCircuit,
    GitCommit,
    ArrowRight,
    Users,
    Target,
    History,
    ShieldAlert
} from "lucide-react";
import { GenericPokemonCarousel } from "@/components/GenericPokemonCarousel";
import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const TYPE_THEMES: Record<string, { color: string, border: string, bg: string, accent: string, contrast: string, shadow: string, glow: string }> = {
    normal: { color: "text-neutral-400", border: "border-neutral-500/20", bg: "bg-neutral-500/5", accent: "bg-neutral-400", contrast: "text-neutral-200", shadow: "shadow-neutral-500/20", glow: "from-neutral-500/20" },
    fire: { color: "text-orange-500", border: "border-orange-500/20", bg: "bg-orange-500/5", accent: "bg-orange-500", contrast: "text-orange-200", shadow: "shadow-orange-500/20", glow: "from-orange-500/20" },
    water: { color: "text-sky-500", border: "border-sky-500/20", bg: "bg-sky-500/5", accent: "bg-sky-500", contrast: "text-sky-200", shadow: "shadow-sky-500/20", glow: "from-sky-500/20" },
    electric: { color: "text-yellow-400", border: "border-yellow-400/20", bg: "bg-yellow-400/5", accent: "bg-yellow-400", contrast: "text-yellow-200", shadow: "shadow-yellow-400/20", glow: "from-yellow-400/20" },
    grass: { color: "text-green-500", border: "border-green-500/20", bg: "bg-green-500/5", accent: "bg-green-500", contrast: "text-green-200", shadow: "shadow-green-500/20", glow: "from-green-500/20" },
    ice: { color: "text-cyan-400", border: "border-cyan-400/20", bg: "bg-cyan-400/5", accent: "bg-cyan-400", contrast: "text-cyan-200", shadow: "shadow-cyan-400/20", glow: "from-cyan-400/20" },
    fighting: { color: "text-rose-600", border: "border-rose-600/20", bg: "bg-rose-600/5", accent: "bg-rose-600", contrast: "text-rose-200", shadow: "shadow-rose-600/20", glow: "from-rose-600/20" },
    poison: { color: "text-fuchsia-500", border: "border-fuchsia-500/20", bg: "bg-fuchsia-500/5", accent: "bg-fuchsia-500", contrast: "text-fuchsia-200", shadow: "shadow-fuchsia-500/20", glow: "from-fuchsia-500/20" },
    ground: { color: "text-amber-600", border: "border-amber-600/20", bg: "bg-amber-600/5", accent: "bg-amber-600", contrast: "text-amber-200", shadow: "shadow-amber-600/20", glow: "from-amber-600/20" },
    flying: { color: "text-indigo-400", border: "border-indigo-400/20", bg: "bg-indigo-400/5", accent: "bg-indigo-400", contrast: "text-indigo-200", shadow: "shadow-indigo-400/20", glow: "from-indigo-400/20" },
    psychic: { color: "text-pink-500", border: "border-pink-500/20", bg: "bg-pink-500/5", accent: "bg-pink-500", contrast: "text-pink-200", shadow: "shadow-pink-500/20", glow: "from-pink-500/20" },
    bug: { color: "text-lime-500", border: "border-lime-500/20", bg: "bg-lime-500/5", accent: "bg-lime-500", contrast: "text-lime-200", shadow: "shadow-lime-500/20", glow: "from-lime-500/20" },
    rock: { color: "text-stone-500", border: "border-stone-500/20", bg: "bg-stone-500/5", accent: "bg-stone-500", contrast: "text-stone-200", shadow: "shadow-stone-500/20", glow: "from-stone-500/20" },
    ghost: { color: "text-violet-400", border: "border-violet-400/20", bg: "bg-violet-400/5", accent: "bg-violet-400", contrast: "text-violet-200", shadow: "shadow-violet-400/20", glow: "from-violet-400/20" },
    dragon: { color: "text-purple-600", border: "border-purple-600/20", bg: "bg-purple-600/5", accent: "bg-purple-600", contrast: "text-purple-200", shadow: "shadow-purple-600/20", glow: "from-purple-600/20" },
    dark: { color: "text-neutral-500", border: "border-neutral-500/20", bg: "bg-neutral-500/5", accent: "bg-neutral-500", contrast: "text-neutral-200", shadow: "shadow-neutral-500/20", glow: "from-neutral-500/20" },
    steel: { color: "text-slate-400", border: "border-slate-400/20", bg: "bg-slate-400/5", accent: "bg-slate-400", contrast: "text-slate-200", shadow: "shadow-slate-400/20", glow: "from-slate-400/20" },
    fairy: { color: "text-pink-300", border: "border-pink-300/20", bg: "bg-pink-300/5", accent: "bg-pink-300", contrast: "text-pink-100", shadow: "shadow-pink-300/20", glow: "from-pink-300/20" },
};

export default async function TypeDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const type = await getTypeDetail(slug);
    const { damage_relations, past_damage_relations } = type;

    const theme = TYPE_THEMES[type.name] || { color: "text-accent", border: "border-accent/20", bg: "bg-accent/10", accent: "bg-accent", contrast: "text-white", shadow: "shadow-accent/20", glow: "from-accent/20" };
    const hasPastRelations = past_damage_relations && past_damage_relations.length > 0;

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 font-sans overflow-x-hidden relative">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className={`absolute top-[10%] left-[20%] w-[60%] h-[60%] ${theme.bg} blur-[120px] rounded-full opacity-30`} />
                <div className={`absolute bottom-[10%] right-[10%] w-[40%] h-[40%] ${theme.bg} blur-[120px] rounded-full opacity-20`} />
            </div>

            {/* Floating Back Button */}
            <div className="fixed top-28 left-6 sm:left-12 z-[110]">
                <BackButton variant="floating" label="Back to Types" fallbackPath="/types" />
            </div>

            {/* Header Content */}
            <header className="relative z-20 pt-32 sm:pt-48 pb-12 sm:pb-32 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                    {/* Decorative Background ID */}
                    <span className="text-[5rem] sm:text-[8rem] lg:text-[16rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1] uppercase">
                        TYPE
                    </span>

                    <div className="flex items-center gap-4 mb-6 flex-wrap justify-center lg:justify-start">
                        <div className={`w-3 h-3 rounded-full ${theme.accent} shadow-[0_0_10px_currentColor]`} />
                        <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme.color}`}>
                            Elemental Class
                        </span>
                        <div className={`w-3 h-3 rounded-full ${theme.accent} shadow-[0_0_10px_currentColor]`} />
                    </div>

                    <h1 className={`text-6xl sm:text-8xl lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl ${theme.color}`}>
                        {type.name}
                    </h1>

                    <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                        <span className="px-6 py-2.5 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                            <Users className="w-3.5 h-3.5" />
                            {type.pokemon.length} Registered Species
                        </span>

                        {type.move_damage_class && (
                            <span className={`px-6 py-2.5 rounded-2xl ${theme.bg} border ${theme.border} text-xs font-black uppercase tracking-widest ${theme.color} flex items-center gap-2`}>
                                <Target className="w-3.5 h-3.5" />
                                {type.move_damage_class.name} Class
                            </span>
                        )}

                        <span className="px-6 py-2.5 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                            <History className="w-3.5 h-3.5" />
                            Gen {type.generation.name.split("-")[1].toUpperCase()}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-32 space-y-24">

                {/* Advanced Matrix Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Offensive Panel */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 rounded-xl bg-bg-secondary border border-border/50">
                                <Swords className="w-6 h-6 text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-widest text-text-primary">Offensive Matrix</h2>
                                <p className="text-[10px] text-text-muted font-bold tracking-[0.2em] uppercase">Attack Efficiency</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <MatrixRow
                                label="Dominant Against"
                                multiplier="2x"
                                types={damage_relations.double_damage_to}
                                variant="advantage"
                            />
                            <MatrixRow
                                label="Resisted By"
                                multiplier="0.5x"
                                types={damage_relations.half_damage_to}
                                variant="disadvantage"
                            />
                            <MatrixRow
                                label="Ineffective Against"
                                multiplier="0x"
                                types={damage_relations.no_damage_to}
                                variant="null"
                            />
                        </div>
                    </div>

                    {/* Defensive Panel */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 rounded-xl bg-bg-secondary border border-border/50">
                                <Shield className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-widest text-text-primary">Defensive Matrix</h2>
                                <p className="text-[10px] text-text-muted font-bold tracking-[0.2em] uppercase">Defense Capability</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <MatrixRow
                                label="Vulnerable To"
                                multiplier="2x"
                                types={damage_relations.double_damage_from}
                                variant="critical"
                            />
                            <MatrixRow
                                label="Resistant To"
                                multiplier="0.5x"
                                types={damage_relations.half_damage_from}
                                variant="resistance"
                            />
                            <MatrixRow
                                label="Immune To"
                                multiplier="0x"
                                types={damage_relations.no_damage_from}
                                variant="immunity"
                            />
                        </div>
                    </div>
                </div>

                {/* Legacy Data Timeline */}
                {hasPastRelations && (
                    <section className="relative">
                        <div className="flex items-center gap-4 mb-16 justify-center lg:justify-start">
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                <Activity className="w-6 h-6 text-amber-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-widest text-text-primary">Historical Deviations</h2>
                                <p className="text-[10px] text-text-muted font-bold tracking-[0.2em] uppercase">Meta-Evolution Timeline</p>
                            </div>
                        </div>

                        <div className="relative border-l-2 border-white/5 ml-4 lg:ml-8 space-y-16 py-4">
                            {past_damage_relations.map((past, i) => (
                                <div key={i} className="relative pl-8 lg:pl-12 group">
                                    {/* Timeline Node */}
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-bg-primary border-4 border-amber-500/50 group-hover:border-amber-500 lg:group-hover:scale-125 transition-all z-10" />

                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4">
                                            <span className="px-4 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest">
                                                Gen {past.generation.name.split("-")[1].toUpperCase()}
                                            </span>
                                            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest opacity-60">Prior Configuration</span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-bg-secondary/20 p-6 rounded-2xl border border-white/5 hover:bg-bg-secondary/40 transition-colors">
                                            {/* Offensive Changes */}
                                            {(past.damage_relations.double_damage_to.length > 0 || past.damage_relations.half_damage_to.length > 0) && (
                                                <div className="space-y-4">
                                                    <span className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                                                        <Swords className="w-3 h-3" /> Offensive Shifts
                                                    </span>
                                                    <div className="space-y-3">
                                                        {past.damage_relations.double_damage_to.map(t => (
                                                            <ChangeLogItem key={t.name} type={t.name} from="1x" to="2x" trend="up" />
                                                        ))}
                                                        {past.damage_relations.half_damage_to.map(t => (
                                                            <ChangeLogItem key={t.name} type={t.name} from="1x" to="0.5x" trend="down" />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Defensive Changes */}
                                            {(past.damage_relations.double_damage_from.length > 0 || past.damage_relations.half_damage_from.length > 0) && (
                                                <div className="space-y-4">
                                                    <span className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                                                        <Shield className="w-3 h-3" /> Defensive Shifts
                                                    </span>
                                                    <div className="space-y-3">
                                                        {past.damage_relations.double_damage_from.map(t => (
                                                            <ChangeLogItem key={t.name} type={t.name} from="1x" to="2x" trend="down-bad" />
                                                        ))}
                                                        {past.damage_relations.half_damage_from.map(t => (
                                                            <ChangeLogItem key={t.name} type={t.name} from="1x" to="0.5x" trend="up-good" />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Pokemon Roster */}
                <section>
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10 mb-6">
                            <BrainCircuit className="w-6 h-6 text-accent" />
                        </div>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-text-muted">Associated Species</h2>
                        <p className="mt-4 text-2xl font-black text-text-primary">
                            {type.pokemon.length} <span className="text-text-muted">Registered Entities</span>
                        </p>
                    </div>

                    <div className="bg-bg-secondary/30 border border-border/50 rounded-[3rem] p-8 md:p-12">
                        <GenericPokemonCarousel
                            title=""
                            description=""
                            items={type.pokemon.map(p => ({ name: p.pokemon.name, url: p.pokemon.url }))}
                        />
                    </div>
                </section>

                {/* Termination Footer */}
                <div className="border-t border-white/5 pt-32 pb-12 flex flex-col items-center text-center">
                    <Link href="/types" className="group flex flex-col items-center gap-8">
                        <div className="w-20 h-20 rounded-[2.5rem] bg-bg-secondary border border-white/5 group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center transition-all duration-700">
                            <ArrowLeft className="w-8 h-8 text-text-muted group-hover:text-accent transition-colors" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[1em] text-text-muted group-hover:text-accent transition-all pl-[1em]">Return to Matrix</span>
                    </Link>
                </div>

            </main>
        </div>
    );
}

// UI Components
function MatrixRow({ label, multiplier, types, variant }: { label: string, multiplier: string, types: { name: string, url: string }[], variant: "advantage" | "disadvantage" | "null" | "critical" | "resistance" | "immunity" }) {

    // Style configurations based on variant
    const styles = {
        advantage: "bg-emerald-500/5 border-emerald-500/10 text-emerald-400",
        disadvantage: "bg-rose-500/5 border-rose-500/10 text-rose-400",
        null: "bg-neutral-500/5 border-neutral-500/10 text-neutral-400",
        critical: "bg-rose-500/5 border-rose-500/10 text-rose-400",
        resistance: "bg-emerald-500/5 border-emerald-500/10 text-emerald-400",
        immunity: "bg-violet-500/5 border-violet-500/10 text-violet-400"
    };

    const currentStyle = styles[variant];
    const accentColor = currentStyle.split(" ").pop(); // Extract text color class for icons/text

    return (
        <div className={`group relative p-6 rounded-3xl bg-bg-secondary border border-border/50 overflow-hidden transition-all duration-500 hover:border-border`}>
            {/* Background Glow */}
            <div className={`absolute -right-12 -top-12 w-24 h-24 ${currentStyle.replace("text", "bg").replace("500/5", "500/10")} blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                    <span className={`flex items-center justify-center w-10 h-10 rounded-lg ${currentStyle} font-mono font-black text-sm`}>
                        {multiplier}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{label}</span>
                </div>
                <span className={`text-2xl font-black font-mono ${accentColor} opacity-50`}>
                    {types.length.toString().padStart(2, "0")}
                </span>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2">
                {types.length > 0 ? types.map((t) => (
                    <Link
                        key={t.name}
                        href={`/types/${t.name}`}
                        className={`
                            px-4 py-2 rounded-xl bg-bg-tertiary border border-white/5 
                            text-[10px] font-black uppercase tracking-wider text-text-secondary
                            hover:bg-white/10 hover:text-white transition-all hover:scale-105 active:scale-95
                        `}
                    >
                        {t.name}
                    </Link>
                )) : (
                    <span className="text-[10px] font-bold text-text-muted italic opacity-30 px-2 py-2">No Recorded Data</span>
                )}
            </div>
        </div>
    )
}

function ChangeLogItem({ type, from, to, trend }: { type: string, from: string, to: string, trend: "up" | "down" | "up-good" | "down-bad" }) {

    // Simplification for UI colors:
    // Good (Buff for user's type) = Emerald
    // Bad (Nerf for user's type) = Rose

    const isPositive = trend === "up" || trend === "up-good";
    const colorClass = isPositive ? "text-emerald-400" : "text-rose-400";
    const bgClass = isPositive ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-500/10 border-rose-500/20";

    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-bg-tertiary border border-white/5">
            <span className="text-xs font-black uppercase text-text-primary tracking-wider">{type}</span>
            <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-text-muted">{from}</span>
                <ArrowRight className="w-3 h-3 text-text-muted opacity-50" />
                <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${bgClass} ${colorClass}`}>
                    {to}
                </span>
            </div>
        </div>
    )
}
