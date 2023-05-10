"use client"

import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { VoterStakeRegistry } from "@helium/idls/lib/types/voter_stake_registry"
import { PublicKey } from "@solana/web3.js"
import { useEffect } from "react"
import { accountCache } from "../stats/utils/accountCache"
import { getIdlParser } from "../stats/utils/getIdlParser"

import { PROGRAM_ID as HELIUM_DAO_ID } from "@helium/helium-sub-daos-sdk"
import { HeliumSubDaos } from "@helium/idls/lib/types/helium_sub_daos"
// @ts-ignore
import { IDL as vsrRegistryIDL } from "@helium/idls/voter_stake_registry"
// @ts-ignore
import { BN } from "@coral-xyz/anchor"
import { IDL as subDaosIDL } from "@helium/idls/helium_sub_daos"
import { calcPositionVotingPower } from "../stats/utils/calcPositionVotingPower"
import { fetchRegistrar } from "../stats/utils/fetchRegistrar"
import { fetchUnixTimestap } from "../stats/utils/fetchUnixTimestamp"
import { Position, Registrar } from "../stats/utils/types"

const IOT_SUBDAO = "39Lw1RH6zt8AJvKn3BTxmUDofzduCM2J3kSaGDZ8L7Sk"
const MOBILE_SUBDAO = "Gm9xDCJawDEKDrrQW6haw94gABaYzQwCq4ZQU8h8bd22"

const HELIUM_VSR_ID = "hvsrNC3NKbcryqDs2DocYHZ9yPKEVzdSjQG6RVtK1s8"
const HNT_POSITION_V0_DESCRIMINATOR = [
  152, 131, 154, 46, 158, 42, 31, 233, 153, 231, 240, 209, 136, 172, 103, 141,
  133, 237, 188, 234, 25, 98, 24, 31, 110, 4, 118, 170, 97, 47, 254, 176, 204,
  205, 221, 23, 230, 245, 155, 49,
]
const HNT_POSITION_V0_DESCRIMINATOR_B58 = bs58.encode(
  Buffer.from(HNT_POSITION_V0_DESCRIMINATOR)
)

const DELEGATE_POSITION_V0_DESCRIMINATOR = [251, 212, 32, 100, 102, 1, 247, 81]
const DELEGATE_POSITION_V0_DESCRIMINATOR_B58 = bs58.encode(
  Buffer.from(DELEGATE_POSITION_V0_DESCRIMINATOR)
)

const positionParser = getIdlParser<VoterStakeRegistry>(
  vsrRegistryIDL as VoterStakeRegistry,
  "positionV0"
)

const delegatedPositionParser = getIdlParser<HeliumSubDaos>(
  subDaosIDL as HeliumSubDaos,
  "delegatedPositionV0"
)

export const VeHnt = () => {
  useEffect(() => {
    const fetchPositions = async () => {
      console.log("fetchPositions triggered")
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
                bytes: HNT_POSITION_V0_DESCRIMINATOR_B58, // base58 encoded string
              },
            },
          ],
        }
      )

      console.log(
        `Found ${accounts.length} token account(s) for HNT positions: `
      )
      const accountsParsed = accounts.map((account, i) => {
        return {
          ...account,
          info: positionParser(account.pubkey, account.account) as Position,
        }
      })

      const [registrar, now] = await Promise.all([
        fetchRegistrar(accountsParsed[0].info.registrar),
        fetchUnixTimestap(),
      ])
      const nowBN = new BN(now)
      const mintCfg = (registrar.info as Registrar).votingMints[0]
      console.log({
        lockupSaturationSecs: mintCfg.lockupSaturationSecs,
        baselineVoteWeightScaledFactor: mintCfg.baselineVoteWeightScaledFactor,
        maxExtraLockupVoteWeightScaledFactor:
          mintCfg.maxExtraLockupVoteWeightScaledFactor,
        genesisVotePowerMultiplier: mintCfg.genesisVotePowerMultiplier,
      })
      console.log(mintCfg.lockupSaturationSecs)
      console.log("registrar", registrar)
      console.log("registrar", (registrar.info as Registrar).votingMints[0])
      console.log("first position", accountsParsed[0])

      const positionsWithMeta = accountsParsed.map((pos, index) => {
        let posVotingPower = 0
        if (index === 0) {
          posVotingPower = calcPositionVotingPower({
            position: pos.info,
            registrar: registrar.info as Registrar,
            unixNow: nowBN,
          })
        }

        return { ...pos, veHnt: posVotingPower }
      })
      console.log("first meta", positionsWithMeta[0])
      console.log("veHNT", positionsWithMeta[0].veHnt.toNumber())
      console.log("pubkey", positionsWithMeta[0].pubkey.toString())
    }

    const fetchDelegatedPositions = async () => {
      console.log("fetchDelegatedPositions triggered")
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
      console.log(
        `Found ${accounts.length} token account(s) for HNT positions: `
      )

      const accountsParsed = accounts.map((account, i) => {
        return {
          ...account,
          info: delegatedPositionParser(account.pubkey, account.account),
        }
      })
      for (var i = 0; i <= 0; i++) {
        const account = accountsParsed[i]
        console.log(`account ${i}`, account)
        // console.log(account.info.subDao.toString())
      }
    }

    // fetchDelegatedPositions()
    fetchPositions()
  }, [])

  return null
}
