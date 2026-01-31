import { getVersion } from "@/lib/api";
import Link from "next/link";
import { Gamepad2, ArrowLeft, History } from "lucide-react";

import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function VersionDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const version = await getVersion(slug);
    const englishName = version.names.find((n) => n.language.name === "en")?.name ?? version.name;

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
                                    <Gamepad2 className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Version ID #{version.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                Pokémon {englishName}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Historical entry in the core series, encompassing unique encounters and version-exclusive biological data.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
                <div className="p-16 bg-bg-secondary rounded-[40px] border border-border border-dashed">
                    <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                        <History className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="text-3xl font-black text-text-primary mb-4 uppercase tracking-tighter">Temporal Archive</h2>
                    <p className="text-text-muted italic max-w-md mx-auto text-lg">
                        This version is part of the {version.version_group.name.replace(/-/g, " ")} group, sharing common mechanics with its counterpart.
                    </p>
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Link
                            href={`/games/version-groups/${version.version_group.name}`}
                            className="px-8 py-4 bg-accent text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                        >
                            View {version.version_group.name.replace(/-/g, " ")} Data
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
