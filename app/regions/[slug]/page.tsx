import { getRegionDetail } from "@/lib/api";
import Link from "next/link";
import {
    Hash,
    Scan,
    BookOpen,
    Database,
    ShieldCheck,
    ArrowUpRight,
    Cpu,
    Activity,
    MapPin,
    Globe2
} from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function RegionDetailPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const { page } = await searchParams;
    const region = await getRegionDetail(slug);
    const englishName = region.names.find((n) => n.language.name === "en")?.name ?? region.name;

    const itemsPerPage = 10;
    const currentPage = parseInt(page || "1");
    const totalPages = Math.ceil(region.locations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = region.locations.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white overflow-x-hidden relative">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[5%] left-[10%] w-[50%] h-[50%] bg-accent/5 blur-[150px] rounded-full opacity-20" />
                <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-accent/5 blur-[150px] rounded-full opacity-10" />
            </div>

            {/* Navigation */}
            <div className="fixed top-28 left-6 sm:left-12 z-[110]">
                <BackButton variant="floating" label="Registry" fallbackPath="/regions" />
            </div>

            {/* Header: Jurisdictional Identification */}
            <header className="relative z-20 pt-32 sm:pt-48 pb-12 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                    {/* Background Label */}
                    <span className="text-[5rem] sm:text-[8rem] lg:text-[14rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1] uppercase">
                        REGION
                    </span>

                    <div className="flex items-center gap-4 mb-6 flex-wrap justify-center lg:justify-start">
                        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_currentColor]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                            Jurisdictional Registry Module
                        </span>
                        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_currentColor]" />
                    </div>

                    <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl text-text-primary">
                        {englishName}
                    </h1>

                    <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                        <span className="px-6 py-2.5 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest text-text-primary flex items-center gap-2">
                            <Hash className="w-3.5 h-3.5 text-accent" />
                            REGISTRY ID: {region.id.toString().padStart(3, '0')}
                        </span>

                        <span className="px-6 py-2.5 rounded-2xl bg-accent/10 border border-accent/20 text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5" />
                            ERA: {region.main_generation.name.replace("generation-", "").toUpperCase()}
                        </span>

                        <span className="px-6 py-2.5 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5" />
                            {region.locations.length} TARGET POIs
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-32 space-y-16">

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* 1. Territorial POI Manifest (Left/Main Column) */}
                    <div id="sector-mapping" className="lg:col-span-8 space-y-8 scroll-mt-32">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-bg-secondary border border-border">
                                    <Scan className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-text-muted leading-tight">Sector Mapping</h2>
                                    <h3 className="text-3xl font-black text-text-primary tracking-tighter">Point of Interest Manifest</h3>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {paginatedItems.map((loc) => (
                                <Link
                                    key={loc.name}
                                    href={`/locations/${loc.name}`}
                                    className="p-6 bg-bg-secondary/40 border border-border/40 rounded-[2.5rem] hover:border-accent/40 hover:bg-bg-tertiary/40 transition-all duration-300 group/loc relative overflow-hidden block"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover/loc:opacity-5 transition-opacity">
                                        <MapPin className="w-16 h-16" />
                                    </div>
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-bg-tertiary border border-border flex items-center justify-center group-hover/loc:bg-accent group-hover/loc:text-white transition-all duration-500 shadow-sm group-hover/loc:shadow-accent/20">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-0.5">POI IDENTIFIED</span>
                                                <span className="text-xl font-black text-text-primary capitalize tracking-tight group-hover/loc:text-accent transition-colors">
                                                    {loc.name.replace(/-/g, " ")}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-bg-primary/50 border border-white/5 flex items-center justify-center opacity-0 group-hover/loc:opacity-100 transition-all">
                                            <ArrowUpRight className="w-4 h-4 text-accent" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination Control */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-8">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <Link
                                        key={p}
                                        href={`?page=${p}#sector-mapping`}
                                        className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all border",
                                            currentPage === p
                                                ? "bg-accent border-accent text-white shadow-lg shadow-accent/20"
                                                : "bg-bg-secondary border-border/50 text-text-muted hover:border-accent/40 hover:text-accent"
                                        )}
                                    >
                                        {p.toString().padStart(2, '0')}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 2. System Modules & Versions (Right Column) */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Biological Directories (Poxmon) */}
                        <div className="p-8 rounded-[3rem] bg-bg-secondary/40 backdrop-blur-xl border border-border/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                <BookOpen className="w-32 h-32 rotate-12" />
                            </div>

                            <div className="flex items-center gap-3 mb-10">
                                <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
                                    <Database className="w-5 h-5 text-accent" />
                                </div>
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Data Directories</h2>
                            </div>

                            <div className="space-y-4">
                                {region.pokedexes.map((dex) => (
                                    <Link
                                        key={dex.name}
                                        href={`/poxmon/${dex.name}`}
                                        className="p-6 bg-bg-tertiary/40 border border-border/30 rounded-3xl hover:border-accent/40 transition-all group/dex block relative overflow-hidden"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em] bg-accent/5 px-3 py-1 rounded-full border border-accent/10 transition-colors group-hover/dex:bg-accent group-hover/dex:text-white">Active Source</span>
                                            <ShieldCheck className="w-4 h-4 text-text-muted transition-colors group-hover/dex:text-accent" />
                                        </div>
                                        <div className="text-xl font-black text-text-primary capitalize tracking-tighter group-hover/dex:text-accent transition-colors">
                                            {dex.name.replace(/-/g, " ")}
                                        </div>

                                        <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Integrity: 100%</span>
                                            </div>
                                            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover/dex:translate-x-0.5 group-hover/dex:-translate-y-0.5 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Version Groups (Architecture) */}
                        <div className="p-8 rounded-[3rem] bg-bg-secondary/20 border border-border/50">
                            <div className="flex items-center gap-3 mb-10">
                                <Activity className="w-5 h-5 text-text-muted" />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">System Architecture</h2>
                            </div>
                            <div className="space-y-3">
                                {region.version_groups.map((vg, i) => (
                                    <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-bg-tertiary/20 border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-border" />
                                            <span className="text-sm font-black text-text-secondary uppercase tracking-tighter">{vg.name.replace(/-/g, " ")}</span>
                                        </div>
                                        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">v.0{region.id}.{i}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Jurisdictional Summary */}
                        <div className="p-8 rounded-[3rem] bg-accent text-white shadow-2xl shadow-accent/20 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                            <div className="absolute -bottom-8 -right-8 opacity-20 group-hover:rotate-12 transition-transform duration-1000">
                                <Globe2 className="w-48 h-48" />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-70">Sector Status</h4>
                                <p className="text-2xl font-black uppercase tracking-tighter leading-tight mb-8">This domain represents a primary {region.main_generation.name.replace(/-/g, " ")} territory.</p>
                                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                                        <span>Registry Integrity</span>
                                        <span>OPTIMAL</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-full shadow-[0_0_10px_white]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
