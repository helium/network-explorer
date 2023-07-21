import { subDaoEpochInfoKey, subDaoKey } from "@helium/helium-sub-daos-sdk"
import { HeliumSubDaos } from "@helium/idls/lib/types/helium_sub_daos"
import { PublicKey } from "@solana/web3.js"
import { ONE_DAY_UNIX } from "../utils"
// @ts-ignore
import { IDL as subDaosIDL } from "@helium/idls/lib/cjs/helium_sub_daos"
import { IOT_MINT, MOBILE_MINT } from "@helium/spl-utils"
import { cache } from "react"
import { fetchIdlAccount } from "./fetchIdlAccount"
import { SubDao } from "./types"

const SUBDAO_TO_MINT: { [key in SubDao]: PublicKey } = {
  iot: IOT_MINT,
  mobile: MOBILE_MINT,
}

export const getSubDaoEpochInfo = async (
  subDao: SubDao,
  offset: number = 1
) => {
  const now = Math.floor(new Date().valueOf() / 1000)
  const SUBDAO_KEY = subDaoKey(SUBDAO_TO_MINT[subDao])[0]
  const sdeKey = subDaoEpochInfoKey(
    SUBDAO_KEY,
    BigInt(now) - BigInt(ONE_DAY_UNIX * offset)
  )[0]

  return fetchIdlAccount<HeliumSubDaos>(
    sdeKey,
    subDaosIDL as HeliumSubDaos,
    "subDaoEpochInfoV0"
  )
}

export const fetchSubDaoEpochInfo = cache(getSubDaoEpochInfo)
