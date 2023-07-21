import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { PROGRAM_ID as HELIUM_DAO_ID } from "@helium/helium-sub-daos-sdk"
import { HeliumSubDaos } from "@helium/idls/lib/types/helium_sub_daos"
import { accountCache } from "./accountCache"
import { getIdlParser } from "./getIdlParser"
// @ts-ignore
import { IDL as subDaosIDL } from "@helium/idls/lib/cjs/helium_sub_daos"
import { DelegatedPosition } from "./types"

const IOT_SUBDAO = "39Lw1RH6zt8AJvKn3BTxmUDofzduCM2J3kSaGDZ8L7Sk"
const MOBILE_SUBDAO = "Gm9xDCJawDEKDrrQW6haw94gABaYzQwCq4ZQU8h8bd22"

const DELEGATE_POSITION_V0_DESCRIMINATOR = [251, 212, 32, 100, 102, 1, 247, 81]
const DELEGATE_POSITION_V0_DESCRIMINATOR_B58 = bs58.encode(
  Buffer.from(DELEGATE_POSITION_V0_DESCRIMINATOR)
)

const delegatedPositionParser = getIdlParser<HeliumSubDaos>(
  subDaosIDL as HeliumSubDaos,
  "delegatedPositionV0"
)

export const fetchDelegatedPositions = async () => {
  const connection = accountCache.connection

  const accounts = await connection.getProgramAccounts(HELIUM_DAO_ID, {
    filters: [
      {
        dataSize: 196, // number of bytes
      },
      {
        memcmp: {
          offset: 0, // number of bytes
          bytes: DELEGATE_POSITION_V0_DESCRIMINATOR_B58, // base58 encoded string
        },
      },
    ],
  })

  return accounts.map((account, i) => {
    return {
      ...account,
      info: delegatedPositionParser(
        account.pubkey,
        account.account
      ) as DelegatedPosition,
    }
  })
}
