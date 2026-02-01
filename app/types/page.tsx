import { getTypeList } from "@/lib/api";
import { TypesClient } from "@/components/TypesClient";

export default async function TypesPage() {
    // Fetch types for the interactive Elemental Matrix
    const typeList = await getTypeList(30, 0);

    return (
        <TypesClient
            initialTypes={typeList.results}
            totalCount={typeList.count}
        />
    );
}
