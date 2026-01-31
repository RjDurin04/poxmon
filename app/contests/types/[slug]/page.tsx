import { getContestType } from "@/lib/api";
import Link from "next/link";
import { Sparkles, ArrowLeft, Cherry } from "lucide-react";

import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ContestTypeDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const contest = await getContestType(slug);
    const englishName = contest.names.find((n) => n.language.name === "en")?.name ?? contest.name;

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />

                <div className="relative max-w-7xl mx-auto">
                    <BackButton label="Back to Library" className="mb-8" />

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/5">
                                    <Sparkles className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Contest ID #{contest.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {englishName}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Species and moves specifically adapted for {englishName.toLowerCase()} contests and beauty competitions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Berry Link */}
                    <div className="lg:col-span-12">
                        <Link
                            href={`/berries/flavors/${contest.berry_flavor.name}`}
                            className="inline-flex items-center gap-3 px-6 py-4 bg-bg-secondary border border-border rounded-2xl mb-12 hover:border-accent group transition-all"
                        >
                            <Cherry className="w-5 h-5 text-accent" />
                            <div>
                                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">Preferred Berry Flavor</div>
                                <div className="text-sm font-black text-text-primary capitalize group-hover:text-accent transition-colors">{contest.berry_flavor.name}</div>
                            </div>
                        </Link>

                        <div className="p-12 bg-bg-secondary rounded-[40px] border border-border border-dashed text-center">
                            <h2 className="text-2xl font-black text-text-primary mb-4 uppercase tracking-tighter">Competition Logistics</h2>
                            <p className="text-text-muted italic max-w-lg mx-auto">
                                The {englishName.toLowerCase()} category evaluates the specific aesthetic and performance coordination of moves or pokemon characteristics.
                            </p>
                            <Link
                                href="/moves"
                                className="inline-block mt-8 px-8 py-4 bg-accent text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                            >
                                Browse Moves for {englishName}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
