import { getTypeDetail } from "@/lib/api";
import Link from "next/link";
import {
    ArrowLeft,
    Swords,
    Shield,
    Zap,
    ShieldAlert,
    History,
    Sword
} from "lucide-react";
import { GenericPokemonCarousel } from "@/components/GenericPokemonCarousel";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const TYPE_THEMES: Record<string, { color: string, border: string, bg: string, accent: string }> = {
    normal: { color: "text-gray-400", border: "border-gray-500/20", bg: "bg-gray-500/10", accent: "bg-gray-500" },
    fire: { color: "text-red-500", border: "border-red-500/20", bg: "bg-red-500/10", accent: "bg-red-500" },
    water: { color: "text-blue-500", border: "border-blue-500/20", bg: "bg-blue-500/10", accent: "bg-blue-500" },
    electric: { color: "text-yellow-400", border: "border-yellow-400/20", bg: "bg-yellow-400/10", accent: "bg-yellow-400" },
    grass: { color: "text-green-500", border: "border-green-500/20", bg: "bg-green-500/10", accent: "bg-green-500" },
    ice: { color: "text-cyan-400", border: "border-cyan-400/20", bg: "bg-cyan-400/10", accent: "bg-cyan-400" },
    fighting: { color: "text-orange-600", border: "border-orange-600/20", bg: "bg-orange-600/10", accent: "bg-orange-600" },
    poison: { color: "text-purple-500", border: "border-purple-500/20", bg: "bg-purple-500/10", accent: "bg-purple-500" },
    ground: { color: "text-amber-600", border: "border-amber-600/20", bg: "bg-amber-600/10", accent: "bg-amber-600" },
    flying: { color: "text-indigo-400", border: "border-indigo-400/20", bg: "bg-indigo-400/10", accent: "bg-indigo-400" },
    psychic: { color: "text-pink-500", border: "border-pink-500/20", bg: "bg-pink-500/10", accent: "bg-pink-500" },
    bug: { color: "text-lime-500", border: "border-lime-500/20", bg: "bg-lime-500/10", accent: "bg-lime-500" },
    rock: { color: "text-stone-500", border: "border-stone-500/20", bg: "bg-stone-500/10", accent: "bg-stone-500" },
    ghost: { color: "text-purple-400", border: "border-purple-400/20", bg: "bg-purple-400/10", accent: "bg-purple-400" },
    dragon: { color: "text-violet-500", border: "border-violet-500/20", bg: "bg-violet-500/10", accent: "bg-violet-500" },
    dark: { color: "text-stone-400", border: "border-stone-400/20", bg: "bg-stone-400/10", accent: "bg-stone-400" },
    steel: { color: "text-slate-400", border: "border-slate-400/20", bg: "bg-slate-400/10", accent: "bg-slate-400" },
    fairy: { color: "text-pink-400", border: "border-pink-400/20", bg: "bg-pink-400/10", accent: "bg-pink-400" },
};

