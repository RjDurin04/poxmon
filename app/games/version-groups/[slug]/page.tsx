import { getVersionGroup } from "@/lib/api";
import Link from "next/link";
import { Layers, Gamepad2, Map as MapIcon, ChevronRight, ArrowUpRight, Cpu, Database, Zap, Star } from "lucide-react";
import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function VersionGroupDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const group = await getVersionGroup(slug);

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white pb-24 font-sans overflow-x-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent-rgb)_0.5px,_transparent_0.5px)] bg-[size:64px_64px] opacity-[0.02]" />
                <div className={`absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary`} />
                <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-accent/5 blur-[160px] rounded-full" />
            </div>

            {/* Version Group Header */}
            <div className="relative z-10 pt-32 pb-24 px-4 md:px-8 border-b border-border/50 bg-bg-primary/20 backdrop-blur-md">
                <div className="max-w-7xl mx-auto">
                    <BackButton label="Generations" className="mb-12" />

                    <div className="flex flex-col md:flex-row items-start justify-between gap-12">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-2xl text-white">
                                    <Layers className="w-7 h-7" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Version Group</span>
                                        <div className="h-px w-8 bg-accent/30" />
                                    </div>
                                    <span className="text-xs font-black text-text-muted uppercase tracking-widest">Group ID: #{group.id.toString().padStart(3, '0')}</span>
                                </div>
                            </div>

                            <div className="relative">
                                {/* Decorative Background Label */}
                                <span className="text-[5rem] sm:text-[8rem] lg:text-[14rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1] uppercase">
                                    GAME
                                </span>

                                <h1 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] mb-10 select-none relative z-10">
                                    {group.name.split('-')[0]}<br />
                                    <span className="text-text-muted/20 outline-text">{group.name.split('-').slice(1).join(' ') || "GROUP"}</span>
                                </h1>
                            </div>

                            <p className="text-text-secondary text-xl leading-relaxed max-w-2xl font-medium italic opacity-80">
                                This grouping defines the core game mechanics, Pokedexes, and regional settings shared across its constituent game versions.
                            </p>
                        </div>

                        {/* Summary Stats */}
                        <div className="flex flex-col gap-4 w-full md:w-80">
                            <div className="bg-bg-secondary/40 backdrop-blur-xl border border-border p-6 rounded-[28px] shadow-xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-bg-primary border border-border/50">
                                        <Database className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Pokedexes</span>
                                        <span className="text-lg font-black text-text-primary leading-none">{group.pokedexes.length} Databases</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-text-muted" />
                            </div>
                            <div className="bg-bg-secondary/40 backdrop-blur-xl border border-border p-6 rounded-[28px] shadow-xl flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-bg-primary border border-border/50">
                                        <Zap className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Move Learning</span>
                                        <span className="text-lg font-black text-text-primary leading-none">{group.move_learn_methods.length} Methods</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-text-muted" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Sections */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 pointer-events-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Versions & Regions Column */}
                    <div className="space-y-8">
                        {/* Included Versions */}
                        <div className="bg-bg-secondary/40 backdrop-blur-xl rounded-[40px] p-8 border border-border/50 group hover:border-accent/20 transition-all shadow-xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3.5 rounded-2xl bg-bg-primary border border-border shadow-inner">
                                    <Gamepad2 className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] leading-none mb-1.5">Releases</h3>
                                    <h4 className="text-xl font-black text-text-primary uppercase tracking-tighter">Included Versions</h4>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {group.versions.map(v => (
                                    <Link
                                        key={v.name}
                                        href={`/games/versions/${v.name}`}
                                        className="group/item flex items-center justify-between p-4 bg-bg-primary border border-border/50 rounded-2xl hover:border-accent/40 hover:bg-bg-tertiary transition-all"
                                    >
                                        <span className="text-xs font-black text-text-secondary uppercase tracking-widest group-hover/item:text-text-primary transition-colors">{v.name.replace(/-/g, " ")}</span>
                                        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover/item:text-accent transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Regions Card */}
                        <div className="bg-bg-secondary/40 backdrop-blur-xl rounded-[40px] p-8 border border-border/50 group hover:border-accent/20 transition-all shadow-xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3.5 rounded-2xl bg-bg-primary border border-border shadow-inner">
                                    <MapIcon className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] leading-none mb-1.5">Geography</h3>
                                    <h4 className="text-xl font-black text-text-primary uppercase tracking-tighter">Available Regions</h4>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {group.regions.map(r => (
                                    <Link
                                        key={r.name}
                                        href={`/regions/${r.name}`}
                                        className="group/item flex items-center justify-between p-4 bg-bg-primary border border-border/50 rounded-2xl hover:border-accent/40 hover:bg-bg-tertiary transition-all"
                                    >
                                        <span className="text-xs font-black text-text-secondary uppercase tracking-widest group-hover/item:text-text-primary transition-colors">{r.name.replace(/-/g, " ")}</span>
                                        <ArrowUpRight className="w-4 h-4 text-text-muted group-hover/item:text-accent transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Details Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Generation Details */}
                        <div className="bg-bg-secondary/40 backdrop-blur-xl rounded-[40px] p-10 border border-border relative overflow-hidden group shadow-2xl">
                            <Cpu className="absolute -top-10 -right-10 w-64 h-64 text-accent/5 -rotate-12 group-hover:text-accent/10 transition-colors" />
                            <div className="relative">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="p-4 rounded-2xl bg-accent text-white shadow-lg shadow-accent/20">
                                        <Cpu className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-text-primary uppercase tracking-tighter">Generation Details</h3>
                                        <p className="text-xs text-text-muted font-medium italic">Shared mechanical parameters for this version group.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-8 bg-bg-primary border border-border/50 rounded-[32px] hover:border-accent/30 transition-all group/stat">
                                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2 group-hover/stat:text-accent transition-colors">Pokedex Access</span>
                                        <div className="text-3xl font-black text-text-primary tracking-tighter">{group.pokedexes.length} Pokedex Databases</div>
                                    </div>
                                    <div className="p-8 bg-bg-primary border border-border/50 rounded-[32px] hover:border-accent/30 transition-all group/stat">
                                        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest block mb-2 group-hover/stat:text-accent transition-colors">Movement & Evolution</span>
                                        <div className="text-3xl font-black text-text-primary tracking-tighter">{group.move_learn_methods.length} Learn Methods</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Move Learn Methods */}
                        <div className="bg-bg-secondary/40 backdrop-blur-xl rounded-[40px] p-10 border border-border/50 shadow-xl">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-3.5 rounded-2xl bg-bg-primary border border-border">
                                    <Star className="w-6 h-6 text-accent" />
                                </div>
                                <h2 className="text-xl font-black text-text-primary uppercase tracking-tighter">Move Learn Methods</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {group.move_learn_methods.map(m => (
                                    <div
                                        key={m.name}
                                        className="px-5 py-3 rounded-2xl bg-bg-primary border border-border text-[10px] font-black uppercase tracking-widest text-text-secondary shadow-sm"
                                    >
                                        {m.name.replace(/-/g, " ")}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
