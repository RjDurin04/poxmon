import { getPokedexList } from "@/lib/api";
import { PaginatedGrid } from "@/components/PaginatedGrid";
import { Suspense } from "react";
import { BookOpen } from "lucide-react";

async function PokedexList() {
    const pokedexList = await getPokedexList(100, 0);

    return (
        <PaginatedGrid
            items={pokedexList.results}
            title="Poxmon"
            description={`${pokedexList.count} regional poxmon indexed`}
            basePath="/poxmon"
            rowsLocked={10}
            useModal={false}
        />
    );
}

export default function PokedexPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bg-primary flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-accent animate-pulse" />
        </div>}>
            <PokedexList />
        </Suspense>
    );
}
