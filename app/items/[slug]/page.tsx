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
    Baby
} from "lucide-react";

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
        <div className="min-h-screen bg-bg-primary pb-20">
            {/* Immersive Header */}
            <div className="relative overflow-hidden pt-20 pb-16 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 blur-[120px] rounded-full opacity-5 bg-accent" />

                <div className="max-w-7xl mx-auto relative px-4 md:px-0">
                    <Link
                        href="/items"
                        className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Items</span>
                    </Link>

                    <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
                        {/* Item Sprite Card */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative w-48 h-48 bg-bg-secondary rounded-3xl border border-border shadow-2xl flex items-center justify-center p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                                {item.sprites.default ? (
                                    <div className="relative w-32 h-32 scale-125">
                                        <Image
                                            src={item.sprites.default}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                ) : (
                                    <ShoppingBag className="w-16 h-16 text-text-muted" />
                                )}
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-border bg-bg-secondary text-accent">
                                    {item.category.name.replace(/-/g, " ")}
                                </span>
                                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20 bg-accent/5 text-accent-hover flex items-center gap-1.5">
                                    <CircleDollarSign className="w-3 h-3" />
                                    {item.cost > 0 ? `${item.cost} Poké` : "Priceless"}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter mb-4">
                                {item.name.replace(/-/g, " ")}
                            </h1>
                            <p className="text-lg text-text-secondary max-w-2xl leading-relaxed italic opacity-80">
                                {shortEffect}
                            </p>
                        </div>

                        <div className="hidden lg:flex items-center gap-6 bg-bg-secondary/50 backdrop-blur-md p-6 rounded-2xl border border-border shadow-xl">
                            <div className="text-center px-4">
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Item ID</div>
                                <div className="text-2xl font-black text-text-primary font-mono">#{item.id.toString().padStart(3, "0")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Item Details */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border bg-gradient-to-br from-bg-secondary to-bg-tertiary/30 shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Boxes className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Category Info</h2>
                            </div>

                            <div className="space-y-4">
                                <MetaItem label="Category" value={item.category.name.replace(/-/g, " ")} />
                                <MetaItem label="Market Value" value={item.cost > 0 ? `${item.cost} P` : "No Resale"} />
                                <MetaItem label="Item ID" value={item.id.toString()} />
                            </div>
                        </div>

                        {/* Attributes */}
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-8">
                                <Layers className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Attributes</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {item.attributes.map(attr => (
                                    <span key={attr.name} className="px-3 py-1.5 bg-bg-tertiary border border-border rounded-lg text-[9px] font-black uppercase tracking-wider text-text-primary">
                                        {attr.name.replace(/-/g, " ")}
                                    </span>
                                ))}
                                {item.attributes.length === 0 && (
                                    <span className="text-xs text-text-muted italic">No specific attributes recorded.</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Clinical Description */}
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm relative overflow-hidden group">
                            <ScrollText className="absolute top-8 right-8 w-24 h-24 text-accent/5 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Effect Description</h2>
                            </div>
                            <p className="text-text-primary text-xl font-medium leading-relaxed relative">
                                {mainEffect}
                            </p>
                        </div>

                        {/* Version History */}
                        <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <History className="w-4 h-4 text-accent" />
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Flavor Text History</h2>
                            </div>
                            <div className="space-y-4">
                                {history.map((entry, idx) => (
                                    <div key={idx} className="p-4 rounded-xl hover:bg-bg-tertiary/30 transition-colors border border-transparent hover:border-border group/v">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[9px] font-black text-accent uppercase tracking-widest px-2 py-0.5 rounded bg-accent/5 border border-accent/10">
                                                {entry.version_group.name.replace(/-/g, " ")}
                                            </span>
                                            <div className="h-px flex-1 bg-border/30" />
                                        </div>
                                        <p className="text-sm text-text-secondary leading-relaxed italic group-hover/v:text-text-primary transition-colors">
                                            &quot;{entry.text.replace(/\n|§/g, " ")}&quot;
                                        </p>
                                    </div>
                                ))}
                                {history.length === 0 && (
                                    <div className="text-sm text-text-muted italic px-2">No catalog descriptions available.</div>
                                )}
                            </div>
                        </div>

                        {/* Fling & Technical Data */}
                        {(item.fling_power !== null || item.fling_effect) && (
                            <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <Zap className="w-5 h-5 text-accent" />
                                    <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Fling Mechanics</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {item.fling_power !== null && (
                                        <div className="p-4 rounded-xl bg-bg-tertiary border border-border">
                                            <div className="text-[10px] font-bold text-text-muted uppercase">Fling Power</div>
                                            <div className="text-xl font-black text-text-primary">{item.fling_power}</div>
                                        </div>
                                    )}
                                    {item.fling_effect && (
                                        <div className="p-4 rounded-xl bg-bg-tertiary border border-border">
                                            <div className="text-[10px] font-bold text-text-muted uppercase">Fling Effect</div>
                                            <div className="text-sm font-black text-accent uppercase">{item.fling_effect.name.replace(/-/g, " ")}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Held by Pokemon */}
                        {item.held_by_pokemon && item.held_by_pokemon.length > 0 && (
                            <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <Dna className="w-5 h-5 text-accent" />
                                    <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Held By Pokemon</h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                    {item.held_by_pokemon.map((p, i) => (
                                        <Link key={i} href={`/pokemon/${p.pokemon.name}`} className="p-3 rounded-lg bg-bg-tertiary border border-border hover:border-accent/40 transition-colors group">
                                            <div className="text-[10px] font-black text-text-primary capitalize truncate group-hover:text-accent">{p.pokemon.name.replace(/-/g, " ")}</div>
                                            <div className="text-[8px] font-bold text-text-muted mt-1 uppercase italic">{p.version_details[0].rarity}% Rarity</div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Machine Catalog */}
                        {item.machines && item.machines.length > 0 && (
                            <div className="bg-bg-secondary rounded-2xl p-8 border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <Disc className="w-5 h-5 text-accent" />
                                    <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Machine Data (TM/HM)</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {item.machines.map((m, i) => (
                                        <div key={i} className="px-4 py-2 rounded-xl bg-bg-tertiary border border-border">
                                            <div className="text-[8px] font-bold text-text-muted mb-1">{m.version_group.name.replace(/-/g, " ")}</div>
                                            <div className="text-xs font-black text-accent uppercase">M-{m.machine.url.split("/").slice(-2)[0]}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Baby Trigger */}
                        {item.baby_trigger_for && (
                            <div className="bg-bg-secondary rounded-2xl p-8 border border-border border-pink-500/20 shadow-sm relative overflow-hidden">
                                <Baby className="absolute top-4 right-4 w-12 h-12 text-pink-500/5 rotate-12" />
                                <div className="flex items-center gap-3 mb-4">
                                    <Baby className="w-5 h-5 text-pink-500" />
                                    <h2 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Baby Trigger</h2>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    This asset acts as an essential trigger for specific evolutionary lines.
                                </p>
                                <div className="mt-4">
                                    <a href={item.baby_trigger_for.url} className="text-xs font-black text-pink-500 hover:text-pink-400 underline">VIEW EVOLUTION DETAILS →</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetaItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex items-center justify-between py-1 border-b border-border/30 last:border-0 pb-3 last:pb-0">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-tight">{label}</span>
            <span className="text-xs font-black text-text-primary capitalize">{value}</span>
        </div>
    );
}
