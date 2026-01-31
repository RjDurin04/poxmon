import { getVersionGroup } from "@/lib/api";
import Link from "next/link";
import { Layers, ArrowLeft, Gamepad2, Map as MapIcon, Target } from "lucide-react";

import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function VersionGroupDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const group = await getVersionGroup(slug);

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />

                <div className="relative max-w-7xl mx-auto">
                    <BackButton label="Back to Library" className="mb-8" />

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/5">
                                    <Layers className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Group ID #{group.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {group.name.replace(/-/g, " ")}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Core mechanical framework defining the rules, move-pools, and available species for this generation cluster.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Versions Column */}
                    <div className="space-y-6">
                        <div className="bg-bg-secondary rounded-3xl p-8 border border-border">
                            <div className="flex items-center gap-3 mb-6">
                                <Gamepad2 className="w-5 h-5 text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Included Versions</h2>
                            </div>
                            <div className="space-y-3">
                                {group.versions.map(v => (
                                    <Link
                                        key={v.name}
                                        href={`/games/versions/${v.name}`}
                                        className="flex items-center justify-between p-4 bg-bg-tertiary rounded-2xl border border-border hover:border-accent group transition-all"
                                    >
                                        <span className="text-sm font-bold text-text-secondary capitalize group-hover:text-accent transition-colors">{v.name.replace(/-/g, " ")}</span>
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowLeft className="w-3 h-3 text-accent rotate-180" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="bg-bg-secondary rounded-3xl p-8 border border-border">
                            <div className="flex items-center gap-3 mb-6">
                                <MapIcon className="w-5 h-5 text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Regional Coverage</h2>
                            </div>
                            <div className="space-y-3">
                                {group.regions.map(r => (
                                    <Link
                                        key={r.name}
                                        href={`/regions/${r.name}`}
                                        className="flex items-center justify-between p-4 bg-bg-tertiary rounded-2xl border border-border hover:border-accent group transition-all"
                                    >
                                        <span className="text-sm font-bold text-text-secondary capitalize group-hover:text-accent transition-colors">{r.name.replace(/-/g, " ")}</span>
                                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowLeft className="w-3 h-3 text-accent rotate-180" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-bg-secondary rounded-3xl p-10 border border-border relative overflow-hidden">
                            <Layers className="absolute top-10 right-10 w-32 h-32 text-accent/5 -rotate-12" />
                            <h2 className="text-xl font-black text-text-primary mb-6 uppercase tracking-tight">Mechanical Integrity</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-bg-tertiary rounded-2xl border border-border">
                                    <span className="text-[10px] font-black text-text-muted uppercase block mb-1">Pokedex Access</span>
                                    <div className="text-xl font-black text-text-primary capitalize">{group.pokedexes.length} Databases</div>
                                </div>
                                <div className="p-6 bg-bg-tertiary rounded-2xl border border-border">
                                    <span className="text-[10px] font-black text-text-muted uppercase block mb-1">Technique Methods</span>
                                    <div className="text-xl font-black text-text-primary capitalize">{group.move_learn_methods.length} Methods</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-bg-secondary rounded-3xl p-10 border border-border">
                            <div className="flex items-center gap-3 mb-8">
                                <Target className="w-6 h-6 text-accent" />
                                <h2 className="text-lg font-black text-text-primary">Evolution Triggers</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {group.move_learn_methods.map(m => (
                                    <Link
                                        key={m.name}
                                        href={`/moves/learn-methods/${m.name}`}
                                        className="px-4 py-2 rounded-xl bg-bg-tertiary border border-border text-xs font-bold text-text-secondary hover:text-accent hover:border-accent transition-all capitalize"
                                    >
                                        {m.name.replace(/-/g, " ")}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
