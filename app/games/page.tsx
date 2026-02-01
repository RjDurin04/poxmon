import { getGenerationList } from "@/lib/api";
import { GenerationsClient } from "@/components/GamesClient";

export default async function GamesPage() {
    // Fetch all generations for the interactive chronology index
    const genList = await getGenerationList(20, 0);

    return (
        <GenerationsClient
            initialGens={genList.results}
            totalCount={genList.count}
        />
    );
}
