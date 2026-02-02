import { getItemDetail } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    ShoppingBag,
    CircleDollarSign,
    Boxes,
    ScrollText,
    Layers,
    History,
    FileText,
    Dna,
    Zap,
    Disc,
    Baby,
    Package,
    ShieldCheck,
    Tag,
} from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ItemDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const item = await getItemDetail(slug);

    const mainEffect = item.effect_entries.find(e => e.language.name === "en")?.effect || "No effect data available.";
    const shortEffect = item.effect_entries.find(e => e.language.name === "en")?.short_effect || mainEffect;
    const history = item.flavor_text_entries.filter(f => f.language.name === "en").slice(-5);

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 font-sans overflow-x-hidden relative">
            {/* Background Accents */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
            </div>

            {/* Floating Back Button */}
            <div className="fixed top-28 left-6 sm:left-12 z-[110]">
                <BackButton variant="floating" label="Back to Items" fallbackPath="/items" />
            </div>

            {/* Header Content */}
            <header className="relative z-20 pt-32 sm:pt-48 pb-12 sm:pb-32 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
                    <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Decorative Background ID */}
                        <span className="text-[5rem] sm:text-[8rem] lg:text-[16rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1]">
                            ITEM
                        </span>

                        <div className="flex items-center gap-4 mb-6 flex-wrap justify-center lg:justify-start">
                            <span className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                Item ID #{item.id.toString().padStart(4, "0")}
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-bg-secondary border border-border/50 text-text-muted text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                <Package className="w-3 h-3" />
                                {item.category.name.replace(/-/g, " ")}
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-7xl lg:text-[10rem] font-black text-text-primary uppercase tracking-tighter leading-[0.8] mb-8">
                            {item.name.replace(/-/g, " ")}
                        </h1>

                        <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                            <div className="flex gap-2">
                                <span className="px-6 py-2 rounded-2xl bg-bg-secondary border border-border/50 text-xs font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                                    <Tag className="w-3 h-3" />
                                    Market Value: {item.cost > 0 ? `${item.cost} Poké` : "No Resale"}
                                </span>
                            </div>
                            <div className="h-4 w-px bg-border hidden sm:block" />
                            <span className="text-xl font-bold text-text-muted italic opacity-60 max-w-xl truncate">{shortEffect}</span>
                        </div>
                    </div>

                    {/* Item Visualizer */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-accent/20 blur-[80px] rounded-full scale-110 opacity-50 group-hover:opacity-100 transition-all duration-1000" />
                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 bg-bg-secondary/40 backdrop-blur-3xl rounded-[3rem] border border-white/5 flex items-center justify-center p-8 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]" />
                            {item.sprites.default ? (
                                <Image
                                    src={item.sprites.default}
                                    alt={item.name}
                                    width={160}
                                    height={160}
                                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:scale-125 transition-transform duration-700 relative z-10"
                                    unoptimized
                                />
                            ) : (
                                <ShoppingBag className="w-24 h-24 text-accent/20" />
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Grid */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-32 space-y-20 sm:space-y-32">

                {/* Section 1: Distribution & Mechanics */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    <div className="space-y-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10">
                                <ShieldCheck className="w-6 h-6 text-accent" />
                            </div>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-text-muted">Item Logistics</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            {[
                                { label: "Purchase Value", value: `${item.cost}`, unit: "Poké", icon: CircleDollarSign, color: "text-amber-400" },
                                { label: "Fling Power", value: `${item.fling_power || 0}`, unit: "base", icon: Zap, color: "text-blue-400" },
                                { label: "Main Category", value: item.category.name.replace(/-/g, " "), unit: "type", icon: Boxes, color: "text-purple-400", isText: true },
                                { label: "Record Index", value: `${item.id}`, unit: "#ID", icon: Layers, color: "text-emerald-400" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-bg-secondary/40 backdrop-blur-xl border border-border/50 p-6 rounded-[2rem] group hover:border-accent/30 transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <stat.icon className={`w-5 h-5 ${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                                        <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Registry Data</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-baseline gap-1">
                                            <span className={cn("font-black text-text-primary tracking-tighter", stat.isText ? "text-xl sm:text-2xl capitalize" : "text-3xl")}>
                                                {stat.value}
                                            </span>
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
                                <Layers className="w-6 h-6 text-accent" />
                            </div>
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-text-muted">Attribute Matrix</h2>
                        </div>

                        <div className="p-8 bg-bg-secondary/40 backdrop-blur-xl border border-white/5 rounded-[3rem] relative overflow-hidden group min-h-[300px] flex flex-col justify-between">
                            <div className="absolute -right-8 -bottom-8 text-[12rem] font-black text-accent/5 leading-none select-none pointer-events-none group-hover:text-accent/10 transition-colors italic uppercase">
                                DATA
                            </div>
                            <div className="relative z-10">
                                <div className="flex flex-wrap gap-3 mb-8">
                                    {item.attributes.length > 0 ? (
                                        item.attributes.map(attr => (
                                            <span key={attr.name} className="px-4 py-2 rounded-xl bg-accent/5 border border-accent/10 text-[10px] font-black uppercase tracking-widest text-accent hover:bg-accent/10 transition-colors">
                                                {attr.name.replace(/-/g, " ")}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm font-bold text-text-muted italic opacity-60">No specific attributes recorded for this record.</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                                    <ScrollText className="w-5 h-5 text-text-muted shrink-0" />
                                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider leading-relaxed">
                                        The attribute distribution defines the item functional behavior within the game environment.
                                    </p>
                                </div>
                            </div>

                            {item.baby_trigger_for && (
                                <div className="relative z-10 mt-8 p-6 rounded-[2rem] bg-pink-500/5 border border-pink-500/10 flex items-center justify-between group/baby">
                                    <div className="flex items-center gap-4">
                                        <Baby className="w-6 h-6 text-pink-400" />
                                        <div className="flex flex-col">
                                            <span className="text-[8px] font-black text-pink-400 uppercase tracking-widest">Biological Event</span>
                                            <span className="text-lg font-black text-text-primary uppercase tracking-tighter leading-none">Baby Trigger</span>
                                        </div>
                                    </div>
                                    <ArrowLeft className="w-5 h-5 text-pink-400/40 group-hover/baby:translate-x-1 transition-transform rotate-180" />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section 2: Clinical Descriptions & History */}
                <section className="space-y-12">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10 mb-6">
                            <FileText className="w-6 h-6 text-accent" />
                        </div>
                        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-text-muted">Technical Description</h2>
                    </div>

                    <div className="bg-bg-secondary/40 backdrop-blur-xl border border-white/5 p-10 sm:p-14 lg:p-20 rounded-[4rem] relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 blur-[100px] pointer-events-none" />
                        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
                            <span className="text-[10px] font-black text-accent uppercase tracking-[0.5em] mb-12 opacity-40 group-hover:opacity-100 transition-opacity">Primary Operational Effect</span>
                            <p className="text-2xl sm:text-4xl lg:text-5xl font-black text-text-primary leading-[1.1] tracking-tight">
                                {mainEffect.replace(/\n|§/g, " ")}
                            </p>
                            <div className="w-24 h-1 bg-accent/20 rounded-full mt-16 mb-8 group-hover:w-48 transition-all duration-700" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <History className="w-5 h-5 text-text-muted" />
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Description History</h3>
                            </div>
                            <div className="space-y-4">
                                {history.length > 0 ? (
                                    history.map((entry, idx) => (
                                        <div key={idx} className="p-6 rounded-[2rem] bg-bg-secondary/40 border border-white/5 group/entry hover:border-accent/30 transition-all">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[8px] font-black text-text-muted uppercase tracking-widest group-hover/entry:text-accent transition-colors">
                                                    {entry.version_group.name.replace(/-/g, " ")}
                                                </span>
                                            </div>
                                            <p className="text-sm sm:text-base text-text-secondary italic leading-relaxed group-hover/entry:text-text-primary transition-colors">
                                                &quot;{entry.text.replace(/\n|§/g, " ")}&quot;
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 rounded-[2rem] border border-dashed border-white/5 text-center text-sm text-text-muted opacity-40 uppercase font-black tracking-widest italic">
                                        No archival data found.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <Dna className="w-5 h-5 text-text-muted" />
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-text-muted">Distribution & Machines</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {/* Fling Detail */}
                                {(item.fling_power !== null || item.fling_effect) && (
                                    <div className="p-8 rounded-[2rem] bg-bg-secondary/40 border border-white/5 relative overflow-hidden group">
                                        <Zap className="absolute top-4 right-4 text-accent/10 w-12 h-12" />
                                        <div className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-4">Ballistics (Fling)</div>
                                        <div className="flex items-center gap-12">
                                            {item.fling_power !== null && (
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Base Power</span>
                                                    <span className="text-3xl font-black text-text-primary font-mono">{item.fling_power}</span>
                                                </div>
                                            )}
                                            {item.fling_effect && (
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Bonus Effect</span>
                                                    <span className="text-xl font-black text-accent uppercase tracking-tighter">{item.fling_effect.name.replace(/-/g, " ")}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Machines */}
                                {item.machines && item.machines.length > 0 && (
                                    <div className="p-8 rounded-[2rem] bg-bg-secondary/40 border border-white/5">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Disc className="w-5 h-5 text-accent" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Technical Records (Machines)</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {item.machines.map((m, i) => (
                                                <div key={i} className="px-4 py-3 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/40 transition-colors cursor-default group/m">
                                                    <div className="text-[7px] font-black text-text-muted mb-1 pb-1 border-b border-white/5 group-hover/m:text-accent transition-colors uppercase truncate max-w-[80px]">
                                                        {m.version_group.name.replace(/-/g, " ")}
                                                    </div>
                                                    <div className="text-xs font-black text-text-primary uppercase flex items-center gap-2">
                                                        <span className="text-accent underline decoration-accent/20">M</span>
                                                        {m.machine.url.split("/").slice(-2)[0]}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Held By grid */}
                            {item.held_by_pokemon && item.held_by_pokemon.length > 0 && (
                                <div className="p-8 rounded-[3rem] bg-bg-secondary/40 border border-white/5">
                                    <div className="flex items-center gap-3 mb-6">
                                        <ShoppingBag className="w-5 h-5 text-emerald-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Held by Species</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {item.held_by_pokemon.map((p, i) => (
                                            <Link key={i} href={`/pokemon/${p.pokemon.name}`} className="group/held p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all flex items-center justify-between">
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-xs font-black text-text-primary uppercase tracking-tighter truncate group-hover/held:text-emerald-400 transition-colors">
                                                        {p.pokemon.name.replace(/-/g, " ")}
                                                    </span>
                                                    <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest opacity-60">
                                                        {p.version_details[0].rarity}% Rarity
                                                    </span>
                                                </div>
                                                <ArrowLeft className="w-3 h-3 text-emerald-500/20 group-hover/held:text-emerald-400 transition-colors rotate-180" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* Termination Footer */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-white/5 relative z-10 flex flex-col items-center text-center">
                <Link href="/items" className="group flex flex-col items-center gap-8">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-bg-secondary border border-white/5 group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center transition-all duration-700">
                        <ArrowLeft className="w-8 h-8 text-text-muted group-hover:text-accent transition-colors" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[1em] text-text-muted group-hover:text-accent transition-all pl-[1em]">Back to Records</span>
                </Link>
            </div>
        </div>
    );
}


