import { StatItem } from "@/app/stats/components/StatItem"
import { Icon, StatsList } from "@/app/stats/components/StatsList"
import { fetcher, humanReadableVeToken } from "@/app/stats/utils"
import {
  IOT_MINT,
  MOBILE_MINT,
  humanReadable,
  humanReadableBigint,
  numberWithCommas,
  toNumber,
} from "@helium/spl-utils"
import { PublicKey } from "@solana/web3.js"
import { isBefore } from "date-fns"
import { fetchMint } from "../utils/fetchMint"
import { fetchSubDaoEpochInfo } from "../utils/fetchSubDaoEpochInfo"
import { fetchSubDaoTreasuryInfo } from "../utils/fetchSubDaoTreasuryInfo"
import { fetchTokenAccount } from "../utils/fetchTokenAccount"
import {
  AUG_1_2023,
  getDailyEmisisons,
  getRemainingEmissions,
} from "../utils/remainingEmissions"
import { SubDao } from "../utils/types"

type SubDaoType = {
  title: string
  activeUrl: string
  link: string
  linkText: string
  icon: Icon
  subDaoMint: PublicKey
  dailyEmissions: number
  maxDescription: string
}

const MOBILE_INFO: SubDaoType = {
  title: "MOBILE",
  activeUrl: "https://mobile-rewards.oracle.helium.io/active-devices",
  link: "https://docs.helium.com/helium-tokens/mobile",
  linkText: "Learn More About MOBILE",
  icon: "mobile",
  subDaoMint: MOBILE_MINT,
  dailyEmissions: 108493150,
  maxDescription:
    "Uses theoretical max emissions. In reality only 66% of max are emitted as mappers, service providers, and oracles have yet to be implemented.",
}

const IOT_INFO: SubDaoType = {
  title: "IOT",
  activeUrl: "https://iot-rewards.oracle.helium.io/active-devices",
  link: "https://docs.helium.com/helium-tokens/iot",
  linkText: "Learn More About IOT",
  icon: "iot",
  subDaoMint: IOT_MINT,
  dailyEmissions: 165616438,
  maxDescription:
    "Uses theoretical max emissions. In reality only 93% of max are emitted as oracles do not currently receive rewards.",
}

export const SubDaoInfo = async ({ subDao }: { subDao: SubDao }) => {
  const {
    activeUrl,
    link,
    linkText,
    title,
    icon,
    subDaoMint,
    dailyEmissions,
    maxDescription,
  } = subDao === "mobile" ? MOBILE_INFO : IOT_INFO
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

  const remainingEmissions = Math.round(
    getRemainingEmissions(new Date(), subDao)
  )
  const maxSupply =
    mintInfo.info?.info.supply! + BigInt(remainingEmissions) * BigInt(1000000)

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
          mintInfo.info?.info.supply!,
          mintInfo?.info?.info.decimals || 0,
          0
        )}
        tooltip={{
          description: `Current supply of ${title}.`,
          cadence: "Live",
          id: `${title} Supply`,
        }}
      />
      <StatItem
        label="Max Supply"
        value={humanReadableBigint(
          maxSupply,
          mintInfo?.info?.info.decimals || 0,
          0
        )}
        tooltip={{
          description: `Maximum supply of ${title} derived by current supply plus remaining emissions. ${maxDescription}`,
          cadence: "Live",
          id: `${title} Max Supply`,
        }}
      />
      <StatItem
        label="Daily Emissions"
        value={numberWithCommas(
          isBefore(new Date(), AUG_1_2023)
            ? dailyEmissions
            : Math.round(getDailyEmisisons(new Date(), subDao, "current"))
        )}
        tooltip={{
          description: `Amount of ${title} emitted each day.`,
          cadence: "Constant",
          id: `${title} Daily Emissions`,
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
