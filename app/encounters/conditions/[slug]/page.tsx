import { getEncounterCondition } from "@/lib/api";
import Link from "next/link";
import { Cloud, ArrowLeft, Dices } from "lucide-react";

import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function EncounterConditionDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const condition = await getEncounterCondition(slug);
    const englishName = condition.names.find((n) => n.language.name === "en")?.name ?? condition.name;

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
                                    <Cloud className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Condition ID #{condition.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {englishName}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Environmental factors and world states that influence Pokémon encounter availability.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-12">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-text-primary flex items-center gap-3">
                                    Condition States
                                    <span className="text-sm font-bold px-2 py-0.5 bg-accent/10 text-accent rounded-lg border border-accent/20">
                                        {condition.values.length}
                                    </span>
                                </h2>
                                <p className="text-text-muted text-sm mt-1">Specific values this condition can take</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {condition.values.map((val) => (
                                <Link
                                    key={val.name}
                                    href={`/encounters/condition-values/${val.name}`}
                                    className="group p-6 bg-bg-secondary border border-border rounded-3xl hover:border-accent/40 transition-all hover:shadow-xl flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-bg-tertiary flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                                        <Dices className="w-6 h-6 text-text-muted group-hover:text-accent transition-colors" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">Value Path</div>
                                        <div className="text-lg font-black text-text-primary capitalize group-hover:text-accent transition-colors">
                                            {val.name.replace(/-/g, " ")}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
