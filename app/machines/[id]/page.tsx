import { getMachine } from "@/lib/api";
import Link from "next/link";
import { Disc, ArrowLeft, Zap, Gamepad2 } from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function MachineDetailPage({ params }: PageProps) {
    const { id } = await params;
    const machine = await getMachine(parseInt(id));

    return (
        <div className="min-h-screen bg-bg-primary">
            {/* Header */}
            <div className="relative overflow-hidden pt-24 pb-20 px-4 md:px-8 border-b border-border">
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-[120px] rounded-full opacity-10 bg-accent" />

                <div className="relative max-w-7xl mx-auto">
                    <Link
                        href="/moves"
                        className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors mb-8 group"
                    >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">Back to Moves</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/5">
                                    <Disc className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Machine ID #{machine.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {machine.item.name.replace(/-/g, " ")}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Hardware interface used to overwrite innate technique protocols and teach &quot;{machine.move.name.replace(/-/g, " ")}&quot; to compatible species.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link
                        href={`/moves/${machine.move.name}`}
                        className="bg-bg-secondary rounded-[32px] p-8 border border-border group hover:border-accent transition-all relative overflow-hidden"
                    >
                        <Zap className="absolute top-8 right-8 w-24 h-24 text-accent/5 rotate-12" />
                        <div className="flex items-center gap-3 mb-6">
                            <Zap className="w-5 h-5 text-accent" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">Teachable Move</h2>
                        </div>
                        <div className="text-3xl font-black text-text-primary capitalize mb-2 group-hover:text-accent transition-colors">
                            {machine.move.name.replace(/-/g, " ")}
                        </div>
                        <p className="text-text-muted text-sm italic">Click to view complete move mechanics and practitioners.</p>
                    </Link>

                    <Link
                        href={`/games/version-groups/${machine.version_group.name}`}
                        className="bg-bg-secondary rounded-[32px] p-8 border border-border group hover:border-accent transition-all"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Gamepad2 className="w-5 h-5 text-accent" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">System Compatibility</h2>
                        </div>
                        <div className="text-3xl font-black text-text-primary capitalize mb-2 group-hover:text-accent transition-colors">
                            {machine.version_group.name.replace(/-/g, " ")}
                        </div>
                        <p className="text-text-muted text-sm italic">Valid for species within this generational group.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
