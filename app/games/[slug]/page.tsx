import { getGenerationDetail } from "@/lib/api";
import Link from "next/link";
import {
    ArrowLeft,
    Zap,
    Users,
    Map as MapIcon,
    Sword,
    Layers,
    History,
    ChevronRight,
    Cpu
} from "lucide-react";
import { GenericPokemonCarousel } from "@/components/GenericPokemonCarousel";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const GEN_THEMES: Record<string, { color: string, border: string, bg: string, text: string }> = {
    "generation-i": { color: "bg-red-600", border: "border-red-500/30", bg: "bg-red-500/10", text: "text-red-500" },
    "generation-ii": { color: "bg-amber-400", border: "border-amber-400/30", bg: "bg-amber-400/10", text: "text-amber-400" },
    "generation-iii": { color: "bg-indigo-600", border: "border-indigo-500/30", bg: "bg-indigo-500/10", text: "text-indigo-500" },
    "generation-iv": { color: "bg-cyan-600", border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-500" },
    "generation-v": { color: "bg-slate-800", border: "border-slate-500/30", bg: "bg-slate-500/10", text: "text-slate-400" },
    "generation-vi": { color: "bg-pink-600", border: "border-pink-500/30", bg: "bg-pink-500/10", text: "text-pink-500" },
    "generation-vii": { color: "bg-orange-500", border: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-500" },
    "generation-viii": { color: "bg-teal-600", border: "border-teal-500/30", bg: "bg-teal-500/10", text: "text-teal-500" },
    "generation-ix": { color: "bg-violet-600", border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-500" },
};

export default async function GenerationDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const gen = await getGenerationDetail(slug);
    const englishName = gen.names.find((n) => n.language.name === "en")?.name ?? gen.name;
    const theme = GEN_THEMES[gen.name] || { color: "bg-accent", border: "border-accent/30", bg: "bg-accent/10", text: "text-accent" };

    return (
        <div className="min-h-screen bg-bg-primary pb-24">
            {/* Immersive Era Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                {/* Era Background Symbol */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
                    <span className="text-[40rem] font-black leading-none">{gen.id}</span>
                </div>

                {/* Thematic Auras */}
                <div className={`absolute -top-48 -left-48 w-[500px] h-[500px] blur-[160px] rounded-full opacity-10 ${theme.color}`} />
                <div className={`absolute -bottom-48 -right-48 w-[500px] h-[500px] blur-[160px] rounded-full opacity-5 ${theme.color}`} />

                <div className="max-w-7xl mx-auto relative px-4 md:px-0">
                    <Link
                        href="/games"
                        className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-12"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-black uppercase tracking-widest text-[10px]">Games</span>
                    </Link>

                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-2 rounded-xl text-white shadow-2xl ${theme.color}`}>
                                    <Cpu className="w-5 h-5" />
                                </div>
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-border bg-bg-secondary text-text-primary">
                                    Historical Epoch
                                </span>
                            </div>
                            <h1 className="text-6xl md:text-9xl font-black text-text-primary uppercase tracking-tighter mb-6">
                                {englishName}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link
                                    href={`/locations/${gen.main_region.name}`}
                                    className="flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border rounded-2xl hover:border-accent/40 transition-all group/region"
                                >
                                    <MapIcon className={`w-4 h-4 ${theme.text}`} />
                                    <span className="text-xs font-black text-text-primary uppercase tracking-tight group-hover/region:text-accent transition-colors">
                                        Dominant Region: {gen.main_region.name}
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-text-muted group-hover/region:translate-x-1 transition-all" />
                                </Link>
                                <div className="flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border rounded-2xl">
                                    <History className={`w-4 h-4 ${theme.text}`} />
                                    <span className="text-xs font-black text-text-primary uppercase tracking-tight">
                                        Release Era: {gen.version_groups.length} Version Groups
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Era Stats Panel */}
                        <div className="flex items-center gap-4 bg-bg-secondary/40 backdrop-blur-xl p-6 rounded-[32px] border border-border shadow-2xl">
                            <EraMetric label="Species" count={gen.pokemon_species.length} />
                            <div className="w-px h-8 bg-border" />
                            <EraMetric label="Moves" count={gen.moves.length} />
                            <div className="w-px h-8 bg-border" />
                            <EraMetric label="Types" count={gen.types.length} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Era Content Manifest */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="space-y-20">

                    {/* New Species Manifest - Using Practitioner Carousel Logic */}
                    <div className="space-y-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center`}>
                                    <Users className={`w-6 h-6 ${theme.text}`} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-text-primary uppercase tracking-tighter">New Pokemon Species</h2>
                                    <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">All new species introduced in this generation</p>
                                </div>
                            </div>
                        </div>
                        <GenericPokemonCarousel
                            title="New Pokemon Species"
                            description="All new species introduced in this generation"
                            items={gen.pokemon_species.map(s => ({ name: s.name, url: s.url }))}
                        />
                    </div>

                    {/* Technical & Elemental Arsenal */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* New Moves Analysis */}
                        <div className="bg-bg-secondary rounded-[40px] p-10 border border-border shadow-sm group">
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-bg-tertiary border border-border group-hover:border-accent/40 transition-colors">
                                        <Sword className="w-6 h-6 text-accent" />
                                    </div>
                                    <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">New Moves</h3>
                                </div>
                                <span className="text-[10px] font-black text-text-muted bg-bg-tertiary px-4 py-1.5 rounded-full border border-border">
                                    {gen.moves.length} NEW MOVES
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {gen.moves.map((move) => (
                                    <Link
                                        key={move.name}
                                        href={`/moves/${move.name}`}
                                        className="p-3 rounded-xl bg-bg-tertiary/50 border border-transparent hover:border-accent/20 hover:bg-bg-tertiary transition-all group/move flex items-center justify-between"
                                    >
                                        <span className="text-xs font-bold text-text-secondary capitalize group-hover/move:text-text-primary transition-colors">
                                            {move.name.replace(/-/g, " ")}
                                        </span>
                                        <Zap className="w-3 h-3 text-text-muted opacity-0 group-hover/move:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Elemental Shifts */}
                        <div className="bg-bg-secondary rounded-[40px] p-10 border border-border shadow-sm group">
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-bg-tertiary border border-border group-hover:border-accent/40 transition-colors">
                                        <Layers className="w-6 h-6 text-accent" />
                                    </div>
                                    <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter">New Types</h3>
                                </div>
                                <span className="text-[10px] font-black text-text-muted bg-bg-tertiary px-4 py-1.5 rounded-full border border-border">
                                    {gen.types.length} INVOLVED
                                </span>
                            </div>

                            <div className="space-y-3">
                                {gen.types.map((type) => (
                                    <Link
                                        key={type.name}
                                        href={`/types/${type.name}`}
                                        className="flex items-center justify-between p-5 bg-bg-tertiary rounded-2xl border border-border hover:border-accent/40 transition-all group/type"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            <span className="text-sm font-black text-text-primary capitalize tracking-tight uppercase">
                                                {type.name}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-black text-text-muted group-hover/type:text-accent transition-colors">ANALYZE TYPE</span>
                                    </Link>
                                ))}
                                {gen.types.length === 0 && (
                                    <div className="p-10 text-center border-2 border-dashed border-border rounded-3xl opacity-50 italic text-sm">
                                        No new types introduced in this era.
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Versions & Connectivity */}
                    <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary p-12 rounded-[48px] border border-border shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">Version Groups</h3>
                                <h4 className="text-4xl font-black text-text-primary tracking-tighter mb-6 leading-tight">Version Groups &<br />Deployment Platforms</h4>
                                <p className="text-text-secondary leading-relaxed max-w-md opacity-80 italic">
                                    The software versions registered under this generation represent the various platforms and localized deployments of this era&apos;s engine.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {gen.version_groups.map(vg => (
                                    <div key={vg.name} className="px-6 py-4 bg-bg-primary border border-border rounded-[20px] shadow-sm hover:border-accent/20 transition-all flex items-center gap-3 group/vg">
                                        <div className={`w-2 h-2 rounded-full ${theme.color} opacity-40 group-hover/vg:opacity-100 transition-opacity`} />
                                        <span className="text-xs font-black text-text-primary uppercase tracking-widest">{vg.name.replace(/-/g, " ")}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function EraMetric({ label, count }: { label: string, count: number }) {
    return (
        <div className="text-center px-6">
            <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">{label}</div>
            <div className="text-2xl font-black text-text-primary font-mono tracking-tighter">{count}</div>
        </div>
    );
}
