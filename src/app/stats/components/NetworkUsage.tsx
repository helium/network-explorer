import { amountAsNum } from "@helium/spl-utils"
import { ONE_DAY_MS } from "../utils"
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
      return {
        iotUsage,
        mobileUsage,
        date,
      }
    })
    .slice(1) // removing most recent day since incomplete data
    .reverse()

  return (
    <div className="mt-2">
      <GraphWrapper label="Network Usage in USD (30 days)">
        <NetworkUsageGraph data={cleanedData} />
      </GraphWrapper>
    </div>
  )
}
