import { getAbilityList } from "@/lib/api";
import { AbilitiesClient } from "@/components/AbilitiesClient";

export default async function AbilitiesPage() {
    // Fetch all abilities for instant client-side search and analysis
    const abilityList = await getAbilityList(1000, 0);

    return (
        <AbilitiesClient
            initialAbilities={abilityList.results}
            totalCount={abilityList.count}
        />
    );
}
