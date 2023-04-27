"use client"

import { HeliumIotIcon } from "@/components/icons/HeliumIotIcon"
import { HeliumMobileIcon } from "@/components/icons/HeliumMobileIcon"
import { useMint, useTokenAccount } from "@helium/helium-react-hooks"
import {
  MOBILE_MINT,
  humanReadable,
  humanReadableBigint,
  toNumber,
} from "@helium/spl-utils"
import { PublicKey } from "@solana/web3.js"
import { useAsync } from "react-async-hook"
import { useSubDaoEpochInfo } from "../hooks/useSubDaoEpochInfo"
import { useSubDaoTreasuryInfo } from "../hooks/useSubDaoTreasuryInfo"
import { fetcher, humanReadableVeHNT } from "../utils"
import { StatItem } from "./StatItem"
import { StatsList } from "./StatsList"

const MOBILE_INFO = {
  title: "MOBILE",
  activeUrl: "https://mobile-rewards.oracle.helium.io/active-devices",
  link: "https://docs.helium.com/helium-tokens/mobile",
  linkText: "Learn More About MOBILE",
  Icon: HeliumMobileIcon,
}

const IOT_INFO = {
  title: "IOT",
  activeUrl: "https://iot-rewards.oracle.helium.io/active-devices",
  link: "https://docs.helium.com/helium-tokens/iot",
  linkText: "Learn More About IOT",
  Icon: HeliumIotIcon,
}

export const SubDaoInfo = ({ sDaoMint }: { sDaoMint: PublicKey }) => {
  const { activeUrl, link, linkText, title, Icon } =
    sDaoMint === MOBILE_MINT ? MOBILE_INFO : IOT_INFO
  const activeCount = useAsync(fetcher, [activeUrl])
  const mintInfo = useMint(sDaoMint)
  const epochInfo = useSubDaoEpochInfo(sDaoMint)
  const treasuryInfo = useSubDaoTreasuryInfo(sDaoMint)
  const treasuryTokenAcct = useTokenAccount(treasuryInfo.info?.treasury)

  const mintSupplyNum =
    toNumber(mintInfo.info?.info.supply, mintInfo?.info?.info || 6) || 0
  const treasuryHntNum = toNumber(treasuryTokenAcct.info?.amount, 8) || 1
  const swap = mintSupplyNum / treasuryHntNum

  return (
    <StatsList title={title} link={link} linkText={linkText} Icon={Icon}>
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
        value={activeCount.result?.count || 0}
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
