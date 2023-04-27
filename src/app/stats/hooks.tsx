"use client"

import { useAccountFetchCache, useIdlAccount } from "@helium/helium-react-hooks"
import { subDaoEpochInfoKey, subDaoKey } from "@helium/helium-sub-daos-sdk"
import { HeliumSubDaos } from "@helium/idls/lib/types/helium_sub_daos"
import { TreasuryManagement } from "@helium/idls/lib/types/treasury_management"
import { VoterStakeRegistry } from "@helium/idls/lib/types/voter_stake_registry"
import { treasuryManagementKey } from "@helium/treasury-management-sdk"
import { Connection, PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js"
import { useMemo } from "react"
import { useAsync } from "react-async-hook"
import { ONE_DAY_UNIX } from "./utils"
// @ts-ignore
import { IDL as treasuryMgmtIDL } from "@helium/idls/treasury_management"
// @ts-ignore
import { IDL as subDaosIDL } from "@helium/idls/helium_sub_daos"
// @ts-ignore
import { IDL as VSRegistryIDL } from "@helium/idls/voter_stake_registry"

export const useRegistrar = () => {
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

export const useSubDaoEpochInfo = (subDaoMint: PublicKey) => {
  const SUBDAO_KEY = useMemo(() => subDaoKey(subDaoMint)[0], [subDaoMint])
  const unixTime = useUnixTimestamp()
  const sdeKey = subDaoEpochInfoKey(
    SUBDAO_KEY,
    unixTime - BigInt(ONE_DAY_UNIX)
  )[0]

  return useIdlAccount<HeliumSubDaos>(
    sdeKey,
    subDaosIDL as HeliumSubDaos,
    "subDaoEpochInfoV0"
  )
}

export const useSubDaoTreasuryInfo = (subDaoMint: PublicKey) => {
  const treasuryMgmtKey = treasuryManagementKey(subDaoMint)[0]
  return useIdlAccount<TreasuryManagement>(
    treasuryMgmtKey,
    treasuryMgmtIDL as TreasuryManagement,
    "treasuryManagementV0"
  )
}

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
