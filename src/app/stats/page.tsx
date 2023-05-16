import { MapCover } from "@/components/MapCover"
import { IOT_MINT, MOBILE_MINT } from "@helium/spl-utils"
import { Governance } from "./components/Governance"
import { HntInfo } from "./components/HntInfo"
import { SubDaoInfo } from "./components/SudDaoInfo"

export const revalidate = 60 * 5 // revalidate 5 minutes

export default async function Page() {
  return (
    <MapCover title="Network Stats">
      <div className="overflow-y-auto pr-2">
        {/* @ts-expect-error Async Server Component */}
        <HntInfo />
        {/* @ts-expect-error Async Server Component */}
        <SubDaoInfo sDaoMint={MOBILE_MINT} />
        {/* @ts-expect-error Async Server Component */}
        <SubDaoInfo sDaoMint={IOT_MINT} />
        {/* @ts-expect-error Async Server Component */}
        <Governance />
      </div>
    </MapCover>
  )
}
