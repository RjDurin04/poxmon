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
    FileText,
    Clock,
    Scale,
    Trash2,
    Leaf
} from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BerryDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const berry = await getBerryDetail(slug);
    const item = await getItemDetail(berry.item.name);

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-green-500/30 font-sans overflow-x-hidden relative">
            {/* Background Accents */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-green-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-green-500/5 blur-[120px] rounded-full" />
            </div>

            {/* Floating Back Button */}
            <div className="fixed top-28 left-6 sm:left-12 z-[110]">
                <BackButton variant="floating" label="Back to Berries" fallbackPath="/berries" />
            </div>

            {/* Header Content */}
            <header className="relative z-20 pt-32 sm:pt-48 pb-12 sm:pb-32 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
                    <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Decorative Background ID */}
                        <span className="text-[5rem] sm:text-[8rem] lg:text-[16rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1]">
                            BERRY
                        </span>

                        <div className="flex items-center gap-4 mb-6 flex-wrap justify-center lg:justify-start">
                            <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest">
                                Berry ID #{berry.id.toString().padStart(3, "0")}
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-bg-secondary border border-border/50 text-text-muted text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                <Wind className="w-3 h-3" />
                                {berry.firmness.name.replace(/-/g, " ")}
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-7xl lg:text-[10rem] font-black text-text-primary uppercase tracking-tighter leading-[0.8] mb-8">
                            {berry.name}
                        </h1>

                        <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                            <div className="flex gap-2">
                                <Link
                                    href={`/items/${berry.item.name}`}
                                    className="px-6 py-2 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest hover:border-green-500 hover:text-green-400 transition-all shadow-lg flex items-center gap-2"
                                >
                                    <Leaf className="w-3 h-3" />
                                    Internal Item View
                                </Link>
                            </div>
                            <div className="h-4 w-px bg-border hidden sm:block" />
                            <span className="text-xl font-bold text-text-muted italic opacity-60">Natural Gift Power: {berry.natural_gift_power}</span>
                        </div>
                    </div>

                    {/* Berry Visualizer */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-green-500/20 blur-[80px] rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-all duration-1000" />
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 bg-bg-secondary/40 backdrop-blur-3xl rounded-[3rem] border border-white/5 flex items-center justify-center p-8 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                            {item.sprites.default ? (
                                <Image
                                    src={item.sprites.default}
                                    alt={berry.name}
                                    width={160}
                                    height={160}
                                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:scale-125 transition-transform duration-700 relative z-10"
                                    unoptimized
                                />
                            ) : (
                                <Grape className="w-24 h-24 text-green-500/20" />
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-32 space-y-20 sm:space-y-32">

                {/* Section 1: Growth & Harvesting Profile */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-green-500/5 flex items-center justify-center border border-green-500/10">
                                <Activity className="w-6 h-6 text-green-400" />
                            </div>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-text-muted">Growth & Harvesting</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            {[
                                { label: "Growth Time", value: `${berry.growth_time}`, unit: "h / stage", icon: Clock, color: "text-blue-400" },
                                { label: "Max Harvest", value: `${berry.max_harvest}`, unit: "berries", icon: Grape, color: "text-red-400" },
                                { label: "Soil Dryness", value: `${berry.soil_dryness}`, unit: "rate", icon: Droplets, color: "text-amber-400" },
                                { label: "Size", value: `${berry.size / 10}`, unit: "cm", icon: Maximize2, color: "text-purple-400" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-bg-secondary/40 backdrop-blur-xl border border-border/50 p-6 rounded-[2rem] group hover:border-green-500/30 transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <stat.icon className={`w-5 h-5 ${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                                        <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">API Data</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-text-primary tracking-tighter">{stat.value}</span>
                                            <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">{stat.unit}</span>
                                        </div>
                                        <span className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] mt-1">{stat.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10">
                                <Swords className="w-6 h-6 text-accent" />
                            </div>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-text-muted">Natural Gift</h2>
                        </div>

                        <div className="p-8 bg-bg-secondary/40 backdrop-blur-xl border border-white/5 rounded-[3rem] relative overflow-hidden group">
                            <div className="absolute -right-8 -bottom-8 text-[12rem] font-black text-accent/5 leading-none select-none pointer-events-none group-hover:text-accent/10 transition-colors italic">
                                GIFT
                            </div>
                            <div className="relative z-10 flex flex-col gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-2">Gift Type</span>
                                        <Link
                                            href={`/types/${berry.natural_gift_type.name}`}
                                            className="text-4xl sm:text-6xl font-black text-text-primary hover:text-accent transition-colors capitalize tracking-tighter"
                                        >
                                            {berry.natural_gift_type.name}
                                        </Link>
                                    </div>
                                    <div className="h-20 w-px bg-white/5" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-2">Base Power</span>
                                        <span className="text-4xl sm:text-6xl font-black text-text-primary tracking-tighter font-mono">
                                            {berry.natural_gift_power}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-accent/5 border border-accent/10">
                                    <Info className="w-4 h-4 text-accent shrink-0" />
                                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider leading-relaxed">
                                        This berry activates a {berry.natural_gift_type.name}-type physical move with {berry.natural_gift_power} power when used as a Natural Gift.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Flavor Matrix */}
                <section className="space-y-12">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/5 flex items-center justify-center border border-purple-500/10 mb-6">
                            <Grape className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-text-muted">Flavor Matrix</h2>
                        <p className="text-xl font-black text-text-muted max-w-2xl tracking-tighter mt-4 italic opacity-60">Potency analysis across all recognized flavor profiles.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {berry.flavors.map((f, i) => (
                            <div key={f.flavor.name} className="bg-bg-secondary/40 backdrop-blur-xl border border-border/50 p-8 rounded-[2.5rem] group hover:border-accent/30 transition-all flex flex-col items-center">
                                <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                                    {/* Circular Progress */}
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="50%" cy="50%" r="42" className="stroke-white/5 fill-none" strokeWidth="8" />
                                        <circle
                                            cx="50%" cy="50%" r="42"
                                            className={cn("fill-none transition-all duration-1000", f.potency > 0 ? "stroke-accent" : "stroke-white/10")}
                                            strokeWidth="8"
                                            strokeDasharray={2 * Math.PI * 42}
                                            strokeDashoffset={2 * Math.PI * 42 * (1 - Math.min(1, f.potency / 40))}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="absolute text-2xl font-black text-text-primary font-mono">{f.potency}</span>
                                </div>
                                <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-1">{f.flavor.name}</span>
                                <div className="h-1 w-8 rounded-full bg-white/5 group-hover:bg-accent/30 transition-all" />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-bg-secondary/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/5 flex items-center justify-center border border-blue-500/10">
                                    <Scale className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-text-muted uppercase tracking-widest mb-1">Texture Smoothness</span>
                                    <span className="text-3xl font-black text-text-primary tracking-tighter">{berry.smoothness}</span>
                                </div>
                            </div>
                            <div className="hidden sm:block h-12 w-px bg-white/5" />
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-[8px] font-black text-text-muted uppercase tracking-widest mb-1">API Ref</span>
                                <span className="text-[10px] font-bold text-text-secondary">Value {berry.smoothness}.0</span>
                            </div>
                        </div>

                        <div className="bg-bg-secondary/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10">
                                    <Activity className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-text-muted uppercase tracking-widest mb-1">Consumption Firmness</span>
                                    <span className="text-3xl font-black text-text-primary tracking-tighter capitalize">{berry.firmness.name.replace(/-/g, " ")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Item Data */}
                <section className="space-y-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10">
                            <FileText className="w-6 h-6 text-accent" />
                        </div>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-text-muted">Item Details</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-bg-secondary/40 backdrop-blur-xl border border-white/5 p-10 sm:p-14 rounded-[3rem] relative group">
                            <div className="absolute top-8 right-8 flex items-center gap-2 opacity-20 group-hover:opacity-100 transition-opacity">
                                <span className="text-[8px] font-black uppercase tracking-widest">Type: {item.category.name}</span>
                                <div className="w-2 h-2 rounded-full bg-accent" />
                            </div>
                            <p className="text-xl sm:text-3xl lg:text-4xl font-black leading-[1.2] tracking-tight text-text-primary mb-12">
                                {item.effect_entries.find(e => e.language.name === "en")?.effect.replace(/\n|§/g, " ")}
                            </p>
                            <div className="flex gap-4">
                                <div className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-text-muted">
                                    Cost: {item.cost}P
                                </div>
                                <div className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-text-muted">
                                    Fling Power: {item.fling_power || 0}
                                </div>
                            </div>
                        </div>

                        <div className="bg-bg-secondary/40 backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] flex flex-col justify-between group">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Item Category</span>
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none text-text-primary group-hover:text-accent transition-colors">
                                    {item.category.name.replace(/-/g, " ")}
                                </h3>
                                <div className="h-px w-full bg-white/5" />
                                <div className="space-y-2">
                                    <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Attributes</span>
                                    <div className="flex flex-wrap gap-2">
                                        {item.attributes.map(attr => (
                                            <span key={attr.name} className="px-3 py-1 rounded-lg bg-bg-tertiary border border-border/50 text-[8px] font-black uppercase tracking-widest">
                                                {attr.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-8 flex items-center justify-between text-[10px] font-black text-text-muted uppercase tracking-widest mt-auto">
                                <span>Record ID</span>
                                <span className="font-mono">#{item.id.toString().padStart(4, "0")}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Termination Footer */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-white/5 relative z-10 flex flex-col items-center text-center">
                <Link href="/berries" className="group flex flex-col items-center gap-8">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-bg-secondary border border-white/5 group-hover:border-green-500 group-hover:bg-green-500/20 flex items-center justify-center transition-all duration-700">
                        <ArrowLeft className="w-8 h-8 text-text-muted group-hover:text-green-400 transition-colors" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[1em] text-text-muted group-hover:text-green-500 transition-all pl-[1em]">Back to Berries</span>
                </Link>
            </div>
        </div>
    );
}
