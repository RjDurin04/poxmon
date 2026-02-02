import { getBerryFlavor } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { Soup, ArrowLeft, Zap } from "lucide-react";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function BerryFlavorDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const flavor = await getBerryFlavor(slug);
    const englishName = flavor.names.find((n) => n.language.name === "en")?.name ?? flavor.name;

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />

                <div className="relative max-w-7xl mx-auto">
                    {/* Decorative Background Label */}
                    <span className="text-[5rem] sm:text-[8rem] lg:text-[14rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1] uppercase">
                        FLAVOR
                    </span>

                    <Link
                        href="/berries"
                        className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors mb-8 group"
                    >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">Back to Berries</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/5">
                                    <Soup className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Flavor ID #{flavor.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {englishName}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Berries characterized by their {englishName.toLowerCase()} taste profile, linked to the {flavor.contest_type.name} contest stat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Contest Link */}
                    <div className="lg:col-span-12">
                        <Link
                            href={`/contests/types/${flavor.contest_type.name}`}
                            className="inline-flex items-center gap-3 px-6 py-4 bg-bg-secondary border border-border rounded-2xl mb-12 hover:border-accent group transition-all"
                        >
                            <Zap className="w-5 h-5 text-accent" />
                            <div>
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">Linked Contest Type</div>
                                <div className="text-sm font-black text-text-primary capitalize group-hover:text-accent transition-colors">{flavor.contest_type.name}</div>
                            </div>
                        </Link>

                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-text-primary flex items-center gap-3">
                                    Berries with this Flavor
                                    <span className="text-sm font-bold px-2 py-0.5 bg-accent/10 text-accent rounded-lg border border-accent/20">
                                        {flavor.berries.length}
                                    </span>
                                </h2>
                                <p className="text-text-muted text-sm mt-1">Berries containing {englishName.toLowerCase()} notes</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {flavor.berries.map((item) => {
                                return (
                                    <Link
                                        key={item.berry.name}
                                        href={`/berries/${item.berry.name}`}
                                        className="group p-4 bg-bg-secondary border border-border rounded-[24px] hover:border-accent/40 transition-all hover:shadow-xl hover:shadow-accent/10 flex flex-col items-center"
                                    >
                                        <div className="w-20 h-20 bg-bg-tertiary rounded-2xl flex items-center justify-center mb-3 group-hover:bg-accent/10 transition-colors overflow-hidden relative">
                                            <Image
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.berry.name}-berry.png`}
                                                alt={item.berry.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-125 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                unoptimized
                                            />
                                            <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-accent/20 text-accent text-[8px] font-black rounded-lg border border-accent/30">
                                                +{item.potency}
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-text-primary capitalize tracking-tight group-hover:text-accent transition-colors text-center truncate w-full">
                                            {item.berry.name.replace(/-/g, " ")}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
