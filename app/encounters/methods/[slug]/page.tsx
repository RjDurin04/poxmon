import { getEncounterMethod } from "@/lib/api";
import { Crosshair, Gamepad2 } from "lucide-react";

import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function EncounterMethodDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const method = await getEncounterMethod(slug);
    const englishName = method.names.find((n) => n.language.name === "en")?.name ?? method.name;

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
                                    <Crosshair className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Method ID #{method.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {englishName}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Technical procedure for locating and engaging wild Pokémon via {englishName.toLowerCase()}.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
                <div className="p-16 bg-bg-secondary rounded-[40px] border border-border border-dashed">
                    <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                        <Gamepad2 className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="text-3xl font-black text-text-primary mb-4 uppercase tracking-tighter">Encounter Logic</h2>
                    <p className="text-text-muted italic max-w-md mx-auto text-lg">
                        This method governs the spawn probability and encounter mechanics within specific location areas across all regions.
                    </p>
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <span className="px-6 py-3 bg-bg-tertiary rounded-2xl border border-border font-bold text-sm text-text-secondary">Method: {method.name}</span>
                        <span className="px-6 py-3 bg-bg-tertiary rounded-2xl border border-border font-bold text-sm text-text-secondary capitalize">Order: {method.order}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
