import { SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js"
import { cache } from "react"
import { accountCache } from "./accountCache"

async function getUnixTimestamp(): Promise<bigint> {
  const clock = await accountCache.connection.getAccountInfo(
    SYSVAR_CLOCK_PUBKEY
  )
  const unixTime = clock!.data.readBigInt64LE(8 * 4)
  return unixTime
}

export const fetchUnixTimestap = cache(getUnixTimestamp)
