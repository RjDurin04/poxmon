import { getRegionList, getLocationList } from "@/lib/api";
import { LocationsClient } from "@/components/LocationsClient";

export default async function LocationsPage() {
    // Fetch regions for the registry sidebar and initial locations for the grid
    const regionList = await getRegionList(20, 0);
    const initialLocations = await getLocationList(24, 0);

    return (
        <LocationsClient
            regionList={regionList}
            initialLocations={initialLocations}
        />
    );
}
