import { StatItem } from "@/app/stats/components/StatItem"
import { StatsList } from "@/app/stats/components/StatsList"
import { ONE_DAY_MS, fetcher } from "@/app/stats/utils"
import { db } from "@/knex/db"
import { MaxSupply } from "@/knex/maxSupply"
import { BN } from "@coral-xyz/anchor"
import { currentEpoch } from "@helium/helium-sub-daos-sdk"
import {
  HNT_MINT,
  amountAsNum,
  humanReadable,
  humanReadableBigint,
  numberWithCommas,
} from "@helium/spl-utils"
import { format } from "date-fns"
import { fetchSubDaoEpochInfo } from "../../stats/utils/fetchSubDaoEpochInfo"
import { fetchUnixTimestap } from "../../stats/utils/fetchUnixTimestamp"
import {
  fetchHntBurn,
  fetchHntEmissions,
} from "../utils/dune/fetchHntEmissions"
import { fetchHntGovernanceStats } from "../utils/fetchGovernanceMetrics"
import { fetchMint } from "../utils/fetchMint"
import { getNextHalvening } from "../utils/getNextHalvening"
import { getRemainingEmissions } from "../utils/remainingEmissions"
import { Countdown } from "./Countdown"

const COINGECKO_HNT_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=helium&vs_currencies=usd"
const MAX_DAILY_NET_EMISSIONS = 1643.835616
const DATE_FORMAT = "M/dd HH:mm"

export const HntInfo = async () => {
  const [
    unixTime,
    hntPrice,
    hntMint,
    governanceStats,
    epochInfo,
    hntEmissions,
    hntBurned,
  ] = await Promise.all([
    fetchUnixTimestap(),
    fetcher(COINGECKO_HNT_URL),
    fetchMint(HNT_MINT),
    fetchHntGovernanceStats(),
    fetchSubDaoEpochInfo("mobile"),
    fetchHntEmissions(),
    fetchHntBurn(),
  ])

  const hntStakedTotal = governanceStats.network.total.hnt
  const hntStakedPercent = hntStakedTotal
    .mul(new BN(10000))
    .div(new BN(hntMint.info?.info.supply))

  const epoch = currentEpoch(new BN(unixTime)).toNumber()
  const lastEpochEnd = amountAsNum(epochInfo.info?.rewardsIssuedAt || 0, 0)

  const isSameDay =
    Math.floor(
      new Date(hntBurned.execution_started_at).valueOf() / ONE_DAY_MS
    ) === Math.floor(new Date().valueOf() / ONE_DAY_MS)
  const todayHntBurn = isSameDay
    ? hntBurned.result.rows.reverse()[0].hnt_burned.substring(1)
    : "0"

  const remainingHntEmissions = Math.round(
    getRemainingEmissions(new Date(), "hnt")
  )
  const maxSupply =
    hntMint.info?.info.supply! +
    BigInt(remainingHntEmissions) * BigInt(100000000) +
    BigInt(
      Math.ceil(
        Math.min(parseFloat(todayHntBurn), MAX_DAILY_NET_EMISSIONS) * 10000
      )
    ) *
      BigInt(10000)

  const maxSupplyDb = new MaxSupply(db)
  const maxSupplyRecord = await maxSupplyDb.latestOrInsert({
    recorded_at: isSameDay
      ? new Date(hntBurned.execution_started_at)
      : new Date(),
    hnt_burned:
      BigInt(Math.round(parseFloat(todayHntBurn) * 10000)) * BigInt(10000),
    supply: hntMint.info?.info.supply!,
    max_supply: maxSupply,
  })

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
        <Countdown date={getNextHalvening()} />
      </StatItem>
      <StatItem
        label="Supply"
        value={humanReadableBigint(
          hntMint.info?.info.supply!,
          hntMint?.info?.info.decimals || 8,
          0
        )}
        tooltip={{
          description: "Current supply of HNT.",
          cadence: "Live",
          id: "HNT Supply",
        }}
      />
      <StatItem
        label="Max Supply"
        value={`~${humanReadableBigint(
          maxSupplyRecord.max_supply,
          hntMint?.info?.info.decimals || 8,
          0
        )}`}
        tooltip={{
          description:
            "Maximum supply of HNT derived by summing current supply, remaining emissions, and today's burned HNT (which are re-emitted via net emissions). This is an upper limit that will not be reached and does not consider future HNT burn. Accurate within 1643 HNT.",
          cadence: `Every 8h (last run ${format(
            maxSupplyRecord.recorded_at,
            DATE_FORMAT
          )})`,
          id: "HNT Max Supply",
        }}
      />
      <StatItem
        label="Latest Emission"
        value={numberWithCommas(
          parseInt(hntEmissions.totalEmissions.result.rows[0].hnt_minted, 10),
          0
        )}
        tooltip={{
          description: `Amount of HNT emitted last epoch.`,
          cadence: "Daily",
          id: `HNT Daily Emissions`,
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
