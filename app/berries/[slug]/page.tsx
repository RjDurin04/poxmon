import { getBerryDetail, getItemDetail } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    Wind,
    Droplets,
    Maximize2,
    Sparkles,
    Info,
    Grape,
    Swords,
    ChevronRight,
    Activity,
    FileText
} from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BerryDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const berry = await getBerryDetail(slug);
    const item = await getItemDetail(berry.item.name);

    return (
        <div className="min-h-screen bg-bg-primary pb-20">
            {/* Immersive Header */}
            <div className="relative overflow-hidden pt-20 pb-16 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-green-500" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 blur-[120px] rounded-full opacity-5 bg-green-500" />

                <div className="max-w-7xl mx-auto relative px-4 md:px-0">
                    <Link
                        href="/berries"
                        className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Berries</span>
                    </Link>

                    <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
                        {/* Berry Sprite Card */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-green-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative w-48 h-48 bg-bg-secondary rounded-3xl border border-border shadow-2xl flex items-center justify-center p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                                {item.sprites.default ? (
                                    <div className="relative w-32 h-32 scale-150">
                                        <Image
                                            src={item.sprites.default as string}
                                            alt={berry.name}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 flex items-center justify-center">
                                        <Grape className="w-16 h-16 text-green-500/20" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-border bg-bg-secondary text-green-500">
                                    Berry Specimen
                                </span>
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20 bg-green-500/5 text-green-400 flex items-center gap-1.5">
                                    <Wind className="w-3 h-3" />
                                    {berry.firmness.name.replace(/-/g, " ")}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter mb-4">
                                {berry.name} <span className="text-text-muted/20 text-3xl md:text-5xl block md:inline">Berry</span>
                            </h1>
                            <p className="text-lg text-text-secondary max-w-2xl leading-relaxed italic opacity-80">
                                A {berry.firmness.name.replace(/-/g, " ")} berry often used in battle for its natural {berry.natural_gift_type.name} properties.
                            </p>
                        </div>

                        <div className="hidden lg:flex items-center gap-6 bg-bg-secondary/50 backdrop-blur-md p-6 rounded-2xl border border-border shadow-xl">
                            <div className="text-center px-4">
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Natural Gift Power</div>
                                <div className="text-2xl font-black text-text-primary font-mono">{berry.natural_gift_power}P</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cultivation Data */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border bg-gradient-to-br from-bg-secondary to-bg-tertiary/30 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Sparkles className="w-4 h-4 text-green-400" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Growth Info</h2>
                            </div>

                            <div className="space-y-6">
                                <StatCard icon={<Droplets className="w-4 h-4 text-blue-400" />} label="Growth Time" value={`${berry.growth_time}h`} unit="per stage" />
                                <StatCard icon={<Maximize2 className="w-4 h-4 text-purple-400" />} label="Size" value={`${berry.size / 10}cm`} />
                                <StatCard icon={<Grape className="w-4 h-4 text-red-500" />} label="Max Harvest" value={`${berry.max_harvest}`} unit="berries" />
                                <StatCard icon={<Activity className="w-4 h-4 text-yellow-400" />} label="Smoothness" value={`${berry.smoothness}`} />
                            </div>
                        </div>

                        {/* Gift Type */}
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Swords className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Natural Gift</h2>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-bg-tertiary border border-border rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-bg-secondary border border-border flex items-center justify-center font-black text-[10px] uppercase text-accent">
                                        Type
                                    </div>
                                    <span className="text-sm font-black text-text-primary capitalize">{berry.natural_gift_type.name}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-text-muted" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Flavor Matrix */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-10">
                                <Info className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Flavors</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {berry.flavors.map((f) => (
                                    <div key={f.flavor.name} className="relative p-6 bg-bg-tertiary/30 border border-border rounded-2xl overflow-hidden group">
                                        <div className={`absolute bottom-0 left-0 h-1 transition-all duration-700 ${f.potency > 0 ? "bg-accent" : "bg-text-muted/20"}`} style={{ width: `${Math.min(100, (f.potency / 40) * 100)}%` }} />
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{f.flavor.name}</span>
                                            <span className="text-xl font-black text-text-primary font-mono">{f.potency}</span>
                                        </div>
                                        <div className="h-6 w-full flex items-end gap-1">
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex-1 rounded-sm transition-all duration-500 ${i < (f.potency / 40) * 12 ? 'bg-accent' : 'bg-bg-secondary'}`}
                                                    style={{ height: `${20 + i * 5}%` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description/Item Info */}
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Item Info</h2>
                            </div>
                            <div className="space-y-6">
                                <p className="text-text-primary text-xl font-medium leading-relaxed">
                                    {item.effect_entries.find(e => e.language.name === "en")?.effect.replace(/\n|§/g, " ")}
                                </p>
                                <div className="p-4 bg-bg-tertiary/50 border border-border rounded-xl">
                                    <div className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-2">Item Category</div>
                                    <div className="text-sm font-black text-text-primary uppercase flex items-center gap-2">
                                        {item.category.name.replace(/-/g, " ")}
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                        {item.id} #ID
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, unit }: { icon: React.ReactNode, label: string, value: string, unit?: string }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-bg-tertiary border border-border transition-colors group-hover:border-accent/30 text-accent">
                    {icon}
                </div>
                <span className="text-sm font-bold text-text-secondary">{label}</span>
            </div>
            <div className="text-right">
                <span className="text-lg font-black text-text-primary">{value}</span>
                {unit && <span className="text-[9px] font-black text-text-muted block uppercase -mt-1">{unit}</span>}
            </div>
        </div>
    );
}
