"use client"

import { useIdlAccount } from "@helium/helium-react-hooks"
import { subDaoEpochInfoKey, subDaoKey } from "@helium/helium-sub-daos-sdk"
import { HeliumSubDaos } from "@helium/idls/lib/types/helium_sub_daos"
import { PublicKey } from "@solana/web3.js"
import { useMemo } from "react"
import { ONE_DAY_UNIX } from "../utils"
// @ts-ignore
import { IDL as subDaosIDL } from "@helium/idls/helium_sub_daos"
import { useUnixTimestamp } from "./useUnixTimestamp"

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
