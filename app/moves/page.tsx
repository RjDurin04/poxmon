import { getMoveList } from "@/lib/api";
import { PaginatedGrid } from "@/components/PaginatedGrid";

export default async function MovesPage() {
    const moveList = await getMoveList(1000, 0);

    return (
        <PaginatedGrid
            items={moveList.results}
            title="Moves"
            description={`${moveList.count} combat techniques in the database`}
            basePath="/moves"
            rowsLocked={10}
        />
    );
}
