import { getLanguage } from "@/lib/api";
import { Globe, CheckCircle } from "lucide-react";

import { BackButton } from "@/components/BackButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function LanguageDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const lang = await getLanguage(slug);
    const englishName = lang.names.find((n) => n.language.name === "en")?.name ?? lang.name;

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
                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-lg shadow-accent/5">
                                    <Globe className="w-6 h-6 text-accent" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
                                    Language ID #{lang.id}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-text-primary capitalize tracking-tighter">
                                {englishName}
                            </h1>
                            <p className="text-text-muted mt-4 max-w-2xl text-lg font-medium leading-relaxed italic">
                                Linguistic framework for localized species documentation and technique terminology.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
                <div className="p-16 bg-bg-secondary rounded-[40px] border border-border border-dashed">
                    <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="text-3xl font-black text-text-primary mb-4 uppercase tracking-tighter">Linguistic Integrity</h2>
                    <p className="text-text-muted italic max-w-md mx-auto text-lg">
                        This system supports the {englishName} charset across all metadata entries.
                    </p>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                        <div className="p-6 bg-bg-tertiary rounded-2xl border border-border">
                            <span className="text-[10px] font-black text-text-muted uppercase block mb-1">ISO Code</span>
                            <div className="text-xl font-black text-text-primary uppercase">{lang.iso639}</div>
                        </div>
                        <div className="p-6 bg-bg-tertiary rounded-2xl border border-border">
                            <span className="text-[10px] font-black text-text-muted uppercase block mb-1">Region Code</span>
                            <div className="text-xl font-black text-text-primary uppercase">{lang.iso3166 || "N/A"}</div>
                        </div>
                        <div className="p-6 bg-bg-tertiary rounded-2xl border border-border">
                            <span className="text-[10px] font-black text-text-muted uppercase block mb-1">Official</span>
                            <div className="text-xl font-black text-text-primary uppercase">{lang.official ? "YES" : "NO"}</div>
                        </div>
                        <div className="p-6 bg-bg-tertiary rounded-2xl border border-border">
                            <span className="text-[10px] font-black text-text-muted uppercase block mb-1">Status</span>
                            <div className="text-xl font-black text-text-primary uppercase">ACTIVE</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
