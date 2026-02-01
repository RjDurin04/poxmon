import { getGenerationDetail } from "@/lib/api";
import Link from "next/link";
import {
    Zap,
    Users,
    Map as MapIcon,
    Sword,
    Layers,
    History,
    ChevronRight,
    Cpu,
    ArrowUpRight,
    Search,
    Dna,
    Star,
    Sparkles,
    BrainCircuit
} from "lucide-react";
import { GenericPokemonCarousel } from "@/components/GenericPokemonCarousel";
import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const GEN_THEMES: Record<string, { color: string, border: string, bg: string, text: string, accent: string }> = {
    "generation-i": { color: "bg-red-600", border: "border-red-500/30", bg: "bg-red-500/10", text: "text-red-500", accent: "rgba(220, 38, 38, 0.4)" },
    "generation-ii": { color: "bg-orange-500", border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-500", accent: "rgba(249, 115, 22, 0.4)" },
    "generation-iii": { color: "bg-emerald-500", border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-500", accent: "rgba(16, 185, 129, 0.4)" },
    "generation-iv": { color: "bg-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-500", accent: "rgba(59, 130, 246, 0.4)" },
    "generation-v": { color: "bg-neutral-700", border: "border-neutral-500/30", bg: "bg-neutral-500/10", text: "text-neutral-400", accent: "rgba(115, 115, 115, 0.4)" },
    "generation-vi": { color: "bg-pink-500", border: "border-pink-500/30", bg: "bg-pink-500/10", text: "text-pink-500", accent: "rgba(236, 72, 153, 0.4)" },
    "generation-vii": { color: "bg-yellow-500", border: "border-yellow-500/30", bg: "bg-yellow-500/10", text: "text-yellow-500", accent: "rgba(234, 179, 8, 0.4)" },
    "generation-viii": { color: "bg-cyan-500", border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-500", accent: "rgba(6, 182, 212, 0.4)" },
    "generation-ix": { color: "bg-purple-600", border: "border-purple-500/30", bg: "bg-purple-500/10", text: "text-purple-500", accent: "rgba(147, 51, 234, 0.4)" },
};

function TelemetryCard({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: string }) {
    return (
        <div className="bg-bg-secondary/60 backdrop-blur-lg border border-border/50 p-6 rounded-[28px] group hover:border-accent/30 transition-all flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest leading-none">Record</span>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-black text-text-primary tracking-tighter leading-none mb-1">{value.toString().padStart(3, '0')}</span>
                <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] truncate">{label}</span>
            </div>
        </div>
    );
}

function DataSection({ title, label, icon: Icon, count, color, children }: { title: string, label: string, icon: any, count: number, color: string, children: React.ReactNode }) {
    return (
        <div className="bg-bg-secondary/40 backdrop-blur-xl rounded-[40px] p-8 border border-border/50 flex flex-col h-[560px] group hover:border-accent/20 transition-all shadow-xl">
            <div className="flex items-start justify-between mb-10">
                <div className="flex items-center gap-5">
                    <div className={`p-4 rounded-2xl ${color} bg-opacity-20 text-white shadow-lg`}>
                        <Icon className="w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mb-1 leading-none">{label}</h3>
                        <h4 className="text-3xl font-black text-text-primary uppercase tracking-tighter leading-none">{title}</h4>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-black text-text-primary tracking-tighter block leading-none">{count}</span>
                    <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Count</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {children}
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">API Data Source</span>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black text-emerald-500/80 uppercase tracking-widest">Active</span>
                </div>
            </div>
        </div>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border/30 rounded-3xl opacity-50">
            <Search className="w-10 h-10 mb-4 text-text-muted" />
            <p className="text-xs font-medium italic text-text-muted">{message}</p>
        </div>
    );
}

export default async function GenerationDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const gen = await getGenerationDetail(slug);
    const englishName = gen.names.find((n) => n.language.name === "en")?.name ?? gen.name;

    const theme = GEN_THEMES[gen.name] || { color: "bg-accent", border: "border-accent/30", bg: "bg-accent/10", text: "text-accent", accent: "rgba(var(--color-accent-rgb), 0.4)" };

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white pb-32 font-sans overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent-rgb)_0.5px,_transparent_0.5px)] bg-[size:64px_64px] opacity-[0.03]" />
                <div className={`absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary`} />
                <div
                    className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] blur-[160px] rounded-full opacity-10 transition-colors duration-1000"
                    style={{ backgroundColor: theme.accent }}
                />
            </div>

            <div className="relative z-10 pt-32 pb-24 px-4 md:px-8 border-b border-border/50 bg-bg-primary/20 backdrop-blur-md">
                <div className="max-w-7xl mx-auto">
                    <BackButton label="Generations Index" className="mb-12" />

                    <div className="flex flex-col md:flex-row items-start justify-between gap-12">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-8">
                                <div className={`w-14 h-14 rounded-2xl ${theme.color} flex items-center justify-center shadow-2xl text-white`}>
                                    <Sparkles className="w-7 h-7" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${theme.text}`}>Generation Details</span>
                                        <div className={`h-px w-8 ${theme.bg}`} />
                                    </div>
                                    <span className="text-xs font-black text-text-muted uppercase tracking-widest">Generation ID: {gen.id.toString().padStart(2, '0')}</span>
                                </div>
                            </div>

                            <div className="relative">
                                {/* Decorative Background Label */}
                                <span className="text-[4rem] sm:text-[7rem] lg:text-[12rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-24 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1] uppercase">
                                    GENERATION
                                </span>

                                <h1 className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] mb-10 select-none relative z-10">
                                    {englishName.split(" ")[0]}<br />
                                    <span className={theme.text}>{englishName.split(" ")[1] || "MODULE"}</span>
                                </h1>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href={`/regions/${gen.main_region.name}`}
                                    className="group flex items-center gap-4 px-8 py-4 bg-bg-secondary/40 border border-border rounded-[24px] hover:border-accent/50 hover:bg-bg-tertiary transition-all"
                                >
                                    <div className={`p-2 rounded-xl bg-bg-primary border border-border/50 ${theme.text}`}>
                                        <MapIcon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">Main Region</span>
                                        <span className="text-sm font-black text-text-primary uppercase tracking-tight group-hover:text-accent transition-colors">{gen.main_region.name}</span>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all ml-2" />
                                </Link>

                                <div className="flex items-center gap-4 px-8 py-4 bg-bg-secondary/40 border border-border rounded-[24px]">
                                    <div className={`p-2 rounded-xl bg-bg-primary border border-border/50 ${theme.text}`}>
                                        <History className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">Generation Content</span>
                                        <span className="text-sm font-black text-text-primary uppercase tracking-tight">{gen.version_groups.length} Version Groups</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-1 gap-4 w-full md:w-80">
                            <TelemetryCard label="Pokemon Species" value={gen.pokemon_species.length} icon={Users} color={theme.text} />
                            <TelemetryCard label="Moves" value={gen.moves.length} icon={Sword} color={theme.text} />
                            <TelemetryCard label="Types" value={gen.types.length} icon={Layers} color={theme.text} />
                            <TelemetryCard label="Abilities" value={gen.abilities.length} icon={BrainCircuit} color={theme.text} />
                        </div>
                    </div>
                </div>
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 pointer-events-auto">
                <section className="mb-32 space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-[24px] ${theme.bg} border border-border/50 flex items-center justify-center p-4`}>
                                <Dna className={`w-full h-full ${theme.text}`} />
                            </div>
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black text-text-primary uppercase tracking-tighter">Introduced Species</h2>
                                <p className="text-sm text-text-muted font-medium italic">Catalogue of Pokemon species first appearing in this generation.</p>
                            </div>
                        </div>
                        <div className="hidden md:block h-px flex-1 mx-12 bg-border/50" />
                        <div className="flex items-center gap-3 bg-bg-secondary/50 border border-border px-6 py-3 rounded-2xl">
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Total</span>
                            <span className="text-xl font-black text-accent">{gen.pokemon_species.length}</span>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-x-0 h-full w-full bg-accent/5 blur-[120px] rounded-[64px] -z-10 group-hover:bg-accent/10 transition-all duration-500" />
                        <GenericPokemonCarousel
                            title="Pokemon Species"
                            description="Species introduced in this generation"
                            items={gen.pokemon_species.map(s => ({ name: s.name, url: s.url }))}
                        />
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    <DataSection
                        title="Abilities"
                        label="New Passive Traits"
                        icon={BrainCircuit}
                        count={gen.abilities.length}
                        color={theme.color}
                    >
                        {gen.abilities.length > 0 ? (
                            <div className="grid grid-cols-1 gap-2">
                                {gen.abilities.map(ability => (
                                    <Link
                                        key={ability.name}
                                        href={`/abilities/${ability.name}`}
                                        className="group p-4 bg-bg-secondary/40 border border-border/50 rounded-2xl hover:border-accent/40 hover:bg-bg-tertiary transition-all flex items-center justify-between"
                                    >
                                        <span className="text-xs font-black text-text-secondary uppercase tracking-widest group-hover:text-text-primary transition-colors">{ability.name.replace(/-/g, " ")}</span>
                                        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No new abilities documented." />
                        )}
                    </DataSection>

                    <DataSection
                        title="Moves"
                        label="New Combat Techniques"
                        icon={Zap}
                        count={gen.moves.length}
                        color={theme.color}
                    >
                        {gen.moves.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {gen.moves.map(move => (
                                    <Link
                                        key={move.name}
                                        href={`/moves/${move.name}`}
                                        className="group p-4 bg-bg-secondary/40 border border-border/50 rounded-2xl hover:border-accent/40 hover:bg-bg-tertiary transition-all flex flex-col gap-2"
                                    >
                                        <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] leading-none">Attack</span>
                                        <span className="text-[11px] font-black text-text-primary uppercase tracking-tight truncate">
                                            {move.name.replace(/-/g, " ")}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="col-span-2"><EmptyState message="No new moves found." /></div>
                        )}
                    </DataSection>

                    <DataSection
                        title="Types"
                        label="New Elemental Classes"
                        icon={Layers}
                        count={gen.types.length}
                        color={theme.color}
                    >
                        {gen.types.length > 0 ? (
                            <div className="space-y-3">
                                {gen.types.map(type => (
                                    <Link
                                        key={type.name}
                                        href={`/types/${type.name}`}
                                        className="group p-5 bg-bg-secondary/40 rounded-[24px] border border-border hover:border-accent/40 transition-all flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.5)]" />
                                            <span className="text-sm font-black text-text-primary uppercase tracking-tighter">
                                                {type.name}
                                            </span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-accent" />
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No new types recorded." />
                        )}
                    </DataSection>
                </div>

                <section>
                    <div className="flex items-center gap-6 mb-12">
                        <div className={`w-12 h-12 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center`}>
                            <History className={`w-6 h-6 ${theme.text}`} />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-text-muted uppercase tracking-[0.4em] leading-none mb-2">Version Architecture</h2>
                            <h3 className="text-3xl font-black text-text-primary uppercase tracking-tighter">Version Groups</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {gen.version_groups.map(vg => (
                            <Link
                                key={vg.name}
                                href={`/games/version-groups/${vg.name}`}
                                className="group bg-bg-secondary/40 backdrop-blur-md border border-border/50 p-8 rounded-[32px] hover:border-accent/40 hover:bg-bg-tertiary transition-all flex flex-col justify-between h-40"
                            >
                                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme.text} opacity-60`}>GROUP</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-black text-text-primary uppercase tracking-tighter">{vg.name.replace(/-/g, " ")}</span>
                                    <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
