import { getRegionDetail } from "@/lib/api";
import Link from "next/link";
import {
    Map as MapIcon,
    ArrowLeft,
    Navigation,
    Gamepad2,
    BookOpen,
    Globe,
    MapPin,
    ArrowUpRight
} from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function RegionDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const region = await getRegionDetail(slug);
    const englishName = region.names.find((n) => n.language.name === "en")?.name ?? region.name;

    return (
        <div className="min-h-screen bg-bg-primary pb-20">
            {/* Immersive Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent)_1px,_transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* Accent Auras */}
                <div className="absolute -top-48 -left-48 w-96 h-96 blur-[160px] rounded-full opacity-10 bg-accent" />
                <div className="absolute top-1/2 -right-48 w-96 h-96 blur-[160px] rounded-full opacity-5 bg-accent" />

                <div className="max-w-7xl mx-auto relative px-4 md:px-0">
                    <Link
                        href="/regions"
                        className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-12"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-black uppercase tracking-widest text-[10px]">Regions</span>
                    </Link>

                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-accent text-white shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-border bg-bg-secondary text-text-primary">
                                    Region Details
                                </span>
                            </div>
                            <h1 className="text-6xl md:text-9xl font-black text-text-primary capitalize tracking-tighter mb-6 relative">
                                {englishName}
                                <span className="absolute -top-6 -right-12 text-sm font-mono text-accent opacity-40 rotate-12">REG-{region.id.toString().padStart(3, '0')}</span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-xl">
                                    <Gamepad2 className="w-4 h-4 text-accent" />
                                    <span className="text-xs font-black text-text-primary uppercase tracking-tight">
                                        {region.main_generation.name.replace("generation-", "GEN ")}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-xl">
                                    <Navigation className="w-4 h-4 text-accent" />
                                    <span className="text-xs font-black text-text-primary uppercase tracking-tight">
                                        {region.locations.length} Points of Interest
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 bg-bg-secondary/40 backdrop-blur-xl p-8 rounded-[32px] border border-border shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent transition-opacity" />
                            <div className="text-center">
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2 px-2">Data Integrity</div>
                                <div className="text-3xl font-black text-text-primary font-mono tracking-tighter bg-bg-tertiary px-6 py-2 rounded-2xl border border-border">99.8%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Geography */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Locations Manifest */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-bg-secondary border border-border">
                                    <MapIcon className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-text-muted">Locations</h2>
                                    <h3 className="text-3xl font-black text-text-primary tracking-tighter">Locations in Region</h3>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {region.locations.map((loc) => (
                                <Link
                                    key={loc.name}
                                    href={`/locations/${loc.name}`}
                                    className="p-6 bg-bg-secondary border border-border rounded-[24px] hover:border-accent/40 hover:bg-bg-tertiary transition-all group/loc"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-bg-tertiary border border-border flex items-center justify-center group-hover/loc:bg-accent group-hover/loc:text-white transition-colors">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <span className="text-lg font-black text-text-primary capitalize tracking-tight group-hover/loc:text-accent transition-colors">
                                                {loc.name.replace(/-/g, " ")}
                                            </span>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-text-muted opacity-0 group-hover/loc:opacity-100 transition-all" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Regional Assets */}
                    <div className="space-y-8">
                        {/* Pokedexes */}
                        <div className="bg-bg-secondary rounded-[32px] p-8 border border-border shadow-sm flex flex-col gap-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 text-accent/5 pointer-events-none">
                                <BookOpen className="w-24 h-24 rotate-12" />
                            </div>

                            <div>
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-text-muted mb-2">Regional Pokedexes</h2>
                                <h3 className="text-2xl font-black text-text-primary tracking-tighter">Available Pokedexes</h3>
                            </div>

                            <div className="space-y-3">
                                {region.pokedexes.map((dex) => (
                                    <Link
                                        key={dex.name}
                                        href={`/pokedex/${dex.name}`}
                                        className="p-5 bg-bg-tertiary border border-border rounded-[24px] hover:border-accent/20 transition-all group/dex block text-left"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-black text-accent uppercase tracking-widest bg-accent/5 px-3 py-1 rounded-full border border-accent/10">Regional</span>
                                            <BookOpen className="w-4 h-4 text-text-muted" />
                                        </div>
                                        <div className="text-lg font-black text-text-primary capitalize tracking-tight group-hover/dex:text-accent transition-colors">
                                            {dex.name.replace(/-/g, " ")}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                                            <span className="text-[10px] font-black text-text-muted uppercase">Terminal access</span>
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Additional Meta */}
                        <div className="bg-gradient-to-br from-accent to-accent-hover rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden shadow-accent/20">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                            <div className="relative">
                                <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">Region Integrity</h4>
                                <p className="text-lg font-bold leading-tight mb-6">This region represents a major biological domain in the {region.main_generation.name.replace(/-/g, " ")} era.</p>
                                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-full opacity-60" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
