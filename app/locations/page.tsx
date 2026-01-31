import { getRegionList, getLocationList } from "@/lib/api";
import Link from "next/link";
import {
    Globe,
    MapPin,
    Map as MapIcon,
    ChevronRight,
    ArrowUpRight,
    Navigation,
    Compass
} from "lucide-react";

export default async function LocationsPage() {
    // Fetch some regions and initial locations
    const regionList = await getRegionList(20, 0);
    const initialLocations = await getLocationList(24, 0);

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Immersive Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />
                <div className="max-w-7xl mx-auto relative px-4 md:px-0">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-accent text-white">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-border bg-bg-secondary text-text-primary">
                            Locations
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black text-text-primary capitalize tracking-tighter mb-6">
                        Global Locations
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl leading-relaxed italic opacity-80">
                        A comprehensive survey of the Pokémon world&apos;s diverse landscapes, from urban centers to remote wilderness.
                    </p>
                </div>
            </div>

            {/* Geographical Hierarchy */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Region Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Globe className="w-4 h-4 text-accent" />
                                <h2 className="text-xs font-black uppercase tracking-widest text-text-primary">Regions</h2>
                            </div>
                            <div className="space-y-2">
                                {regionList.results.map(region => (
                                    <Link
                                        key={region.name}
                                        href={`/regions/${region.name}`}
                                        className="flex items-center justify-between p-4 rounded-2xl bg-bg-secondary border border-border hover:border-accent/40 hover:bg-bg-tertiary transition-all group"
                                    >
                                        <span className="text-sm font-black text-text-primary capitalize group-hover:text-accent transition-colors">{region.name}</span>
                                        <ChevronRight className="w-4 h-4 text-text-muted group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-[32px] bg-accent text-white shadow-2xl shadow-accent/20 relative overflow-hidden group">
                            <Compass className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 group-hover:rotate-45 transition-transform duration-700" />
                            <h3 className="text-xl font-black tracking-tight mb-2">Regional Data</h3>
                            <p className="text-sm font-medium opacity-80 leading-snug">Each region manifests unique ecological phenomena and evolutionary triggers.</p>
                        </div>
                    </div>

                    {/* Main Locations Grid */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-bg-secondary border border-border">
                                    <Navigation className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-text-muted leading-tight">Locations</h2>
                                    <h3 className="text-3xl font-black text-text-primary tracking-tighter">Points of Interest</h3>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {initialLocations.results.map((loc) => (
                                <Link
                                    key={loc.name}
                                    href={`/locations/${loc.name}`}
                                    className="p-6 bg-bg-secondary border border-border rounded-[28px] hover:border-accent/40 hover:bg-bg-tertiary transition-all group/card flex flex-col h-full relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-6 text-accent/5 pointer-events-none group-hover:scale-110 transition-transform">
                                        <MapIcon className="w-16 h-16" />
                                    </div>
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-bg-tertiary border border-border flex items-center justify-center group-hover/card:bg-accent group-hover/card:text-white transition-colors">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-text-muted opacity-0 group-hover/card:opacity-100 transition-all" />
                                    </div>
                                    <div className="mt-auto">
                                        <h4 className="text-xl font-black text-text-primary capitalize tracking-tight group-hover/card:text-accent transition-colors leading-tight mb-2">
                                            {loc.name.replace(/-/g, " ")}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <div className="h-0.5 w-6 bg-accent/30 group-hover:w-12 transition-all" />
                                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">ID_{loc.url.split("/").slice(-2)[0]}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <span className="text-xs font-black text-text-muted uppercase tracking-[0.2em]">End of list</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
