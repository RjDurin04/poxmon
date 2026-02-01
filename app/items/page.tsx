import { getItemList } from "@/lib/api";
import { ItemsClient } from "@/components/ItemsClient";

export default async function ItemsPage() {
    // Fetch all items for instant client-side search and management
    const itemList = await getItemList(2500, 0);

    return (
        <ItemsClient
            initialItems={itemList.results}
            totalCount={itemList.count}
        />
    );
}
