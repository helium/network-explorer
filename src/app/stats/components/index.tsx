"use client"

import { BN } from "@coral-xyz/anchor" // @ts-ignore
import {
  AccountProvider,
  useAccountFetchCache,
  useIdlAccount,
  useMint,
  useTokenAccount,
} from "@helium/helium-react-hooks"
import {
  currentEpoch,
  subDaoEpochInfoKey,
  subDaoKey,
} from "@helium/helium-sub-daos-sdk"
// @ts-ignore
import { IDL as subDaosIDL } from "@helium/idls/helium_sub_daos"
import { HeliumSubDaos } from "@helium/idls/lib/types/helium_sub_daos"
import { TreasuryManagement } from "@helium/idls/lib/types/treasury_management"
import { VoterStakeRegistry } from "@helium/idls/lib/types/voter_stake_registry"
// @ts-ignore
import { IDL as VSRegistryIDL } from "@helium/idls/voter_stake_registry"
// @ts-ignore
import { IDL as treasuryMgmtIDL } from "@helium/idls/treasury_management"

import { HeliumIcon } from "@/components/icons/HeliumIcon"
import { HeliumIotIcon } from "@/components/icons/HeliumIotIcon"
import { HeliumMobileIcon } from "@/components/icons/HeliumMobileIcon"
import {
  IOT_MINT,
  MOBILE_MINT,
  amountAsNum,
  humanReadable,
  humanReadableBigint,
  numberWithCommas,
  toNumber,
} from "@helium/spl-utils"
import { treasuryManagementKey } from "@helium/treasury-management-sdk"
import { Connection, PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js"
import clsx from "clsx"
import { format } from "date-fns"
import Link from "next/link"
import { PropsWithChildren, useMemo } from "react"
import { useAsync } from "react-async-hook"
import Countdown from "react-countdown"
import { CountdownRenderer, StatItem } from "./StatItem"

export async function getUnixTimestamp(
  connection: Connection
): Promise<bigint> {
  const clock = await connection.getAccountInfo(SYSVAR_CLOCK_PUBKEY)
  const unixTime = clock!.data.readBigInt64LE(8 * 4)
  return unixTime
}

const fetcher = async (url: string) => {
  return fetch(url).then((response) => response.json())
}

const COINGECKO_HNT_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=helium&vs_currencies=usd"

const ONE_DAY_UNIX = 60 * 60 * 24
const ONE_DAY_MS = ONE_DAY_UNIX * 1000
const today = Math.floor(new Date().valueOf() / 1000)

const useSubDaoEpochInfo = (subDaoMint: PublicKey) => {
  const SUBDAO_KEY = useMemo(() => subDaoKey(subDaoMint)[0], [subDaoMint])
  const accountCache = useAccountFetchCache()
  const unixTime = useAsync(getUnixTimestamp, [accountCache?.connection])
  const sdeKey = subDaoEpochInfoKey(
    SUBDAO_KEY,
    (unixTime?.result || BigInt(today)) - BigInt(ONE_DAY_UNIX)
  )[0]

  return useIdlAccount<HeliumSubDaos>(
    sdeKey,
    subDaosIDL as HeliumSubDaos,
    "subDaoEpochInfoV0"
  )
}

const useSubDaoTreasuryInfo = (subDaoMint: PublicKey) => {
  const treasuryMgmtKey = treasuryManagementKey(subDaoMint)[0]
  return useIdlAccount<TreasuryManagement>(
    treasuryMgmtKey,
    treasuryMgmtIDL as TreasuryManagement,
    "treasuryManagementV0"
  )
}

const useRegistrar = () => {
  const registrarKey = useMemo(
    () => new PublicKey("BMnWRWZrWqb6JMKznaDqNxWaWAHoaTzVabM6Qwyh3WKz"),
    []
  )
  return useIdlAccount<VoterStakeRegistry>(
    registrarKey,
    VSRegistryIDL as VoterStakeRegistry,
    "registrar"
  )
}

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

const humanReadableVeHNT = (numberStr: string) => {
  const numberWODecimal = numberStr
    .split("")
    .slice(0, numberStr.length - 8)
    .join("")
  return numberWithCommas(parseInt(numberWODecimal, 0), 0)
}

const SubDaoInfo = ({ sDaoMint }: { sDaoMint: PublicKey }) => {
  const { activeUrl, link, linkText, title, Icon, iconStyles } =
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
    <StatsList
      title={title}
      link={link}
      linkText={linkText}
      Icon={Icon}
      iconStyles={iconStyles}
    >
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

type StatsListProps = {
  title: string
  link: string
  linkText: string
  Icon: (props: any) => JSX.Element
  iconStyles?: string
}

const StatsList = ({
  children,
  title,
  link,
  linkText,
  Icon,
  iconStyles,
}: PropsWithChildren<StatsListProps>) => {
  return (
    <div className="flex flex-col py-2 ">
      <div className="flex justify-between">
        <div className="mb-2 flex items-center gap-2">
          <Icon className={clsx("h-6 w-6", iconStyles)} />
          <h2 className="flex-1 text-lg text-zinc-600 dark:text-zinc-100">
            {title}
          </h2>
        </div>
        <Link
          href={link}
          className="text-indigo-600 dark:text-violet-300"
          target="_"
        >
          {linkText}
        </Link>
      </div>
      <div className="flex flex-wrap gap-3">
        <>{children}</>
      </div>
    </div>
  )
}

const NEXT_HALVENING = 1690848000 // unix time
const HntInfo = () => {
  const hntPrice = useAsync(fetcher, [COINGECKO_HNT_URL])
  const accountCache = useAccountFetchCache()
  const unixTime = useAsync(getUnixTimestamp, [accountCache?.connection])
  const unixNow = unixTime?.result || BigInt(today)
  const epoch = currentEpoch(new BN(unixNow)).toNumber()
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

export const Stats = () => {
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC!)

  return (
    <AccountProvider
      extendConnection={false}
      commitment="confirmed"
      connection={connection}
    >
      <div className="overflow-y-auto">
        <HntInfo />
        <SubDaoInfo sDaoMint={MOBILE_MINT} />
        <SubDaoInfo sDaoMint={IOT_MINT} />
      </div>
    </AccountProvider>
  )
}
