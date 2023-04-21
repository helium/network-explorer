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
// @ts-ignore
import { IDL as treasuryMgmtIDL } from "@helium/idls/treasury_management"

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
import { PropsWithChildren, ReactNode, useMemo } from "react"
import { useAsync } from "react-async-hook"
import Countdown, { CountdownRenderProps } from "react-countdown"

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

const COINGECK_HNT_URL =
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

const MOBILE_INFO = {
  title: "MOBILE",
  activeUrl: "https://mobile-rewards.oracle.helium.io/active-devices",
  link: "https://docs.helium.com/5g-on-helium",
  linkText: "Learn More About MOBILE",
}

const IOT_INFO = {
  title: "IOT",
  activeUrl: "https://iot-rewards.oracle.helium.io/active-devices",
  link: "https://docs.helium.com/lorawan-on-helium",
  linkText: "Learn More About IOT",
}

const SubDaoInfo = ({ sDaoMint }: { sDaoMint: PublicKey }) => {
  const { activeUrl, link, linkText, title } =
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
    <StatsList title={title} link={link} linkText={linkText}>
      {/* <StatItem
        label="Utility Score"
        value={humanReadableBigint(epochInfo.info?.utilityScore, 12, 0)}
      /> */}
      <StatItem
        label="Active Hotspots"
        value={activeCount.result?.count || 0}
      />
      {/* <StatItem
        label="veHNT staked"
        value={humanReadable(epochInfo.info?.vehntAtEpochStart, 0)}
      /> */}
      <StatItem
        label="DC Burned (24h)"
        value={humanReadable(epochInfo.info?.dcBurned, 0)}
      />
      <StatItem
        label="Treasury (HNT)"
        value={humanReadableBigint(
          treasuryTokenAcct.info?.amount || BigInt(0),
          8,
          0
        )}
      />
      <StatItem
        label="Supply"
        value={humanReadableBigint(
          mintInfo.info?.info.supply,
          mintInfo?.info?.info || 0,
          0
        )}
      />
      <StatItem
        label="Estimated Swap"
        unit={`${title}/HNT`}
        value={Math.round(swap)}
      />
    </StatsList>
  )
}

const CountdownRenderer = ({
  days,
  formatted: { hours, minutes, seconds },
}: CountdownRenderProps) => {
  let countdown = ""
  if (!!days) countdown = `${days} days`
  else countdown = `${hours}:${minutes}:${seconds}`
  return <span className="text-base">{countdown}</span>
}

type StatItemProps = {
  label: string
  value: string | ReactNode | number
  unit?: string
}

const StatItem = ({ label, value, unit }: StatItemProps) => {
  if (typeof value === "number") value = numberWithCommas(value, 0)
  const isValueString = typeof value === "string"
  const Value = !isValueString ? (
    value
  ) : (
    <p className="text-base">
      {value}
      {!!unit && <span className="text-xs text-gray-500"> {unit}</span>}
    </p>
  )

  return (
    <div
      className={clsx(
        "w-15 flex flex-1 flex-col justify-between gap-2 rounded-xl border p-4",
        "border-zinc-900/5 bg-white text-zinc-800 shadow",
        "dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
      )}
    >
      <p className="text-sm">{label}</p>
      {Value}
    </div>
  )
}

type StatsListProps = {
  title: string
  link: string
  linkText: string
}

const StatsList = ({
  children,
  title,
  link,
  linkText,
}: PropsWithChildren<StatsListProps>) => {
  return (
    <div className="flex flex-col py-2 ">
      <div className="flex justify-between">
        <h2 className="mb-2 flex-1 text-lg text-zinc-600 dark:text-zinc-100">
          {title}
        </h2>
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
  const hntPrice = useAsync(fetcher, [COINGECK_HNT_URL])
  const accountCache = useAccountFetchCache()
  const unixTime = useAsync(getUnixTimestamp, [accountCache?.connection])
  const unixNow = unixTime?.result || BigInt(today)
  const epoch = currentEpoch(new BN(unixNow)).toNumber()
  const epochInfo = useSubDaoEpochInfo(MOBILE_MINT)
  const lastEpochEnd = amountAsNum(epochInfo.info?.rewardsIssuedAt || 0, 0)

  return (
    <StatsList
      title="HNT"
      link="https://docs.helium.com/helium-tokens/hnt"
      linkText="Learn More About HNT"
    >
      <StatItem label="Price (HNT)" value={`$${hntPrice.result?.helium.usd}`} />
      <StatItem label="Current Epoch" value={epoch} />
      <StatItem
        label="Epoch End"
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
        label="Last Epoch End"
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
