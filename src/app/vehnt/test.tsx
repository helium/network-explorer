"use client"

import { useEffect } from "react"

import { BN } from "@coral-xyz/anchor"
import { calcPositionVotingPower } from "../stats/utils/calcPositionVotingPower"
import { fetchDelegatedPositions } from "../stats/utils/fetchDelegatedPositions"
import { fetchPositions } from "../stats/utils/fetchPositions"
import { fetchRegistrar } from "../stats/utils/fetchRegistrar"
import { fetchUnixTimestap } from "../stats/utils/fetchUnixTimestamp"
import { getPositionMetrics } from "../stats/utils/positionsMetrics"
import { DelegatedPosition, Position, Registrar } from "../stats/utils/types"

const IOT_SUBDAO = "39Lw1RH6zt8AJvKn3BTxmUDofzduCM2J3kSaGDZ8L7Sk"
const MOBILE_SUBDAO = "Gm9xDCJawDEKDrrQW6haw94gABaYzQwCq4ZQU8h8bd22"

export enum SubDaos {
  MOBILE = "mob",
  IOT = "iot",
}

export interface PositionWithMeta extends Position {
  subDao?: SubDaos
  delegatedPositionKey?: string
  veHnt: BN
}

export const VeHnt = () => {
  useEffect(() => {
    const doAsync = async () => {
      const [positions, delegatedPositions] = await Promise.all([
        fetchPositions(),
        fetchDelegatedPositions(),
      ])
      console.log("positions 0", positions[0])
      console.log("delegatedPositions 0", delegatedPositions[0])

      const getPositionsWithMeta = async ({
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
      const positionsWithMeta = await getPositionsWithMeta({
        positions: positions.map(({ info }) => info),
        delegatedPositions: delegatedPositions.map(({ info }) => info),
      })
      console.log(positionsWithMeta)
      console.log(await getPositionMetrics(positionsWithMeta))
    }
    doAsync()
  }, [])

  return null
}
