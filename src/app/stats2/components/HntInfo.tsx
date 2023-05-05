import { StatItem } from "@/app/stats/components/StatItem"
import { StatsList } from "@/app/stats/components/StatsList"
import { ONE_DAY_MS, fetcher } from "@/app/stats/utils"
import { BN } from "@coral-xyz/anchor"
import { currentEpoch } from "@helium/helium-sub-daos-sdk"
import { fetchUnixTimestap } from "../api/utils/fetchUnixTimestamp"
import { Countdown } from "./Countdown"

const COINGECKO_HNT_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=helium&vs_currencies=usd"
const NEXT_HALVENING = 1690848000 // unix time

export const HntInfo = async () => {
  const unixTime = await fetchUnixTimestap()
  const hntPrice = await fetcher(COINGECKO_HNT_URL)
  const epoch = currentEpoch(new BN(unixTime)).toNumber()
  // const epochInfo = await fetchSubDaoEpochInfo(MOBILE_MINT)

  return (
    <StatsList
      title="HNT"
      link="https://docs.helium.com/helium-tokens/hnt"
      linkText="Learn More About HNT"
      icon="hnt"
      iconStyles="fill-[#474DFF]"
    >
      <StatItem
        label="Price (HNT)"
        value={`$${hntPrice.helium.usd}`}
        tooltip={{ sourceText: "Coingecko", cadence: "Live" }}
      />
      <StatItem label="Current Epoch" value={epoch} />
      <StatItem label="Next Epoch In">
        <Countdown date={epoch * ONE_DAY_MS + ONE_DAY_MS} />
      </StatItem>
      <StatItem label="Halvening In">
        <Countdown date={NEXT_HALVENING * 1000} />
      </StatItem>
      <StatItem label="Landrush Period End">
        <Countdown date={100} />
      </StatItem>
      {/* <StatItem
        label="Last Epoch Ended"
        value={format(new Date(lastEpochEnd * 1000), "Y/MM/dd HH:mm:ss")}
      /> */}
    </StatsList>
  )
}
