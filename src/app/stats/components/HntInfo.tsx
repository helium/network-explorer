"use client"

import { HeliumIcon } from "@/components/icons/HeliumIcon"
import { BN } from "@coral-xyz/anchor"
import { currentEpoch } from "@helium/helium-sub-daos-sdk"
import { MOBILE_MINT, amountAsNum, toNumber } from "@helium/spl-utils"
import { format } from "date-fns"
import { useAsync } from "react-async-hook"
import Countdown from "react-countdown"
import { useRegistrar } from "../hooks/useRegistrar"
import { useSubDaoEpochInfo } from "../hooks/useSubDaoEpochInfo"
import { useUnixTimestamp } from "../hooks/useUnixTimestamp"
import { ONE_DAY_MS, fetcher } from "../utils"
import { CountdownRenderer, StatItem } from "./StatItem"
import { StatsList } from "./StatsList"

const COINGECKO_HNT_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=helium&vs_currencies=usd"
const NEXT_HALVENING = 1690848000 // unix time

export const HntInfo = () => {
  const hntPrice = useAsync(fetcher, [COINGECKO_HNT_URL])
  const unixTime = useUnixTimestamp()
  const epoch = currentEpoch(new BN(unixTime)).toNumber()
  const epochInfo = useSubDaoEpochInfo(MOBILE_MINT)
  const lastEpochEnd = amountAsNum(epochInfo.info?.rewardsIssuedAt || 0, 0)
  const registrar = useRegistrar()
  const landrushDeadline = toNumber(
    registrar.info?.votingMints[0].genesisVotePowerMultiplierExpirationTs || 0,
    0
  )

  return (
    <StatsList
      title="HNT"
      link="https://docs.helium.com/helium-tokens/hnt"
      linkText="Learn More About HNT"
      Icon={HeliumIcon}
      iconStyles="fill-[#474DFF]"
    >
      <StatItem
        label="Price (HNT)"
        value={`$${hntPrice.result?.helium.usd}`}
        tooltip={{ sourceText: "Coingecko", cadence: "Live" }}
      />
      <StatItem label="Current Epoch" value={epoch} />
      <StatItem
        label="Next Epoch In"
        value={
          <Countdown
            date={epoch * ONE_DAY_MS + ONE_DAY_MS}
            renderer={CountdownRenderer}
          />
        }
      />
      <StatItem
        label="Halvening In"
        value={
          <Countdown
            date={NEXT_HALVENING * 1000}
            renderer={CountdownRenderer}
          />
        }
      />
      <StatItem
        label="Landrush Period End"
        value={
          !!landrushDeadline ? (
            <Countdown
              date={landrushDeadline * 1000}
              renderer={CountdownRenderer}
            />
          ) : (
            "Loading"
          )
        }
      />
      <StatItem
        label="Last Epoch Ended"
        value={format(new Date(lastEpochEnd * 1000), "Y/MM/dd HH:mm:ss")}
      />
    </StatsList>
  )
}
