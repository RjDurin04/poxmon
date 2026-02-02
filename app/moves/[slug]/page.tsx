import { getMoveDetail } from "@/lib/api";
import {
    Zap,
    Swords,
    Activity,
    Droplets,
    Sparkles,
    Skull,
    Disc,
    History,
    Database,
    Hash,
    Binary,
    Code,
    Layers
} from "lucide-react";
import { GenericPokemonCarousel } from "@/components/GenericPokemonCarousel";
import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
}

interface TypeTheme {
    color: string;
    border: string;
    bg: string;
    accent: string;
}

const TYPE_THEMES: Record<string, TypeTheme> = {
    normal: { color: "text-zinc-400", border: "border-zinc-500/20", bg: "bg-zinc-500/10", accent: "bg-zinc-500" },
    fire: { color: "text-orange-500", border: "border-orange-500/20", bg: "bg-orange-500/10", accent: "bg-orange-500" },
    water: { color: "text-blue-500", border: "border-blue-500/20", bg: "bg-blue-500/10", accent: "bg-blue-500" },
    electric: { color: "text-yellow-400", border: "border-yellow-400/20", bg: "bg-yellow-400/10", accent: "bg-yellow-400" },
    grass: { color: "text-emerald-500", border: "border-emerald-500/20", bg: "bg-emerald-500/10", accent: "bg-emerald-500" },
    ice: { color: "text-cyan-300", border: "border-cyan-300/20", bg: "bg-cyan-300/10", accent: "bg-cyan-300" },
    fighting: { color: "text-red-600", border: "border-red-600/20", bg: "bg-red-600/10", accent: "bg-red-600" },
    poison: { color: "text-purple-500", border: "border-purple-500/20", bg: "bg-purple-500/10", accent: "bg-purple-500" },
    ground: { color: "text-amber-600", border: "border-amber-600/20", bg: "bg-amber-600/10", accent: "bg-amber-600" },
    flying: { color: "text-indigo-400", border: "border-indigo-400/20", bg: "bg-indigo-400/10", accent: "bg-indigo-400" },
    psychic: { color: "text-pink-500", border: "border-pink-500/20", bg: "bg-pink-500/10", accent: "bg-pink-500" },
    bug: { color: "text-lime-500", border: "border-lime-500/20", bg: "bg-lime-500/10", accent: "bg-lime-500" },
    rock: { color: "text-stone-500", border: "border-stone-500/20", bg: "bg-stone-500/10", accent: "bg-stone-500" },
    ghost: { color: "text-violet-400", border: "border-violet-400/20", bg: "bg-violet-400/10", accent: "bg-violet-400" },
    dragon: { color: "text-indigo-600", border: "border-indigo-600/20", bg: "bg-indigo-600/10", accent: "bg-indigo-600" },
    dark: { color: "text-stone-700", border: "border-stone-700/20", bg: "bg-stone-700/10", accent: "bg-stone-700" },
    steel: { color: "text-slate-400", border: "border-slate-400/20", bg: "bg-slate-400/10", accent: "bg-slate-400" },
    fairy: { color: "text-pink-300", border: "border-pink-300/20", bg: "bg-pink-300/10", accent: "bg-pink-300" },
};

