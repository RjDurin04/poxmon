import { getVersion } from "@/lib/api";
import Link from "next/link";
import { Gamepad2, ArrowUpRight, Cpu, Star, Layers } from "lucide-react";
import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function VersionDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const version = await getVersion(slug);
    const englishName = version.names.find((n) => n.language.name === "en")?.name ?? version.name;

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 selection:text-white pb-24 font-sans overflow-x-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-accent-rgb)_0.5px,_transparent_0.5px)] bg-[size:64px_64px] opacity-[0.02]" />
                <div className={`absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-transparent via-bg-primary/50 to-bg-primary`} />
                <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-accent/5 blur-[160px] rounded-full" />
            </div>

            {/* Version Header */}
            <div className="relative z-10 pt-32 pb-24 px-4 md:px-8 border-b border-border/50 bg-bg-primary/20 backdrop-blur-md">
                <div className="max-w-7xl mx-auto">
                    <BackButton label="Generations" className="mb-12" />

                    <div className="flex flex-col md:flex-row items-start justify-between gap-12">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-2xl text-white">
                                    <Gamepad2 className="w-7 h-7" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Game Version</span>
                                        <div className="h-px w-8 bg-accent/30" />
                                    </div>
                                    <span className="text-xs font-black text-text-muted uppercase tracking-widest">Version ID: #{version.id.toString().padStart(3, '0')}</span>
                                </div>
                            </div>

                            <div className="relative">
                                {/* Decorative Background Label */}
                                <span className="text-[5rem] sm:text-[8rem] lg:text-[14rem] font-black text-white/[0.02] absolute -top-8 sm:-top-16 lg:-top-32 left-0 lg:-left-12 leading-none select-none pointer-events-none whitespace-nowrap z-[-1] uppercase">
                                    GAME
                                </span>

                                <h1 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] mb-10 select-none relative z-10">
                                    Pokémon<br />
                                    <span className="text-accent underline decoration-4 underline-offset-8 decoration-accent/20">{englishName}</span>
                                </h1>
                            </div>

                            <p className="text-text-secondary text-xl leading-relaxed max-w-2xl font-medium italic opacity-80">
                                This core series entry belongs to the {version.version_group.name.replace(/-/g, " ")} series. It features version-exclusive Pokemon and unique encounters tied to this specific release.
                            </p>
                        </div>

                        {/* Node Card */}
                        <div className="w-full md:w-80 group">
                            <div className="bg-bg-secondary/40 backdrop-blur-xl border border-border p-8 rounded-[40px] shadow-2xl group-hover:border-accent/30 transition-all flex flex-col gap-8">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 rounded-2xl bg-bg-primary border border-border shadow-inner">
                                        <Layers className="w-6 h-6 text-accent" />
                                    </div>
                                    <span className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none bg-bg-primary px-3 py-1.5 rounded-full border border-border">SERIES LINK</span>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] block mb-2">Version Group</span>
                                    <span className="text-xl font-black text-text-primary uppercase tracking-tight">{version.version_group.name.replace(/-/g, " ")}</span>
                                </div>
                                <Link
                                    href={`/games/version-groups/${version.version_group.name}`}
                                    className="flex items-center justify-between p-4 bg-accent text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-accent/20"
                                >
                                    <span>View Group Details</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Version Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Version Details Card */}
                    <div className="bg-bg-secondary/40 backdrop-blur-xl border border-border p-12 rounded-[48px] flex flex-col items-center text-center group">
                        <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center mb-8 border border-accent/20 group-hover:scale-110 transition-transform">
                            <Gamepad2 className="w-10 h-10 text-accent" />
                        </div>
                        <h2 className="text-3xl font-black text-text-primary mb-4 uppercase tracking-tighter">Version Details</h2>
                        <p className="text-text-secondary italic max-w-xs mx-auto text-lg leading-relaxed opacity-70">
                            Details about this specific game version, including its unique features and its place within the broader Pokemon series.
                        </p>
                        <div className="mt-12 h-px w-24 bg-border/50" />
                    </div>

                    {/* API Metadata Card */}
                    <div className="bg-bg-secondary/40 backdrop-blur-xl border border-border p-12 rounded-[48px] flex flex-col justify-between overflow-hidden relative">
                        <Star className="absolute -top-10 -right-10 w-40 h-40 text-accent/5 -rotate-12" />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-6">
                                <Cpu className="w-5 h-5 text-accent" />
                                <h2 className="text-sm font-black uppercase tracking-widest text-text-primary">API Metadata</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Source System</span>
                                    <span className="text-lg font-black text-text-primary uppercase tracking-tight">PokeAPI v2</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Resource URL</span>
                                    <code className="text-[10px] font-mono p-3 bg-bg-primary rounded-xl border border-border/50 break-all text-text-muted">
                                        https://pokeapi.co/api/v2/version/{version.id}
                                    </code>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">API Connection Active</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
