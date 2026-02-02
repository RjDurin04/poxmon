import { getLocationDetail, getLocationArea } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import {
    Navigation, History, Search, Map as MapIcon, Layers, Globe, Hash, Scan, BarChart3, Radar
} from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ area?: string }>;
}

export default async function LocationDetailPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const { area: selectedAreaName } = await searchParams;
    const location = await getLocationDetail(slug);

    // Fetch detailed area data
    const activeAreaName = selectedAreaName || (location.areas.length > 0 ? location.areas[0].name : null);
    const mainArea = activeAreaName ? await getLocationArea(activeAreaName) : null;

    const englishName = location.names.find(n => n.language.name === "en")?.name || location.name;

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white overflow-x-hidden relative">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[20%] w-[60%] h-[60%] bg-accent/5 blur-[120px] rounded-full opacity-30" />
                <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full opacity-20" />
            </div>

            {/* Navigation */}
            <div className="fixed top-28 left-6 sm:left-12 z-[110]">
                <BackButton variant="floating" label="Registry" fallbackPath="/locations" />
            </div>

            {/* Header: Sector Identification */}
            <header className="relative z-20 pt-32 sm:pt-48 pb-12 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                    {/* Background Label */}
                    <span className="text-[5rem] sm:text-[8rem] lg:text-[14rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1] uppercase">
                        LOCATION
                    </span>

                    <div className="flex items-center gap-4 mb-6 flex-wrap justify-center lg:justify-start">
                        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_currentColor]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                            Geospatial Registry Module
                        </span>
                        <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_currentColor]" />
                    </div>

                    <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-8 drop-shadow-2xl text-text-primary">
                        {englishName}
                    </h1>

                    <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                        <span className="px-6 py-2.5 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest text-text-primary flex items-center gap-2">
                            <Hash className="w-3.5 h-3.5 text-accent" />
                            POI INDEX: {location.id.toString().padStart(4, '0')}
                        </span>

                        {location.region && (
                            <Link
                                href={`/regions/${location.region.name}`}
                                className="px-6 py-2.5 rounded-2xl bg-accent/10 border border-accent/20 text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2 hover:bg-accent/20 transition-colors"
                            >
                                <Globe className="w-3.5 h-3.5" />
                                JURISDICTION: {location.region.name}
                            </Link>
                        )}

                        <span className="px-6 py-2.5 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                            <Layers className="w-3.5 h-3.5" />
                            {location.areas.length} SECTORS
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-32 space-y-16">

                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* 1. Territorial Sub-sectors (Left Column) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 rounded-[2.5rem] bg-bg-secondary/40 backdrop-blur-md border border-border/50 relative overflow-hidden group">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
                                    <Radar className="w-5 h-5 text-accent" />
                                </div>
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Territorial Sectors</h2>
                            </div>

                            <div className="space-y-3">
                                {location.areas.map((area) => (
                                    <Link
                                        key={area.name}
                                        href={`?area=${area.name}`}
                                        className={cn(
                                            "flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 group/item",
                                            activeAreaName === area.name
                                                ? "bg-accent/10 border-accent/30"
                                                : "bg-bg-tertiary/40 border-transparent hover:border-accent/20 hover:bg-bg-tertiary/60"
                                        )}
                                    >
                                        <div className="flex flex-col">
                                            <span className={cn(
                                                "text-[9px] font-black uppercase tracking-widest mb-1",
                                                activeAreaName === area.name ? "text-accent" : "text-text-muted"
                                            )}>
                                                {activeAreaName === area.name ? "ACTIVE SCAN" : "REGISTERED"}
                                            </span>
                                            <span className={cn(
                                                "text-sm font-black uppercase tracking-tight capitalize",
                                                activeAreaName === area.name ? "text-text-primary" : "text-text-secondary"
                                            )}>
                                                {area.name.replace(/-/g, " ")}
                                            </span>
                                        </div>
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                            activeAreaName === area.name ? "bg-accent text-white scale-110 shadow-lg shadow-accent/20" : "bg-bg-secondary text-text-muted group-hover/item:text-accent"
                                        )}>
                                            <Scan className="w-4 h-4" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Survey Archive Log */}
                        <div className="p-8 rounded-[2.5rem] bg-bg-secondary/20 border border-border/50">
                            <div className="flex items-center gap-3 mb-8">
                                <History className="w-5 h-5 text-text-muted" />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Registry History</h2>
                            </div>
                            <div className="space-y-4">
                                {location.game_indices.map((idx, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                        <span className="text-[10px] font-black text-text-muted uppercase tracking-wider">{idx.generation.name.replace(/-/g, " ")}</span>
                                        <span className="text-xs font-black text-text-primary font-mono tracking-tighter">ID-{idx.game_index.toString().padStart(4, '0')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 2. Ecological Audit (Right Column) */}
                    <div className="lg:col-span-8 space-y-8">
                        {mainArea ? (
                            <div className="space-y-8">
                                {/* Area Summary / Scan HUD */}
                                <div className="p-8 sm:p-12 rounded-[3rem] bg-bg-secondary/30 border border-border/50 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-12 opacity-5">
                                        <MapIcon className="w-48 h-48 -rotate-12" />
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                                <span className="text-xs font-bold text-accent uppercase tracking-[0.3em]">Sector Audit: {mainArea.name.replace(/-/g, " ")}</span>
                                            </div>
                                            <h3 className="text-4xl sm:text-6xl font-black text-text-primary uppercase tracking-tighter leading-none">
                                                Ecological <span className="text-text-muted">Audit</span>
                                            </h3>
                                        </div>
                                        <div className="flex gap-6 px-8 py-6 rounded-3xl bg-black/20 border border-white/5 backdrop-blur-sm">
                                            <div className="text-center">
                                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Density</div>
                                                <div className="text-2xl font-black text-text-primary">{mainArea.pokemon_encounters.length}</div>
                                            </div>
                                            <div className="w-px h-10 bg-white/5" />
                                            <div className="text-center">
                                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Sector ID</div>
                                                <div className="text-2xl font-black text-text-primary">#{mainArea.id}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Surveyed Entities Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {mainArea.pokemon_encounters.map((enc) => {
                                            const pokemonId = enc.pokemon.url.split("/").filter(Boolean).pop();
                                            const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
                                            return (
                                                <Link
                                                    key={enc.pokemon.name}
                                                    href={`/pokemon/${enc.pokemon.name}`}
                                                    className="group flex items-center justify-between p-5 bg-bg-tertiary/20 border border-border/40 rounded-3xl hover:border-accent/40 hover:bg-bg-tertiary/40 transition-all duration-300"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-bg-tertiary rounded-xl flex items-center justify-center shrink-0 border border-border group-hover:border-accent/40 relative">
                                                            <Image
                                                                src={spriteUrl}
                                                                alt={enc.pokemon.name}
                                                                fill
                                                                className="object-contain p-1"
                                                                sizes="48px"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-lg font-black text-text-primary capitalize tracking-tight group-hover:text-accent transition-colors">
                                                                {enc.pokemon.name}
                                                            </h4>
                                                            <div className="flex gap-1.5 mt-1">
                                                                {enc.version_details[0].encounter_details.slice(0, 1).map((detail, idx) => (
                                                                    <span key={idx} className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] bg-bg-secondary/50 px-2 py-0.5 rounded border border-white/5">
                                                                        {detail.method.name.replace(/-/g, " ")}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm font-black text-text-primary font-mono">{enc.version_details[0].encounter_details[0].chance}%</div>
                                                        <div className="text-[8px] font-black text-text-muted uppercase tracking-tighter">Probability</div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    {mainArea.pokemon_encounters.length === 0 && (
                                        <div className="p-16 border border-dashed border-border/50 rounded-3xl flex flex-col items-center justify-center text-center opacity-50">
                                            <Search className="w-12 h-12 text-text-muted mb-4" />
                                            <p className="text-xs font-black uppercase tracking-widest">No organisms detected in scan</p>
                                        </div>
                                    )}
                                </div>

                                {/* Area Method Analysis */}
                                {mainArea.encounter_method_rates.length > 0 && (
                                    <div className="p-8 rounded-[3rem] bg-bg-secondary/20 border border-border/50">
                                        <div className="flex items-center gap-4 mb-10">
                                            <BarChart3 className="w-5 h-5 text-text-muted" />
                                            <h2 className="text-xs font-black uppercase tracking-[0.4em]">Methodology Acquisition</h2>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                            {mainArea.encounter_method_rates.map((method, idx) => (
                                                <div key={idx} className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-black text-text-primary uppercase tracking-tight">{method.encounter_method.name.replace(/-/g, " ")}</span>
                                                        <span className="text-[10px] font-mono text-text-muted">PROC-{idx}</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {method.version_details.map((v, i) => (
                                                            <div key={i} className="flex items-center justify-between text-[10px]">
                                                                <span className="text-text-muted uppercase font-bold">{v.version.name}</span>
                                                                <span className="text-text-primary font-black uppercase tracking-tighter">RATE: {v.rate}%</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-24 rounded-[3rem] border border-border border-dashed flex flex-col items-center justify-center text-center opacity-30">
                                <Binoculars className="w-12 h-12 text-text-muted mb-4" />
                                <h3 className="text-xl font-black uppercase tracking-tighter">Sector Offline</h3>
                                <p className="text-xs font-bold uppercase tracking-widest mt-2 max-w-xs">
                                    No ecological survey documentation found for this sector.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Regional Context Deployment */}
                {location.region && (
                    <section className="pt-12">
                        <div className="flex flex-col items-center text-center mb-16">
                            <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10 mb-6 group">
                                <Navigation className="w-6 h-6 text-accent group-hover:translate-y-[-2px] transition-transform" />
                            </div>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-text-muted">Jurisdiction Context</h2>
                            <p className="mt-4 text-3xl font-black text-text-primary uppercase tracking-tight">
                                Other Locations in <span className="text-accent">{location.region.name}</span>
                            </p>
                        </div>

                        <div className="p-1 rounded-[3.5rem] bg-gradient-to-b from-accent/10 to-transparent">
                            <div className="bg-bg-secondary/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-border/50">
                                <div className="text-center py-12">
                                    <Link
                                        href={`/regions/${location.region.name}`}
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/25"
                                    >
                                        <Globe className="w-5 h-5" />
                                        Access Region Registry
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
}

// Icon helper
function Binoculars(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 22a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8Z" />
            <path d="M15 22a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1Z" />
            <path d="M5 8V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
            <path d="M12 20v2" />
        </svg>
    )
}
