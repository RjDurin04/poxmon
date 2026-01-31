import { getAbilityList } from "@/lib/api";
import { PaginatedGrid } from "@/components/PaginatedGrid";

export default async function AbilitiesPage() {
    const abilityList = await getAbilityList(1000, 0);

    return (
        <PaginatedGrid
            items={abilityList.results}
            title="Abilities"
            description={`${abilityList.count} passive effects catalogued`}
            basePath="/abilities"
            rowsLocked={10}
        />
    );
}
