import { ONE_DAY_UNIX } from "@/app/stats/utils"
import { subDaoEpochInfoKey, subDaoKey } from "@helium/helium-sub-daos-sdk"
import { HeliumSubDaos } from "@helium/idls/lib/types/helium_sub_daos"
import { PublicKey } from "@solana/web3.js"
import { fetchIdlAccount } from "./fetchIdlAccount"
import { fetchUnixTimestap } from "./fetchUnixTimestamp"
// @ts-ignore
import { IDL as subDaosIDL } from "@helium/idls/helium_sub_daos"

export const fetchSubDaoEpochInfo = async (
  subDaoMint: PublicKey,
  offset: number = 1
) => {
  const SUBDAO_KEY = subDaoKey(subDaoMint)[0]
  const unixTime = await fetchUnixTimestap()
  const sdeKey = subDaoEpochInfoKey(
    SUBDAO_KEY,
    unixTime - BigInt(ONE_DAY_UNIX * offset)
  )[0]

  return fetchIdlAccount<HeliumSubDaos>(
    sdeKey,
    subDaosIDL as HeliumSubDaos,
    "subDaoEpochInfoV0"
  )
}
