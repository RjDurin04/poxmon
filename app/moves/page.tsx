import { getMoveList } from "@/lib/api";
import { MovesClient } from "@/components/MovesClient";

export default async function MovesPage() {
    // Fetch all moves (approx 900+) to enable fast client-side searching
    const moveList = await getMoveList(1000, 0);

    return (
        <MovesClient
            initialMoves={moveList.results}
            totalCount={moveList.count}
        />
    );
}
