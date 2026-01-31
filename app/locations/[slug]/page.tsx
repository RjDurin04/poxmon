import { getLocationDetail, getLocationArea } from "@/lib/api";
import Link from "next/link";
import {
    MapPin,
    ArrowLeft,
    Compass,
    Navigation,
    History,
    MoveUpRight,
    Search,
    Map as MapIcon,
    Layers,
    Globe
} from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ area?: string }>;
}

export default async function LocationDetailPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const { area: selectedAreaName } = await searchParams;
    const location = await getLocationDetail(slug);

    // Fetch detailed area data for the selected area or the first one
    const activeAreaName = selectedAreaName || (location.areas.length > 0 ? location.areas[0].name : null);
    const mainArea = activeAreaName ? await getLocationArea(activeAreaName) : null;

    const englishName = location.names.find(n => n.language.name === "en")?.name || location.name;

    return (
        <div className="min-h-screen bg-bg-primary pb-20">
            {/* Immersive Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />

                <div className="max-w-7xl mx-auto relative px-4 md:px-0">
                    {location.region && (
                        <Link
                            href={`/regions/${location.region.name}`}
                            className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-12"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-black uppercase tracking-widest text-[10px]">Back to {location.region.name} Region</span>
                        </Link>
                    )}

                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-accent text-white">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-border bg-bg-secondary text-text-primary">
                                    POI - {location.id}
                                </span>
                            </div>
                            <h1 className="text-6xl md:text-9xl font-black text-text-primary capitalize tracking-tighter mb-6">
                                {englishName}
                            </h1>
                            <div className="flex flex-wrap gap-4">
                                {location.region && (
                                    <Link
                                        href={`/regions/${location.region.name}`}
                                        className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-xl hover:bg-bg-tertiary transition-colors"
                                    >
                                        <Globe className="w-4 h-4 text-accent" />
                                        <span className="text-xs font-black text-text-primary uppercase tracking-tight">{location.region.name}</span>
                                    </Link>
                                )}
                                <div className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-border rounded-xl">
                                    <Layers className="w-4 h-4 text-accent" />
                                    <span className="text-xs font-black text-text-primary uppercase tracking-tight">{location.areas.length} Distinct Areas</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block bg-bg-secondary/40 backdrop-blur-xl p-8 rounded-[32px] border border-border shadow-2xl max-w-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Compass className="w-4 h-4 text-accent" />
                                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Survey Status</span>
                            </div>
                            <p className="text-sm text-text-secondary font-medium italic">
                                &quot;Geographic surveys of {englishName} show a diverse ecological structure with {location.areas.length} registered sub-areas.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Geography */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Sub-Areas */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-bg-secondary rounded-[32px] p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-10">
                                <Navigation className="w-5 h-5 text-accent" />
                                <h2 className="text-xs font-black uppercase tracking-widest text-text-primary">Regional Sub-Areas</h2>
                            </div>

                            <div className="space-y-4">
                                {location.areas.map((area) => (
                                    <Link
                                        key={area.name}
                                        href={`?area=${area.name}`}
                                        className={`p-5 border rounded-2xl block transition-all group ${activeAreaName === area.name
                                                ? "bg-accent/10 border-accent/40 shadow-sm shadow-accent/10"
                                                : "bg-bg-tertiary border-border hover:border-accent/40"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${activeAreaName === area.name ? "bg-accent text-white" : "bg-accent/5 text-accent"
                                                }`}>
                                                {activeAreaName === area.name ? "Active" : "Surveyed"}
                                            </span>
                                            <MoveUpRight className={`w-4 h-4 transition-colors ${activeAreaName === area.name ? "text-accent" : "text-text-muted group-hover:text-accent"
                                                }`} />
                                        </div>
                                        <span className={`text-lg font-black capitalize tracking-tight leading-none block transition-colors ${activeAreaName === area.name ? "text-accent" : "text-text-primary group-hover:text-accent"
                                            }`}>
                                            {area.name.replace(/-/g, " ")}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Survey Metadata */}
                        <div className="bg-bg-secondary rounded-[32px] p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <History className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Survey Log</h2>
                            </div>
                            <div className="space-y-4">
                                {location.game_indices.map((idx, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                                        <span className="text-[10px] font-black text-text-muted uppercase">{idx.generation.name.replace(/-/g, " ")}</span>
                                        <span className="text-xs font-black text-text-primary font-mono tracking-tighter">REF-{idx.game_index.toString().padStart(4, '0')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Encounter Data */}
                    <div className="lg:col-span-2 space-y-12">
                        {mainArea ? (
                            <div className="space-y-12">
                                {/* Sample Encounters */}
                                <div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 rounded-2xl bg-bg-secondary border border-border">
                                            <Search className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-text-muted leading-tight">Biological Audit</h2>
                                            <h3 className="text-3xl font-black text-text-primary tracking-tighter">
                                                Species in {mainArea.name.replace(/-/g, " ")}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {mainArea.pokemon_encounters.slice(0, 12).map((enc) => (
                                            <Link
                                                key={enc.pokemon.name}
                                                href={`/pokemon/${enc.pokemon.name}`}
                                                className="group p-6 bg-bg-secondary border border-border rounded-[28px] hover:border-accent/40 hover:bg-bg-tertiary transition-all flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="w-16 h-16 rounded-2xl bg-bg-tertiary border border-border flex items-center justify-center p-2 group-hover:scale-110 transition-transform relative overflow-hidden">
                                                        <img
                                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${enc.pokemon.url.split("/").filter(Boolean).pop()}.png`}
                                                            alt={enc.pokemon.name}
                                                            className="w-12 h-12 object-contain relative z-10"
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${enc.pokemon.url.split("/").filter(Boolean).pop()}.png`;
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-black text-text-primary capitalize tracking-tight group-hover:text-accent transition-colors">
                                                            {enc.pokemon.name}
                                                        </h4>
                                                        <div className="flex gap-2 mt-1">
                                                            {enc.version_details[0].encounter_details.slice(0, 1).map((detail, idx) => (
                                                                <span key={idx} className="text-[10px] font-black text-text-muted uppercase tracking-widest bg-bg-primary px-2 py-0.5 rounded border border-border">
                                                                    {detail.method.name.replace(/-/g, " ")}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-black text-text-primary font-mono">{enc.version_details[0].encounter_details[0].chance}%</div>
                                                    <div className="text-[8px] font-black text-text-muted uppercase tracking-tighter">Occurrence</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {mainArea.pokemon_encounters.length > 12 && (
                                        <div className="mt-8 text-center">
                                            <span className="text-xs font-black text-text-muted uppercase tracking-widest">+ {mainArea.pokemon_encounters.length - 12} additional species documented</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="p-12 rounded-[40px] border border-border border-dashed flex flex-col items-center justify-center text-center">
                                <MapIcon className="w-12 h-12 text-text-muted mb-4 opacity-20" />
                                <h3 className="text-xl font-black text-text-muted uppercase tracking-tighter">No Biological Data</h3>
                                <p className="text-sm text-text-muted italic max-w-xs mt-2">
                                    No ecological surveys have been registered for this specific territorial domain.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
