import { StatItem } from "@/app/stats/components/StatItem"
import { StatsList } from "@/app/stats/components/StatsList"
import { ONE_DAY_MS, fetcher } from "@/app/stats/utils"
import { BN } from "@coral-xyz/anchor"
import { currentEpoch } from "@helium/helium-sub-daos-sdk"
import {
  HNT_MINT,
  amountAsNum,
  humanReadable,
  humanReadableBigint,
} from "@helium/spl-utils"
import { format } from "date-fns"
import { fetchSubDaoEpochInfo } from "../../stats/utils/fetchSubDaoEpochInfo"
import { fetchUnixTimestap } from "../../stats/utils/fetchUnixTimestamp"
import { fetchHntGovernanceStats } from "../utils/fetchGovernanceMetrics"
import { fetchMint } from "../utils/fetchMint"
import { Countdown } from "./Countdown"

const COINGECKO_HNT_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=helium&vs_currencies=usd"
const NEXT_HALVENING = 1690848000 // unix time

export const HntInfo = async () => {
  const [unixTime, hntPrice, hntMint, governanceStats, epochInfo] =
    await Promise.all([
      fetchUnixTimestap(),
      fetcher(COINGECKO_HNT_URL),
      fetchMint(HNT_MINT),
      fetchHntGovernanceStats(),
      fetchSubDaoEpochInfo("mobile"),
    ])

  const hntStakedTotal = governanceStats.network.total.hnt
  const hntStakedPercent = hntStakedTotal
    .mul(new BN(10000))
    .div(new BN(hntMint.info?.info.supply))

  const epoch = currentEpoch(new BN(unixTime)).toNumber()
  const lastEpochEnd = amountAsNum(epochInfo.info?.rewardsIssuedAt || 0, 0)

  return (
    <StatsList
      title="HNT"
      link="https://docs.helium.com/helium-tokens/hnt"
      linkText="Learn More About HNT"
      icon="hnt"
    >
      <StatItem
        label="Price (HNT)"
        value={`$${hntPrice.helium.usd.toFixed(2)}`}
        tooltip={{ sourceText: "Coingecko", cadence: "Live", id: "HNT Price" }}
      />
      <StatItem
        label="Last Epoch Ended"
        value={format(new Date(lastEpochEnd * 1000), "Y/MM/dd HH:mm:ss")}
      />
      <StatItem label="Current Epoch" value={epoch} />
      <StatItem label="Next Epoch In">
        <Countdown date={epoch * ONE_DAY_MS + ONE_DAY_MS} />
      </StatItem>
      <StatItem label="Halvening In">
        <Countdown date={NEXT_HALVENING * 1000} />
      </StatItem>
      <StatItem
        label="Supply"
        value={humanReadableBigint(
          hntMint.info?.info.supply,
          hntMint?.info?.info || 8,
          0
        )}
        tooltip={{
          description: "Current supply of HNT.",
          cadence: "Live",
          id: "HNT Supply",
        }}
      />
      <StatItem
        label="Supply Staked"
        value={`${humanReadable(hntStakedPercent, 2)}%`}
        tooltip={{
          description:
            "Percent of current HNT which is staked as veHNT on Realms.",
          id: "HNT Supply Staked",
        }}
      />
    </StatsList>
  )
}
