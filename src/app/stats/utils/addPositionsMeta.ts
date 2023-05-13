import { BN } from "@coral-xyz/anchor"
import { calcPositionVotingPower } from "./calcPositionVotingPower"
import { fetchRegistrar } from "./fetchRegistrar"
import { fetchUnixTimestap } from "./fetchUnixTimestamp"
import { DelegatedPosition, Position, Registrar } from "./types"

const IOT_SUBDAO = "39Lw1RH6zt8AJvKn3BTxmUDofzduCM2J3kSaGDZ8L7Sk"

export enum SubDaos {
  MOBILE = "mob",
  IOT = "iot",
}

export interface PositionWithMeta extends Position {
  subDao?: SubDaos
  delegatedPositionKey?: string
  veHnt: BN
}

export const addPositionsMeta = async ({
  positions,
  delegatedPositions,
}: {
  positions: Position[]
  delegatedPositions: DelegatedPosition[]
}) => {
  const [registrar, now] = await Promise.all([
    fetchRegistrar(positions[0].registrar),
    fetchUnixTimestap(),
  ])
  const nowBN = new BN(now)

  const posKeyToDelegatedPos: { [key: string]: DelegatedPosition } = {}
  delegatedPositions.forEach((delegatedPos) => {
    const posKey = delegatedPos.position.toString()
    posKeyToDelegatedPos[posKey] = delegatedPos
  })

  return positions.map((position): PositionWithMeta => {
    const posKey = position.pubkey.toString()
    const delegatedPos = posKeyToDelegatedPos[posKey]
    const delegatedMeta = !delegatedPos
      ? {}
      : {
          subDao:
            delegatedPos.subDao.toString() === IOT_SUBDAO
              ? SubDaos.IOT
              : SubDaos.MOBILE,
          delegatedPositionKey: delegatedPos.pubkey.toString(),
        }

    return {
      ...delegatedMeta,
      ...position,
      veHnt: calcPositionVotingPower({
        position: position,
        registrar: registrar.info as Registrar,
        unixNow: nowBN,
      }),
    }
  })
}
