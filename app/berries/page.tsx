import { getBerryList } from "@/lib/api";
import { BerriesClient } from "@/components/BerriesClient";

export default async function BerriesPage() {
    // Fetch all berries for instant client-side search and analysis
    const berryList = await getBerryList(100, 0);

    return (
        <BerriesClient
            initialBerries={berryList.results}
            totalCount={berryList.count}
        />
    );
}
