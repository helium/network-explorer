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
import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import Link from "next/link"
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
import { format } from "date-fns"
import { useMemo } from "react"
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
    <div className="flex flex-col items-center py-2 ">
      <h3>{title}</h3>
      <p>Active Devices: {activeCount.result?.count || 0}</p>
      <p>Utility Score: {humanReadable(epochInfo.info?.utilityScore, 12)}</p>
      <p>veHNT staked: {humanReadable(epochInfo.info?.vehntAtEpochStart, 0)}</p>
      <p>Treasury (HNT): {humanReadable(treasuryTokenAcct.info?.amount, 8)}</p>
      <p>
        Supply:{" "}
        {humanReadable(mintInfo.info?.info.supply, mintInfo?.info?.info || 0)}
      </p>
      <p>DC Burned (24h): {humanReadable(epochInfo.info?.dcBurned, 0)}</p>
      <p>Estimated Swap : {Math.round(swap)}</p>
    </div>
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
    <div className="flex flex-col items-center py-2 ">
      <h3>HNT</h3>
      <p>Price (HNT): ${hntPrice.result?.helium.usd}</p>
      <p>Current Epoch: {epoch}</p>
      <p>
        Epoch End:{" "}
        <Countdown
          date={epoch * ONE_DAY_MS + ONE_DAY_MS}
          renderer={CountdownRenderer}
        />
      </p>
      <p>
        Next Halvening:{" "}
        <Countdown date={NEXT_HALVENING * 1000} renderer={CountdownRenderer} />
      </p>
      <p>
        Last Epoch End:{" "}
        {format(new Date(lastEpochEnd * 1000), "Y/MM/dd HH:mm:ss")}
      </p>
    </div>
  )
}

export default async function Page() {
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC!)

  return (
    <div
      className={clsx(
        "absolute inset-x-0 bottom-0 top-28 z-10 flex w-auto flex-col gap-4 border-t p-6 text-sm font-medium backdrop-blur-sm",
        "border-zinc-900/5 bg-white/30 text-zinc-800",
        "dark:border-white/10 dark:bg-zinc-800/30 dark:text-zinc-200"
      )}
    >
      <div className="flex w-full items-center gap-3">
        <div className="flex-1 text-xl text-zinc-600 dark:text-zinc-100">
          Network Stats
        </div>
        <Link href="/">
          <XMarkIcon className="h-6 w-6 text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 hover:dark:text-zinc-100" />
        </Link>
      </div>
      <div>
        <AccountProvider
          extendConnection={false}
          commitment="confirmed"
          connection={connection}
        >
          <HntInfo />
          <SubDaoInfo title="Mobile" sDaoMint={MOBILE_MINT} />
          <SubDaoInfo title="IoT" sDaoMint={IOT_MINT} />
        </AccountProvider>
      </div>
    </div>
  )
}
