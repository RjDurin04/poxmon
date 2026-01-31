import { getBerryList } from "@/lib/api";
import { PaginatedGrid } from "@/components/PaginatedGrid";

export default async function BerriesPage() {
    const berryList = await getBerryList(100, 0);

    return (
        <PaginatedGrid
            items={berryList.results}
            title="Berries"
            description={`${berryList.count} berry types catalogued`}
            basePath="/berries"
            rowsLocked={10}
            useModal={false}
        />
    );
}
