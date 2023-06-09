import { StatItem } from "@/app/stats/components/StatItem"
import { Icon, StatsList } from "@/app/stats/components/StatsList"
import { fetcher, humanReadableVeToken } from "@/app/stats/utils"
import {
  IOT_MINT,
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
import { SubDao } from "../utils/types"

type SubDaoType = {
  title: string
  activeUrl: string
  link: string
  linkText: string
  icon: Icon
  subDaoMint: PublicKey
}

const MOBILE_INFO: SubDaoType = {
  title: "MOBILE",
  activeUrl: "https://mobile-rewards.oracle.helium.io/active-devices",
  link: "https://docs.helium.com/helium-tokens/mobile",
  linkText: "Learn More About MOBILE",
  icon: "mobile",
  subDaoMint: MOBILE_MINT,
}

const IOT_INFO: SubDaoType = {
  title: "IOT",
  activeUrl: "https://iot-rewards.oracle.helium.io/active-devices",
  link: "https://docs.helium.com/helium-tokens/iot",
  linkText: "Learn More About IOT",
  icon: "iot",
  subDaoMint: IOT_MINT,
}

export const SubDaoInfo = async ({ subDao }: { subDao: SubDao }) => {
  const { activeUrl, link, linkText, title, icon, subDaoMint } =
    subDao === "mobile" ? MOBILE_INFO : IOT_INFO
  const [activeCount, mintInfo, epochInfo, treasuryInfo] = await Promise.all([
    fetcher(activeUrl),
    fetchMint(subDaoMint),
    fetchSubDaoEpochInfo(subDao),
    fetchSubDaoTreasuryInfo(subDaoMint),
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
          description: "Utility score for the most recently completed epoch.",
          cadence: "Daily",
          id: "Utility Score",
        }}
      />
      <StatItem
        label="Active Hotspots"
        value={activeCount.count || 0}
        tooltip={{
          description: "Hotspots active in past 24h.",
          cadence: "Live",
          id: "Active Hotspots",
        }}
      />
      <StatItem
        label="veHNT delegated"
        value={humanReadableVeToken(
          epochInfo.info?.vehntAtEpochStart.toString() || "0",
          8
        )}
        tooltip={{
          description: `veHNT delegated to the ${title} subDAO at the start of the most recently completed epoch.`,
          cadence: "Daily",
          id: `${title} veHNT delegated`,
        }}
      />
      <StatItem
        label="DC Burned (24h)"
        value={humanReadable(epochInfo.info?.dcBurned, 0)}
        tooltip={{
          description: `DC burned for data transfer by the ${title} subDAO during the most recently completed epoch.`,
          cadence: "Daily",
          id: `${title} DC Burned (24h)`,
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
          description: `Current funding of ${title}'s treasury.`,
          cadence: "Live",
          id: `${title} Treasury (HNT)`,
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
          description: `Current supply of ${title}.`,
          cadence: "Live",
          id: `${title} Supply`,
        }}
      />
      <StatItem
        label="Estimated Swap"
        unit={`${title}/HNT`}
        value={Math.round(swap)}
        tooltip={{
          description: `Estimated swap rate for ${title} to HNT. This is a floor that is guaranteed by the treasury. You may find better swap rates on DEXs.`,
          cadence: "Daily",
          id: `${title} Estimated Swap`,
        }}
      />
    </StatsList>
  )
}
