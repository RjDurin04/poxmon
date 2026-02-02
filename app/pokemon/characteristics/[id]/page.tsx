import { getCharacteristic } from "@/lib/api";
import Link from "next/link";
import { Info, Target, Activity } from "lucide-react";

import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CharacteristicDetailPage({ params }: PageProps) {
    const { id } = await params;
    const char = await getCharacteristic(parseInt(id));

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />

                <div className="relative max-w-7xl mx-auto">
                    <BackButton label="Back to Pokemon" className="mb-8" />

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/5">
                                    <Info className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Characteristic ID #{char.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                Characteristic
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                &quot;{char.descriptions.find(d => d.language.name === "en")?.description}&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="w-5 h-5 text-accent" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Highest Stat</h2>
                        </div>
                        <Link
                            href={`/stats/${char.highest_stat.name}`}
                            className="block p-8 bg-bg-tertiary rounded-2xl border border-border group hover:border-accent transition-all"
                        >
                            <div className="text-[10px] font-black text-text-muted uppercase mb-1">Stat Constraint</div>
                            <div className="text-3xl font-black text-text-primary capitalize group-hover:text-accent transition-colors">
                                {char.highest_stat.name.replace(/-/g, " ")}
                            </div>
                            <p className="text-text-muted text-sm mt-2 italic">This characteristic occurs only when this attribute is the Pokemon&apos;s highest potential.</p>
                        </Link>
                    </div>

                    <div className="bg-bg-secondary rounded-[32px] p-8 border border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <Activity className="w-5 h-5 text-accent" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Possible IVs</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {char.possible_values.map((val: number) => (
                                <div key={val} className="p-6 bg-bg-tertiary rounded-2xl border border-border text-center">
                                    <span className="text-[10px] font-black text-text-muted uppercase block mb-1">Modulo Value</span>
                                    <div className="text-2xl font-black text-text-primary">{val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