export default async function MoveDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const move = await getMoveDetail(slug);

    const theme = TYPE_THEMES[move.type.name] || { color: "text-accent", border: "border-accent/20", bg: "bg-accent/10", accent: "bg-accent" };
    const shortEffect = move.effect_entries.find(e => e.language.name === "en")?.short_effect || "No operational summary available.";


    // Unique history
    const history = move.flavor_text_entries
        .filter(f => f.language.name === "en")
        .reduce((acc, current) => {
            const exists = acc.find(item => item.flavor_text === current.flavor_text);
            if (!exists) acc.push(current);
            return acc;
        }, [] as typeof move.flavor_text_entries)
        .slice(-8);

    const machines = move.machines || [];
    const hasStatChanges = move.stat_changes && move.stat_changes.length > 0;

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white overflow-x-hidden relative">
            {/* Atmosphere */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className={cn("absolute top-[5%] left-[10%] w-[50%] h-[50%] blur-[150px] rounded-full opacity-10", theme.bg)} />
                <div className={cn("absolute bottom-[10%] right-[10%] w-[40%] h-[40%] blur-[150px] rounded-full opacity-5", theme.bg)} />
            </div>

            {/* Navigation */}
            <div className="fixed top-28 left-6 sm:left-12 z-[110]">
                <BackButton variant="floating" label="Registry" fallbackPath="/moves" />
            </div>

            {/* Header: Instruction Set */}
            <header className="relative z-20 pt-32 sm:pt-48 pb-12 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                    {/* Background Label */}
                    <span className="text-[5rem] sm:text-[8rem] lg:text-[14rem] font-black text-white/[0.02] absolute -top-12 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none z-[-1] uppercase">
                        MOVE
                    </span>

                    <div className="flex items-center gap-4 mb-6 flex-wrap justify-center lg:justify-start">
                        <div className={cn("w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]", theme.color.replace('text-', 'bg-'))} />
                        <span className={cn("text-[10px] font-black uppercase tracking-[0.3em]", theme.color)}>
                            Move Execution Registry
                        </span>
                        <div className={cn("w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]", theme.color.replace('text-', 'bg-'))} />
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full gap-8">
                        <div>
                            <h1 className="text-6xl sm:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl">
                                {move.name.replace(/-/g, " ")}
                            </h1>
                            <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                                <span className={cn("px-6 py-2 rounded-2xl border text-xs font-black uppercase tracking-widest flex items-center gap-2", theme.bg, theme.border, theme.color)}>
                                    <Layers className="w-3.5 h-3.5" />
                                    {move.type.name}
                                </span>
                                <span className="px-6 py-2 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                                    {move.damage_class.name === "physical" ? <Swords className="w-3.5 h-3.5" /> : move.damage_class.name === "special" ? <Sparkles className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
                                    {move.damage_class.name}
                                </span>
                                <span className="px-6 py-2 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                                    <Hash className="w-3.5 h-3.5" />
                                    #{move.id.toString().padStart(4, '0')}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4 sm:gap-8 bg-bg-secondary/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-border/50 shadow-2xl">
                            <MetricBox label="Intensity" value={move.power ?? "N/A"} theme={theme} />
                            <MetricBox label="Precision" value={move.accuracy ? `${move.accuracy}%` : "N/A"} theme={theme} />
                            <MetricBox label="Capacity" value={move.pp} theme={theme} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Grid */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-32 space-y-12">

                {/* 1. Operational Logic */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Logic Execution Panel */}
                    <div className="lg:col-span-8 p-8 sm:p-12 rounded-[3rem] bg-bg-secondary/30 border border-border/50 relative overflow-hidden group">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-2xl bg-bg-tertiary border border-white/5">
                                <Code className="w-6 h-6 text-text-muted" />
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-widest">Operational Logic</h2>
                        </div>

                        <div className="space-y-8">
                            <p className="text-xl sm:text-2xl font-bold text-text-primary leading-snug">
                                {shortEffect}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-sm leading-relaxed">
                                <SpecCard label="System Target" value={move.target.name.replace(/-/g, " ")} />
                                <SpecCard label="Execution Class" value={move.damage_class.name} />
                                <SpecCard label="Intro Context" value={move.generation.name.replace('generation-', 'v.')} />
                            </div>

                            <div className="p-6 rounded-3xl bg-black/40 border border-white/5 font-mono text-xs sm:text-sm text-text-secondary/80 leading-relaxed">
                                {/* Full Instruction Processing Hook */}
                                <span className="text-emerald-500/50 mb-2 block">{'// Full Instruction Processing Hook'}</span>
                                {move.effect_entries.find(e => e.language.name === "en")?.effect.split('\n').map((line, i) => (
                                    <p key={i} className="mb-4 last:mb-0">{line}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Metadata & Modifications */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Status/Ailment Parameters */}
                        <div className="p-8 rounded-[2.5rem] bg-bg-secondary/50 border border-border/50">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted mb-8">Instruction Parameters</h3>
                            <div className="space-y-6">
                                <ParamItem label="Crit Rate Mod" value={`+${move.meta.crit_rate}`} icon={<Activity className="text-rose-400" />} />
                                <ParamItem label="Flinch Chance" value={`${move.meta.flinch_chance}%`} icon={<Zap className="text-amber-400" />} />
                                <ParamItem label="Ailment Inject" value={move.meta.ailment.name !== "none" ? move.meta.ailment.name : "None"} icon={<Skull className="text-purple-400" />} />
                                {move.meta.drain !== 0 && <ParamItem label="Drain/Rebound" value={`${move.meta.drain}%`} icon={<Droplets className="text-blue-400" />} />}
                                {move.meta.healing !== 0 && <ParamItem label="System Repair" value={`${move.meta.healing}%`} icon={<Sparkles className="text-emerald-400" />} />}
                            </div>
                        </div>

                        {/* Stat Modifiers */}
                        {hasStatChanges && (
                            <div className="p-8 rounded-[2.5rem] bg-bg-secondary border border-border/50">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted mb-6">Modifier Injectors</h3>
                                <div className="space-y-3">
                                    {move.stat_changes.map((sc, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-bg-tertiary border border-border/30">
                                            <span className="text-xs font-bold uppercase text-text-primary">{sc.stat.name.replace(/-/g, " ")}</span>
                                            <span className={cn("text-xs font-black px-3 py-1 rounded-lg", sc.change > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400")}>
                                                {sc.change > 0 ? "+" : ""}{sc.change} LV
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 2. Distribution Media (Machines) */}
                {machines.length > 0 && (
                    <section className="py-12">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 rounded-2xl bg-bg-secondary border border-border">
                                <Disc className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-widest">Distribution Media</h2>
                                <p className="text-[10px] text-text-muted font-bold tracking-[0.2em] uppercase mt-1">Authorized Data Discs (TM/HM)</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {machines.map((m, i) => (
                                <div key={i} className="group p-6 rounded-3xl bg-bg-secondary/40 border border-border/50 hover:border-accent/30 transition-all flex flex-col items-center gap-2">
                                    <Disc className="w-8 h-8 text-text-muted group-hover:text-accent group-hover:rotate-45 transition-all duration-700" />
                                    <span className="text-[10px] font-black text-text-muted uppercase text-center mt-2">{m.version_group.name.replace(/-/g, " ")}</span>
                                    <span className="text-xl font-black text-text-primary uppercase tracking-tighter">{m.machine.url.split("/").slice(-2)[0]}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. Patch History & Log Archive */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                    {/* Patch Notes (Effect Changes) */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <History className="w-5 h-5 text-amber-500" />
                            <h2 className="text-xs font-black uppercase tracking-[0.3em]">System Patch Notes</h2>
                        </div>
                        <div className="space-y-4">
                            {move.effect_changes && move.effect_changes.map((change, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-bg-secondary/20 border border-border/50 flex gap-6">
                                    <div className="flex-shrink-0 pt-1">
                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Version: {change.version_group.name.replace(/-/g, " ")}</span>
                                        <p className="text-sm text-text-secondary leading-relaxed font-medium">
                                            {change.effect_entries.find(e => e.language.name === "en")?.effect}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {(!move.effect_changes || move.effect_changes.length === 0) && (
                                <div className="p-8 text-center rounded-3xl border border-dashed border-border/40 text-text-muted text-xs font-bold uppercase tracking-widest">
                                    No functional overrides recorded
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description Archive */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <Database className="w-5 h-5 text-text-muted" />
                            <h2 className="text-xs font-black uppercase tracking-[0.3em]">Description Log Archive</h2>
                        </div>
                        <div className="space-y-px rounded-[2rem] overflow-hidden border border-border/50">
                            {history.map((entry, idx) => (
                                <div key={idx} className="p-5 flex gap-6 bg-bg-secondary/40 hover:bg-white/[0.03] transition-colors group">
                                    <div className="w-24 flex-shrink-0 pt-1">
                                        <span className="text-[9px] font-black text-text-muted uppercase transition-colors group-hover:text-text-primary">
                                            {entry.version_group.name}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-secondary leading-relaxed italic group-hover:text-text-primary transition-colors">
                                        &quot;{entry.flavor_text.replace(/\n|\f/g, " ")}&quot;
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Compatible Entities */}
                <section className="pt-24">
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10 mb-6 group">
                            <Binary className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                        </div>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-text-muted">Deployment Registry</h2>
                        <p className="mt-4 text-3xl font-black text-text-primary uppercase tracking-tight">
                            {move.learned_by_pokemon.length} <span className="text-text-muted">Compatible Entities</span>
                        </p>
                    </div>

                    <div className="bg-bg-secondary/20 border border-border/50 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                        <GenericPokemonCarousel
                            title=""
                            description=""
                            items={move.learned_by_pokemon}
                            icon="target"
                        />
                    </div>
                </section>

            </main>

            {/* Termination Footer */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-white/5 relative z-10 flex flex-col items-center text-center">
                <BackButton variant="footer" label="Back to Registry" fallbackPath="/moves" />
            </div>
        </div>
    );
}

function MetricBox({ label, value, theme }: { label: string, value: string | number, theme: TypeTheme }) {
    return (
        <div className="flex flex-col items-center text-center min-w-[80px]">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3">{label}</span>
            <div className="relative flex items-center justify-center">
                <div className={cn("absolute inset-0 blur-xl opacity-20", theme.bg)} />
                <span className="text-3xl font-black text-text-primary relative tracking-tighter">{value}</span>
            </div>
        </div>
    )
}

function SpecCard({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="text-[9px] text-text-muted uppercase tracking-wider mb-1">{label}</div>
            <div className="text-xs font-bold text-text-primary uppercase">{value}</div>
        </div>
    )
}

function ParamItem({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-bg-tertiary border border-border group-hover:border-white/20 transition-colors">
                    {icon}
                </div>
                <span className="text-[10px] font-black text-text-muted uppercase tracking-tight">{label}</span>
            </div>
            <span className="text-sm font-black text-text-primary">{value}</span>
        </div>
    )
}
