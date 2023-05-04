import { HntInfo } from "./HntInfo"

export const Stats = () => {
  return (
    <div className="overflow-y-auto pr-2">
      {/* @ts-expect-error Async Server Component */}
      <HntInfo />
      {/* <SubDaoInfo sDaoMint={MOBILE_MINT} />
        <SubDaoInfo sDaoMint={IOT_MINT} />
        <DelegationHistory /> */}
    </div>
  )
}
