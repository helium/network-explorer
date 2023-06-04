import { BN } from "@coral-xyz/anchor"
import { amountAsNum } from "@helium/spl-utils"
import { ONE_DAY_MS, ONE_DAY_UNIX } from "../utils"
import { fetchRecentEpochs } from "../utils/fetchRecentEpochs"
import { GraphWrapper } from "./GraphWrapper"
import { NetworkUsageGraph, NetworkUsageGraphRow } from "./NetworkUsageGraph"

export const NetworkUsage = async () => {
  const { mobileEpochs, iotEpochs } = await fetchRecentEpochs()

  const now = new Date().valueOf() / 1000
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

      const timeElapsed = index === 0 ? now % ONE_DAY_UNIX : ONE_DAY_UNIX
      const percent = timeElapsed / ONE_DAY_UNIX
      const projectedTotal = totalUsage
        .mul(new BN(10000))
        .div(new BN(percent * 100)) // 7 digits
      const rate = amountAsNum(projectedTotal.clone().div(new BN(24)), 7)

      const projectedRemaining =
        index === 0
          ? amountAsNum(projectedTotal.div(new BN(100)).sub(totalUsage), 5)
          : 0

      return {
        iotUsage,
        mobileUsage,
        date,
        rate,
        projectedRemaining,
      }
    })
    .slice() // removing most recent day since incomplete data
    .reverse()

  return (
    <div className="mt-2">
      <GraphWrapper label="Network Usage in USD (30 days)">
        <NetworkUsageGraph data={cleanedData} />
      </GraphWrapper>
    </div>
  )
}
