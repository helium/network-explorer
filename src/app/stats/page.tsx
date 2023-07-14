import { MapCover } from "@/components/MapCover"
import { Governance } from "./components/Governance"
import { HntEmissions } from "./components/HntEmissions"
import { HntInfo } from "./components/HntInfo"
import { NetworkUsage } from "./components/NetworkUsage"
import { SubDaoInfo } from "./components/SubDaoInfo"

export const revalidate = 300 // revalidate 5 minutes

export default async function Page() {
  return (
    <MapCover title="Network Stats">
      <div className="overflow-y-auto pr-2">
        {/* @ts-expect-error Async Server Component */}
        <HntInfo />
        {/* @ts-expect-error Async Server Component */}
        <SubDaoInfo subDao={"iot"} />
        {/* @ts-expect-error Async Server Component */}
        <SubDaoInfo subDao={"mobile"} />
        {/* @ts-expect-error Async Server Component */}
        <NetworkUsage />
        {/* @ts-expect-error Async Server Component */}
        <HntEmissions />
        {/* @ts-expect-error Async Server Component */}
        <Governance />
      </div>
    </MapCover>
  )
}
