import { getItemList } from "@/lib/api";
import { PaginatedGrid } from "@/components/PaginatedGrid";

export default async function ItemsPage() {
    const itemList = await getItemList(2500, 0);

    return (
        <PaginatedGrid
            items={itemList.results}
            title="Items"
            description={`${itemList.count} items in the database`}
            basePath="/items"
            rowsLocked={10}
            useModal={false}
        />
    );
}
