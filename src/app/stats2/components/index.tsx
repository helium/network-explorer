import { IOT_MINT, MOBILE_MINT } from "@helium/spl-utils"
import { HntInfo } from "./HntInfo"
import { SubDaoInfo } from "./SudDaoInfo"

export const Stats = () => {
  return (
    <div className="overflow-y-auto pr-2">
      {/* @ts-expect-error Async Server Component */}
      <HntInfo />
      {/* @ts-expect-error Async Server Component */}
      <SubDaoInfo sDaoMint={MOBILE_MINT} />
      {/* @ts-expect-error Async Server Component */}
      <SubDaoInfo sDaoMint={IOT_MINT} />
      {/* <DelegationHistory /> */}
    </div>
  )
}
