import { BN } from "@coral-xyz/anchor"
import { amountAsNum } from "@helium/spl-utils"
import { ONE_DAY_MS, ONE_DAY_UNIX } from "../utils"
import { fetchRecentEpochs } from "../utils/fetchRecentEpochs"
import { GraphWrapper } from "./GraphWrapper"
import { NetworkUsageGraph, NetworkUsageGraphRow } from "./NetworkUsageGraph"

export const NetworkUsage = async () => {
  const { mobileEpochs, iotEpochs } = await fetchRecentEpochs()

  const cleanedData: NetworkUsageGraphRow[] = mobileEpochs
    .map((mEpoch, index) => {
      const iotInfo = iotEpochs[index].info
      const mobileInfo = mEpoch.info

      // need to pass date as a number to client side
      const date = amountAsNum(mobileInfo.epoch, 0) * ONE_DAY_MS

      const mobileUsage = amountAsNum(mobileInfo.dcBurned, 5)
      const iotUsage = amountAsNum(iotInfo.dcBurned, 5)

      const totalUsage: BN = (mobileInfo.dcBurned as BN)
        .clone()
        .add(iotInfo.dcBurned)

      let projectedRemaining = 0
      let total = totalUsage

      if (index === 0) {
        const now = new Date().valueOf() / 1000
        const timeElapsed = now % ONE_DAY_UNIX
        const percent = Math.max(timeElapsed / ONE_DAY_UNIX, 0.0001)
        const projectedTotal: BN = totalUsage
          .mul(new BN(10000))
          .div(new BN(percent * 10000))

        total = projectedTotal
        projectedRemaining = amountAsNum(projectedTotal.sub(totalUsage), 5)
      }

      const rate = amountAsNum(total.clone().div(new BN(24)), 5)

      return {
        iotUsage,
        mobileUsage,
        date,
        rate,
        projectedRemaining,
      }
    })
    .reverse()

  return (
    <div className="mt-2">
      <GraphWrapper label="Network Usage in USD (30 days)">
        <NetworkUsageGraph data={cleanedData} />
      </GraphWrapper>
    </div>
  )
}
