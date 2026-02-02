import { getAbilityDetail } from "@/lib/api";
import {
    Cpu,
    History,
    Users,
    Zap,
    GitBranch,
    Database,
    Hash,
    Binary,
    Activity
} from "lucide-react";
import { GenericPokemonCarousel } from "@/components/GenericPokemonCarousel";
import { BackButton } from "@/components/BackButton";


interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function AbilityDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const ability = await getAbilityDetail(slug);

    const effectEntry = ability.effect_entries.find((e) => e.language.name === "en");
    const shortEffect = effectEntry?.short_effect || "No operational summary available.";
    const fullEffect = effectEntry?.effect || "No execution logic available.";

    // Filter history to unique entries
    const history = ability.flavor_text_entries
        .filter(f => f.language.name === "en")
        .reduce((acc, current) => {
            const exists = acc.find(item => item.flavor_text === current.flavor_text);
            if (!exists) {
                acc.push(current);
            }
            return acc;
        }, [] as typeof ability.flavor_text_entries)
        .slice(-10);

    const effectChanges = ability.effect_changes || [];

    // Theme color based on generation (just for consistent visual variety, mapped to specific colors)
    const getGenColor = (gen: string) => {
        if (gen.includes("generation-i")) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
        if (gen.includes("generation-ii")) return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
        if (gen.includes("generation-iii")) return "text-rose-400 bg-rose-500/10 border-rose-500/20";
        if (gen.includes("generation-iv")) return "text-violet-400 bg-violet-500/10 border-violet-500/20";
        if (gen.includes("generation-v")) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
        return "text-accent bg-accent/10 border-accent/20";
    };

    const genTheme = getGenColor(ability.generation.name);

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white overflow-x-hidden relative">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[20%] w-[60%] h-[60%] bg-accent/5 blur-[120px] rounded-full opacity-30" />
                <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full opacity-20" />
            </div>

            {/* Floating Back Button */}
            <div className="fixed top-28 left-6 sm:left-12 z-[110]">
                <BackButton variant="floating" label="Registry" fallbackPath="/abilities" />
            </div>

            {/* Header Content */}
            <header className="relative z-20 pt-32 sm:pt-48 pb-12 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                    {/* Decorative Background ID */}
                    <span className="text-[5rem] sm:text-[8rem] lg:text-[14rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1] uppercase">
                        ABILITY
                    </span>

                    <div className="flex items-center gap-4 mb-6 flex-wrap justify-center lg:justify-start">
                        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_currentColor]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                            Kernel Module
                        </span>
                        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_currentColor]" />
                    </div>

                    <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl text-text-primary">
                        {ability.name.replace(/-/g, " ")}
                    </h1>

                    <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                        <span className="px-6 py-2.5 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                            <Hash className="w-3.5 h-3.5" />
                            ID: {ability.id.toString().padStart(4, '0')}
                        </span>

                        <span className={`px-6 py-2.5 rounded-2xl border text-xs font-black uppercase tracking-widest flex items-center gap-2 ${genTheme}`}>
                            <Database className="w-3.5 h-3.5" />
                            Gen {ability.generation.name.split("-")[1].toUpperCase()}
                        </span>

                        <span className="px-6 py-2.5 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                            <Users className="w-3.5 h-3.5" />
                            {ability.pokemon.length} Compatible
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-32 space-y-16">

                {/* 1. Operational Logic (Effect) */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Short Summary Card */}
                    <div className="lg:col-span-1 p-8 rounded-[2.5rem] bg-bg-secondary/40 backdrop-blur-sm border border-border/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Zap className="w-32 h-32 rotate-12" />
                        </div>
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
                                <Activity className="w-5 h-5 text-accent" />
                            </div>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Operational Summary</h2>
                        </div>

                        <div className="relative z-10 text-lg sm:text-xl font-bold text-text-primary leading-relaxed">
                            {shortEffect}
                        </div>
                    </div>

                    {/* Full Logic Card */}
                    <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-bg-secondary/20 border border-border/50 relative group">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-bg-tertiary border border-white/5">
                                <Cpu className="w-5 h-5 text-text-muted" />
                            </div>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Execution Logic</h2>
                        </div>

                        <div className="p-6 rounded-3xl bg-black/20 border border-white/5 font-mono text-sm leading-7 text-text-secondary/90">
                            {fullEffect.split('\n').map((line, i) => (
                                <p key={i} className="mb-4 last:mb-0">{line}</p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. System Patches (Effect History) */}
                {effectChanges.length > 0 && (
                    <section className="relative">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                <GitBranch className="w-6 h-6 text-amber-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-widest text-text-primary">System Patches</h2>
                                <p className="text-[10px] text-text-muted font-bold tracking-[0.2em] uppercase mt-1">Logic Modifications</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {effectChanges.map((change, i) => (
                                <div key={i} className="group p-8 rounded-[2rem] bg-bg-secondary/30 border border-border/50 hover:border-amber-500/30 transition-all duration-500">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="px-4 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest">
                                            v.{change.version_group.name.replace(/-/g, " ")}
                                        </span>
                                        <GitBranch className="w-4 h-4 text-amber-500/50" />
                                    </div>
                                    <div className="text-sm text-text-secondary font-medium leading-relaxed">
                                        {change.effect_entries.find(e => e.language.name === "en")?.effect}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 3. Description Log Archive (Flavor Text) */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="p-3 rounded-2xl bg-bg-secondary border border-border">
                            <History className="w-6 h-6 text-text-muted" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-widest text-text-primary">System Log Archive</h2>
                            <p className="text-[10px] text-text-muted font-bold tracking-[0.2em] uppercase mt-1">Historical Descriptions</p>
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] bg-bg-secondary/20 border border-border/50 overflow-hidden">
                        <div className="grid grid-cols-1 divide-y divide-white/5">
                            {history.map((entry, idx) => (
                                <div key={idx} className="group p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:bg-white/[0.02] transition-colors">
                                    <div className="sm:w-48 flex-shrink-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-accent transition-colors" />
                                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest group-hover:text-text-primary transition-colors">
                                                {entry.version_group?.name.replace(/-/g, " ") || "Legacy"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-text-secondary font-medium group-hover:text-text-primary transition-colors leading-relaxed">
                                        &quot;{entry.flavor_text.replace(/\n|\f/g, " ")}&quot;
                                    </div>
                                </div>
                            ))}
                            {/* Empty State */}
                            {history.length === 0 && (
                                <div className="p-12 text-center text-text-muted text-sm font-bold uppercase tracking-widest">
                                    No logs available
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 4. Compatible Entities */}
                <section>
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10 mb-6">
                            <Binary className="w-6 h-6 text-accent" />
                        </div>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-text-muted">Protocol Implementation</h2>
                        <p className="mt-4 text-2xl font-black text-text-primary">
                            {ability.pokemon.length} <span className="text-text-muted">Compatible Species</span>
                        </p>
                    </div>

                    <div className="bg-bg-secondary/30 border border-border/50 rounded-[3rem] p-8 md:p-12">
                        <GenericPokemonCarousel
                            title=""
                            description=""
                            items={ability.pokemon.map(p => ({ name: p.pokemon.name, url: p.pokemon.url }))}
                        />
                    </div>
                </section>

            </main>

            {/* Termination Footer */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-white/5 relative z-10 flex flex-col items-center text-center">
                <BackButton variant="footer" label="Back to Registry" fallbackPath="/abilities" />
            </div>
        </div>
    );
}

// Helper components not strictly needed if we inline styles, but keeping the file clean

