import { subDaoEpochInfoKey, subDaoKey } from "@helium/helium-sub-daos-sdk"
import { HeliumSubDaos } from "@helium/idls/lib/types/helium_sub_daos"
import { PublicKey } from "@solana/web3.js"
import { ONE_DAY_UNIX } from "../utils"
// @ts-ignore
import { IDL as subDaosIDL } from "@helium/idls/helium_sub_daos"
import { cache } from "react"
import { fetchIdlAccount } from "./fetchIdlAccount"

const today = Math.floor(new Date().valueOf() / 1000)
export const getSubDaoEpochInfo = (
  subDaoMint: PublicKey,
  offset: number = 1
) => {
  const SUBDAO_KEY = subDaoKey(subDaoMint)[0]
  const sdeKey = subDaoEpochInfoKey(
    SUBDAO_KEY,
    BigInt(today) - BigInt(ONE_DAY_UNIX * offset)
  )[0]

  return fetchIdlAccount<HeliumSubDaos>(
    sdeKey,
    subDaosIDL as HeliumSubDaos,
    "subDaoEpochInfoV0"
  )
}

export const fetchSubDaoEpochInfo = cache(
  (subDaoMint: PublicKey, offset: number = 1) => {
    return getSubDaoEpochInfo(subDaoMint, offset)
  }
)
