import { getRegionList } from "@/lib/api";
import Link from "next/link";
import { Globe, MapPin, ChevronRight, Compass } from "lucide-react";

export default async function RegionsPage() {
    const regionList = await getRegionList(20, 0);

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />
                <div className="max-w-7xl mx-auto relative">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-accent text-white">
                            <Globe className="w-5 h-5" />
                        </div>
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-border bg-bg-secondary text-text-primary">
                            World Atlas
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-text-primary capitalize tracking-tighter mb-6 relative">
                        Global Regions
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl leading-relaxed italic opacity-80">
                        Explore the diverse geographical domains of the Pokémon universe, from the classic Kanto fields to the modern Paldea wilderness.
                    </p>
                </div>
            </div>

            {/* Region Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regionList.results.map((region) => (
                        <Link
                            key={region.name}
                            href={`/regions/${region.name}`}
                            className="group relative p-8 bg-bg-secondary border border-border rounded-[32px] hover:border-accent/50 hover:bg-bg-tertiary transition-all shadow-sm overflow-hidden"
                        >
                            <div className="absolute -top-4 -right-4 w-32 h-32 blur-3xl rounded-full bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative flex flex-col h-full">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-bg-tertiary border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                                        <Compass className="w-6 h-6" />
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-text-muted opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </div>

                                <h2 className="text-3xl font-black text-text-primary capitalize tracking-tighter mb-2">
                                    {region.name}
                                </h2>
                                <div className="mt-auto pt-6 border-t border-border/50 flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-3 h-3 text-accent" />
                                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Territorial Domain</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
