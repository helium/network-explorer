import { BN } from "@coral-xyz/anchor"
import { currentEpoch } from "@helium/helium-sub-daos-sdk"
import { IOT_MINT, MOBILE_MINT } from "@helium/spl-utils"
import { useMemo } from "react"
import { useSubDaoEpochInfo } from "../hooks/useSubDaoEpochInfo"
import { useUnixTimestamp } from "../hooks/useUnixTimestamp"
import { veHNTWoDecimal } from "../utils"

export const DelegationHistory = () => {
  const unixTime = useUnixTimestamp()
  const epoch = currentEpoch(new BN(unixTime)).toNumber()
  const mobileEpochs: any[] = useMemo(() => [], [])
  const iotEpochs: any[] = useMemo(() => [], [])
  const epochsSinceMigration = epoch - 19467

  for (let offset = 1; offset <= Math.min(epochsSinceMigration, 30); offset++) {
    if (epoch - offset >= 19467) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      mobileEpochs.push(useSubDaoEpochInfo(MOBILE_MINT, offset))
      // eslint-disable-next-line react-hooks/rules-of-hooks
      iotEpochs.push(useSubDaoEpochInfo(IOT_MINT, offset))
    }
  }

  const isReady =
    mobileEpochs.every((epoch) => epoch.loading === false && !!epoch.info) &&
    iotEpochs.every((epoch) => epoch.loading === false && !!epoch.info)

  const cleanedData = useMemo(() => {
    if (!isReady) return []

    return mobileEpochs
      .map((mEpoch, index) => {
        const iotInfo = iotEpochs[index].info
        const mobileInfo = mEpoch.info
        const mobileDelegated = veHNTWoDecimal(
          mobileInfo.vehntAtEpochStart.toString()
        )
        const iotDelegated = veHNTWoDecimal(
          iotInfo.vehntAtEpochStart.toString()
        )
        const ratio = iotDelegated / (mobileDelegated + iotDelegated)
        return {
          iotDelegated,
          mobileDelegated,
          ratio,
        }
      })
      .reverse()
  }, [isReady, mobileEpochs, iotEpochs])

  return <div>Delegation History</div>
}
