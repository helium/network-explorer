import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { VoterStakeRegistry } from "@helium/idls/lib/types/voter_stake_registry"
import { PublicKey } from "@solana/web3.js"
import { accountCache } from "./accountCache"
import { getIdlParser } from "./getIdlParser"
import { Position } from "./types"

// @ts-ignore
import { IDL as vsrRegistryIDL } from "@helium/idls/lib/cjs/voter_stake_registry"
import { HNT_MINT, IOT_MINT, MOBILE_MINT } from "@helium/spl-utils"
import { registrarKey } from "@helium/voter-stake-registry-sdk"

const getRegistrarFromRealm = ({
  realmName,
  mint,
}: {
  realmName: string
  mint: PublicKey
}) => {
  const realm = PublicKey.findProgramAddressSync(
    [Buffer.from("governance", "utf-8"), Buffer.from(realmName, "utf-8")],
    new PublicKey("hgovkRU6Ghe1Qoyb54HdSLdqN7VtxaifBzRmh9jtd3S")
  )[0]
  return registrarKey(realm, mint)[0]
}

const HELIUM_VSR_ID = "hvsrNC3NKbcryqDs2DocYHZ9yPKEVzdSjQG6RVtK1s8"
const POSTION_VO_DESCRIMINATOR = [152, 131, 154, 46, 158, 42, 31, 233]

const HNT_REGISTRAR = getRegistrarFromRealm({
  realmName: "Helium",
  mint: HNT_MINT,
}).toBytes()
const HNT_POSITION_V0_DESCRIMINATOR = [
  ...POSTION_VO_DESCRIMINATOR,
  ...HNT_REGISTRAR,
]
const HNT_POSITION_V0_DESCRIMINATOR_B58 = bs58.encode(
  Buffer.from(HNT_POSITION_V0_DESCRIMINATOR)
)

const IOT_REGISTRAR = getRegistrarFromRealm({
  realmName: "Helium IOT",
  mint: IOT_MINT,
}).toBytes()
const IOT_POSITION_V0_DESCRIMINATOR = [
  ...POSTION_VO_DESCRIMINATOR,
  ...IOT_REGISTRAR,
]
const IOT_POSITION_V0_DESCRIMINATOR_B58 = bs58.encode(
  Buffer.from(IOT_POSITION_V0_DESCRIMINATOR)
)

const MOBILE_REGISTRAR = getRegistrarFromRealm({
  realmName: "Helium MOBILE",
  mint: MOBILE_MINT,
}).toBytes()
const MOBILE_POSITION_V0_DESCRIMINATOR = [
  ...POSTION_VO_DESCRIMINATOR,
  ...MOBILE_REGISTRAR,
]
const MOBILE_POSITION_V0_DESCRIMINATOR_B58 = bs58.encode(
  Buffer.from(MOBILE_POSITION_V0_DESCRIMINATOR)
)

const positionParser = getIdlParser<VoterStakeRegistry>(
  vsrRegistryIDL as VoterStakeRegistry,
  "positionV0"
)

const positionTypeToDescriminiator = {
  hnt: HNT_POSITION_V0_DESCRIMINATOR_B58,
  iot: IOT_POSITION_V0_DESCRIMINATOR_B58,
  mobile: MOBILE_POSITION_V0_DESCRIMINATOR_B58,
}

type PositionType = "hnt" | "mobile" | "iot"

export const fetchPositions = async (positionType: PositionType) => {
  const descriminator = positionTypeToDescriminiator[positionType]
  const connection = accountCache.connection

  const accounts = await connection.getProgramAccounts(
    new PublicKey(HELIUM_VSR_ID),
    {
      filters: [
        {
          dataSize: 180, // number of bytes
        },
        {
          memcmp: {
            offset: 0, // number of bytes
            bytes: descriminator, // base58 encoded string
          },
        },
      ],
    }
  )

  return accounts.map((account, i) => {
    return {
      ...account,
      info: positionParser(account.pubkey, account.account) as Position,
    }
  })
}
