import { getGenerationList } from "@/lib/api";
import Link from "next/link";

export default async function GamesPage() {
    const genList = await getGenerationList(20, 0);

    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-b from-bg-secondary to-bg-primary py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">Generations</h1>
                    <p className="text-text-secondary text-lg">Game series timeline</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {genList.results.map((gen) => (
                        <Link
                            key={gen.name}
                            href={`/games/${gen.name}`}
                            className="p-6 bg-bg-secondary border border-border rounded-xl hover:border-accent/50 hover:bg-bg-tertiary transition-all text-center"
                        >
                            <span className="text-xl font-bold">{gen.name.replace("generation-", "Gen ").toUpperCase()}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
