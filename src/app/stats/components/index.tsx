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
  toNumber,
} from "@helium/spl-utils"
import { treasuryManagementKey } from "@helium/treasury-management-sdk"
import { Connection, PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js"
import clsx from "clsx"
import { format } from "date-fns"
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

const MOBILE_ACTIVE_URL =
  "https://mobile-rewards.oracle.helium.io/active-devices"
const IOT_ACTIVE_URL = "https://iot-rewards.oracle.helium.io/active-devices"
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

const SubDaoInfo = ({
  sDaoMint,
  title,
}: {
  sDaoMint: PublicKey
  title: string
}) => {
  const activeUrl =
    sDaoMint === MOBILE_MINT ? MOBILE_ACTIVE_URL : IOT_ACTIVE_URL
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
    <StatsList title={title}>
      <StatItem label="Active Devices" value={activeCount.result?.count || 0} />
      <StatItem
        label="Utility Score"
        value={humanReadable(epochInfo.info?.utilityScore, 12)}
      />
      <StatItem
        label="veHNT staked"
        value={humanReadable(epochInfo.info?.vehntAtEpochStart, 0)}
      />
      <StatItem
        label="Treasury (HNT)"
        value={humanReadable(treasuryTokenAcct.info?.amount, 8)}
      />
      <StatItem
        label="Supply"
        value={humanReadable(
          mintInfo.info?.info.supply,
          mintInfo?.info?.info || 0
        )}
      />
      <StatItem
        label="DC Burned (24h)"
        value={humanReadable(epochInfo.info?.dcBurned, 0)}
      />
      <StatItem
        label={`Estimated Swap ${title}/HNT`}
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
  if (days) countdown += `${days} days - `
  countdown += `${hours}:${minutes}:${seconds}`
  return <span>{countdown}</span>
}

type StatItemProps = { label: string; value: string | ReactNode }

const StatItem = ({ label, value }: StatItemProps) => {
  const isValueString = typeof value === "string"
  const Value = !isValueString ? value : <p className="text-base">{value}</p>

  return (
    <div
      className={clsx(
        "w-15 flex flex-1 flex-col justify-between gap-2 rounded-xl border p-4",
        "border-zinc-900/5 bg-white/30 text-zinc-800",
        "dark:border-white/10 dark:bg-zinc-800/30 dark:text-zinc-200"
      )}
    >
      <p className="text-sm">{label}</p>
      {Value}
    </div>
  )
}

type StatsListProps = {
  title: string
}

const StatsList = ({ children, title }: PropsWithChildren<StatsListProps>) => {
  return (
    <div className="flex flex-col py-2 ">
      <h2 className="mb-2 flex-1 text-lg text-zinc-600 dark:text-zinc-100">
        {title}
      </h2>
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
    <StatsList title="HNT">
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
        label="Next Halvening"
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
        <SubDaoInfo title="Mobile" sDaoMint={MOBILE_MINT} />
        <SubDaoInfo title="IOT" sDaoMint={IOT_MINT} />
      </div>
    </AccountProvider>
  )
}
