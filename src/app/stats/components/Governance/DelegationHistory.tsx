import { ONE_DAY_MS, veTokenWoDecimal } from "@/app/stats/utils"
import { amountAsNum } from "@helium/spl-utils"
import { fetchRecentEpochs } from "../../utils/fetchRecentEpochs"
import { DelegationHistoryGraph } from "./DelegationHistoryGraph"

export const DelegationHistory = async () => {
  const { mobileEpochs, iotEpochs } = await fetchRecentEpochs()

  const getCleanedData = () => {
    return mobileEpochs
      .map((mEpoch, index) => {
        const iotInfo = iotEpochs[index].info
        const mobileInfo = mEpoch.info
        // need to pass date as a number to client side
        const date = amountAsNum(mobileInfo.epoch, 0) * ONE_DAY_MS

        const mobileDelegated = veTokenWoDecimal(
          mobileInfo.vehntAtEpochStart.toString(),
          8
        )
        const iotDelegated = veTokenWoDecimal(
          iotInfo.vehntAtEpochStart.toString(),
          8
        )
        const percentIot =
          (iotDelegated / (mobileDelegated + iotDelegated)) * 100
        return {
          iotDelegated,
          mobileDelegated,
          percentIot,
          date,
        }
      })
      .reverse()
  }

  return <DelegationHistoryGraph data={getCleanedData()} />
}
