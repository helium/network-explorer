import { StatItem } from "@/app/stats/components/StatItem"
import { Icon, StatsList } from "@/app/stats/components/StatsList"
import { fetcher, humanReadableVeHNT } from "@/app/stats/utils"
import {
  MOBILE_MINT,
  humanReadable,
  humanReadableBigint,
  toNumber,
} from "@helium/spl-utils"
import { PublicKey } from "@solana/web3.js"
import { fetchMint } from "../../stats/utils/fetchMint"
import { fetchSubDaoEpochInfo } from "../../stats/utils/fetchSubDaoEpochInfo"
import { fetchSubDaoTreasuryInfo } from "../../stats/utils/fetchSubDaoTreasuryInfo"
import { fetchTokenAccount } from "../../stats/utils/fetchTokenAccount"

type SubDaoType = {
  title: string
  activeUrl: string
  link: string
  linkText: string
  icon: Icon
}

const MOBILE_INFO: SubDaoType = {
  title: "MOBILE",
  activeUrl: "https://mobile-rewards.oracle.helium.io/active-devices",
  link: "https://docs.helium.com/helium-tokens/mobile",
  linkText: "Learn More About MOBILE",
  icon: "mobile",
}

const IOT_INFO: SubDaoType = {
  title: "IOT",
  activeUrl: "https://iot-rewards.oracle.helium.io/active-devices",
  link: "https://docs.helium.com/helium-tokens/iot",
  linkText: "Learn More About IOT",
  icon: "iot",
}

export const SubDaoInfo = async ({ sDaoMint }: { sDaoMint: PublicKey }) => {
  const { activeUrl, link, linkText, title, icon } =
    sDaoMint === MOBILE_MINT ? MOBILE_INFO : IOT_INFO
  const [activeCount, mintInfo, epochInfo, treasuryInfo] = await Promise.all([
    fetcher(activeUrl),
    fetchMint(sDaoMint),
    fetchSubDaoEpochInfo(sDaoMint),
    fetchSubDaoTreasuryInfo(sDaoMint),
  ])
  const treasuryTokenAcct = await fetchTokenAccount(treasuryInfo.info?.treasury)

  const mintSupplyNum =
    toNumber(mintInfo.info?.info.supply, mintInfo?.info?.info || 6) || 0
  const treasuryHntNum = toNumber(treasuryTokenAcct.info?.amount, 8) || 1
  const swap = mintSupplyNum / treasuryHntNum

  return (
    <StatsList title={title} link={link} linkText={linkText} icon={icon}>
      <StatItem
        label="Utility Score"
        value={humanReadableBigint(epochInfo.info?.utilityScore, 12, 0)}
        tooltip={{
          description: "Utility score for the most recently completed epoch",
          cadence: "Daily",
        }}
      />
      <StatItem
        label="Active Hotspots"
        value={activeCount.count || 0}
        tooltip={{
          description: "Hotspots active in past 24h",
          cadence: "Live",
        }}
      />
      <StatItem
        label="veHNT delegated"
        value={humanReadableVeHNT(
          epochInfo.info?.vehntAtEpochStart.toString() || "0"
        )}
        tooltip={{
          description:
            "veHNT delegated to the subDAO at the start of the most recently completed epoch",
          cadence: "Daily",
        }}
      />
      <StatItem
        label="DC Burned (24h)"
        value={humanReadable(epochInfo.info?.dcBurned, 0)}
        tooltip={{
          description:
            "DC burned by the subDAO during the most recently completed epoch",
          cadence: "Daily",
        }}
      />
      <StatItem
        label="Treasury (HNT)"
        value={humanReadableBigint(
          treasuryTokenAcct.info?.amount || BigInt(0),
          8,
          0
        )}
        tooltip={{
          description: "Current funding of the subDAO's treasury",
          cadence: "Live",
        }}
      />
      <StatItem
        label="Supply"
        value={humanReadableBigint(
          mintInfo.info?.info.supply,
          mintInfo?.info?.info || 0,
          0
        )}
        tooltip={{
          description: "Current supply of the subDAO's token",
          cadence: "Live",
        }}
      />
      <StatItem
        label="Estimated Swap"
        unit={`${title}/HNT`}
        value={Math.round(swap)}
        tooltip={{
          description: `Estimated swap rate for ${title} to HNT. This is a floor that is guaranteed by the treasury. You may find better swap rates on DEXs`,
          cadence: "Daily",
        }}
      />
    </StatsList>
  )
}