export default async function TypeDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const type = await getTypeDetail(slug);
    const { damage_relations, past_damage_relations } = type;

    const theme = TYPE_THEMES[type.name] || { color: "text-accent", border: "border-accent/20", bg: "bg-accent/10", accent: "bg-accent" };
    const hasPastRelations = past_damage_relations && past_damage_relations.length > 0;

    return (
        <div className="min-h-screen bg-bg-primary pb-20">
            {/* Immersive Header */}
            <div className="relative overflow-hidden pt-20 pb-16 px-4 md:px-8 border-b border-border">
                {/* Background Aura */}
                <div className={`absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-20 ${theme.bg}`} />
                <div className={`absolute -bottom-24 -right-24 w-96 h-96 blur-[120px] rounded-full opacity-10 ${theme.bg}`} />

                <div className="max-w-7xl mx-auto relative px-4 md:px-0">
                    <Link
                        href="/types"
                        className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Types</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-border shadow-sm bg-bg-secondary ${theme.color}`}>
                                    {type.name} Classification
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-text-primary capitalize tracking-tighter mb-4">
                                {type.name} <span className="text-text-muted/20">Type</span>
                            </h1>
                            <div className="flex flex-wrap gap-3 mb-6">
                                {type.move_damage_class && (
                                    <span className="flex items-center gap-2 px-3 py-1 bg-void-acid/10 border border-void-acid/20 rounded-lg text-[10px] font-black text-void-acid uppercase tracking-widest">
                                        <Sword className="w-3 h-3" /> {type.move_damage_class.name} Focus
                                    </span>
                                )}
                                <span className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-lg text-[10px] font-black text-accent uppercase tracking-widest">
                                    Introduced {type.generation.name.replace(/-/g, " ")}
                                </span>
                            </div>
                            <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed italic opacity-80">
                                Detailed analysis of {type.name}-type elemental damage relations and biological occurrence.
                            </p>
                        </div>

                        <div className="flex items-center gap-6 bg-bg-secondary/50 backdrop-blur-md p-6 rounded-2xl border border-border shadow-xl">
                            <div className="text-center px-4">
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Taxon</div>
                                <div className="text-2xl font-black text-text-primary font-mono capitalize">{type.name.slice(0, 3)}</div>
                            </div>
                            <div className="w-px h-10 bg-border" />
                            <div className="text-center px-4">
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Species</div>
                                <div className="text-2xl font-black text-text-primary font-mono">{type.pokemon.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Offensive Matrix */}
                    <div className="bg-bg-secondary rounded-3xl p-8 border border-border shadow-sm relative overflow-hidden group">
                        <Swords className="absolute top-8 right-8 w-24 h-24 text-red-500/5 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                        <div className="flex items-center gap-3 mb-10">
                            <Zap className="w-5 h-5 text-red-500" />
                            <h2 className="text-xs font-black uppercase tracking-widest text-text-primary">Offensive Matrix</h2>
                        </div>

                        <div className="space-y-10">
                            <MatchupGroup
                                title="2x Effectiveness"
                                subtitle="Double damage deal to:"
                                types={damage_relations.double_damage_to}
                                color="text-green-400"
                                bg="bg-green-500/10"
                                border="border-green-500/20"
                            />
                            <MatchupGroup
                                title="0.5x Effectiveness"
                                subtitle="Half damage dealt to:"
                                types={damage_relations.half_damage_to}
                                color="text-red-400"
                                bg="bg-red-500/10"
                                border="border-red-500/20"
                            />
                            <MatchupGroup
                                title="0x Effectiveness"
                                subtitle="No damage dealt to:"
                                types={damage_relations.no_damage_to}
                                color="text-text-muted"
                                bg="bg-bg-tertiary"
                                border="border-border"
                            />
                        </div>
                    </div>

                    {/* Defensive Matrix */}
                    <div className="bg-bg-secondary rounded-3xl p-8 border border-border shadow-sm relative overflow-hidden group">
                        <Shield className="absolute top-8 right-8 w-24 h-24 text-blue-500/5 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                        <div className="flex items-center gap-3 mb-10">
                            <ShieldAlert className="w-5 h-5 text-blue-500" />
                            <h2 className="text-xs font-black uppercase tracking-widest text-text-primary">Defensive Matrix</h2>
                        </div>

                        <div className="space-y-10">
                            <MatchupGroup
                                title="2x Vulnerability"
                                subtitle="Double damage received from:"
                                types={damage_relations.double_damage_from}
                                color="text-red-400"
                                bg="bg-red-500/10"
                                border="border-red-500/20"
                            />
                            <MatchupGroup
                                title="0.5x Resistance"
                                subtitle="Half damage received from:"
                                types={damage_relations.half_damage_from}
                                color="text-green-400"
                                bg="bg-green-500/10"
                                border="border-green-500/20"
                            />
                            <MatchupGroup
                                title="0x Immunity"
                                subtitle="No damage received from:"
                                types={damage_relations.no_damage_from}
                                color="text-accent"
                                bg="bg-accent/10"
                                border="border-accent/20"
                            />
                        </div>
                    </div>
                </div>

                {/* Legacy Mutations Section */}
                {hasPastRelations && (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6 bg-amber-500/10 p-4 border-l-4 border-amber-500 rounded-r-xl">
                            <History className="w-5 h-5 text-amber-500" />
                            <div>
                                <h2 className="text-xs font-black uppercase tracking-widest text-text-primary">Past Damage Relations</h2>
                                <p className="text-[10px] text-text-muted font-bold">Historical variances in type effectiveness across generations</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {past_damage_relations.map((past, i) => (
                                <div key={i} className="bg-bg-secondary rounded-2xl p-6 border border-border/50">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                        Up to {past.generation.name.replace(/-/g, " ")}
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <MatchupGroup
                                                title="2x To"
                                                subtitle="Offensive"
                                                types={past.damage_relations.double_damage_to}
                                                color="text-green-400"
                                                bg="bg-green-500/5"
                                                border="border-green-500/10"
                                            />
                                            <MatchupGroup
                                                title="0.5x To"
                                                subtitle="Offensive"
                                                types={past.damage_relations.half_damage_to}
                                                color="text-red-400"
                                                bg="bg-red-500/5"
                                                border="border-red-500/10"
                                            />
                                        </div>
                                        <div className="space-y-6">
                                            <MatchupGroup
                                                title="2x From"
                                                subtitle="Defensive"
                                                types={past.damage_relations.double_damage_from}
                                                color="text-red-400"
                                                bg="bg-red-500/5"
                                                border="border-red-500/10"
                                            />
                                            <MatchupGroup
                                                title="0.5x From"
                                                subtitle="Defensive"
                                                types={past.damage_relations.half_damage_from}
                                                color="text-green-400"
                                                bg="bg-green-500/5"
                                                border="border-green-500/10"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Practitioners Section */}
                <GenericPokemonCarousel
                    title="Pokemon"
                    description="Pokemon with this type"
                    items={type.pokemon.map(p => ({ name: p.pokemon.name, url: p.pokemon.url }))}
                />
            </div>
        </div>
    );
}

function MatchupGroup({ title, subtitle, types, color, bg, border }: { title: string, subtitle: string, types: { name: string, url: string }[], color: string, bg: string, border: string }) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
                <div>
                    <h3 className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{title}</h3>
                    <p className="text-[10px] text-text-muted font-bold tracking-tight">{subtitle}</p>
                </div>
                <span className="text-[10px] font-black font-mono text-text-muted">{types.length}</span>
            </div>

            <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                    <Link
                        key={t.name}
                        href={`/types/${t.name}`}
                        className={`px-4 py-2 rounded-xl border ${border} ${bg} ${color} text-xs font-black capitalize hover:scale-105 active:scale-95 transition-all shadow-sm group/btn relative overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        {t.name}
                    </Link>
                ))}
                {types.length === 0 && (
                    <div className="px-4 py-2 rounded-xl bg-bg-tertiary/20 border border-border/50 text-text-muted text-[10px] font-bold uppercase tracking-widest italic">
                        Not Applicable
                    </div>
                )}
            </div>
        </div>
    );
}
