import { getRegionList } from "@/lib/api";
import { RegionsClient } from "@/components/RegionsClient";

export default async function RegionsPage() {
    const regionList = await getRegionList(20, 0);

    return <RegionsClient regionList={regionList} />;
}
