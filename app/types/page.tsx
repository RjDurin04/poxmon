import { getTypeList } from "@/lib/api";
import Link from "next/link";

const TYPE_COLORS: Record<string, string> = {
    normal: "bg-gray-400/20 text-gray-300",
    fire: "bg-red-500/20 text-red-400",
    water: "bg-blue-500/20 text-blue-400",
    electric: "bg-yellow-400/20 text-yellow-300",
    grass: "bg-green-500/20 text-green-400",
    ice: "bg-cyan-300/20 text-cyan-300",
    fighting: "bg-orange-600/20 text-orange-400",
    poison: "bg-purple-500/20 text-purple-400",
    ground: "bg-amber-600/20 text-amber-400",
    flying: "bg-indigo-300/20 text-indigo-300",
    psychic: "bg-pink-500/20 text-pink-400",
    bug: "bg-lime-500/20 text-lime-400",
    rock: "bg-stone-500/20 text-stone-400",
    ghost: "bg-purple-700/20 text-purple-400",
    dragon: "bg-violet-600/20 text-violet-400",
    dark: "bg-stone-700/20 text-stone-300",
    steel: "bg-slate-400/20 text-slate-300",
    fairy: "bg-pink-300/20 text-pink-300",
};

export default async function TypesPage() {
    const typeList = await getTypeList(30, 0);

    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-b from-bg-secondary to-bg-primary py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">Types</h1>
                    <p className="text-text-secondary text-lg">Elemental classification system</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {typeList.results.map((type) => (
                        <Link
                            key={type.name}
                            href={`/types/${type.name}`}
                            className={`p-4 rounded-xl border border-border hover:border-accent/50 transition-all text-sm font-medium capitalize text-center ${TYPE_COLORS[type.name] || "bg-bg-secondary"}`}
                        >
                            {type.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
