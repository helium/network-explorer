"use client"

import { useAccountFetchCache } from "@helium/helium-react-hooks"
import { Connection, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js"
import { useAsync } from "react-async-hook"

async function getUnixTimestamp(connection: Connection): Promise<bigint> {
  const clock = await connection.getAccountInfo(SYSVAR_CLOCK_PUBKEY)
  const unixTime = clock!.data.readBigInt64LE(8 * 4)
  return unixTime
}

const today = Math.floor(new Date().valueOf() / 1000)
export const useUnixTimestamp = () => {
  const accountCache = useAccountFetchCache()
  const unixTime = useAsync(getUnixTimestamp, [accountCache?.connection])
  return unixTime?.result || BigInt(today)
}
