"use client"

import { useEffect } from "react"

import { fetchDelegatedPositions } from "../stats/utils/fetchDelegatedPositions"
import { fetchPositions } from "../stats/utils/fetchPositions"
import { DelegatedPostionV0, Position } from "../stats/utils/types"

const IOT_SUBDAO = "39Lw1RH6zt8AJvKn3BTxmUDofzduCM2J3kSaGDZ8L7Sk"
const MOBILE_SUBDAO = "Gm9xDCJawDEKDrrQW6haw94gABaYzQwCq4ZQU8h8bd22"

export const VeHnt = () => {
  useEffect(() => {
    const doAsync = async () => {
      const [positions, delegatedPositions] = await Promise.all([
        fetchPositions(),
        fetchDelegatedPositions(),
      ])
      console.log("positions 0", positions[0])
      console.log("delegatedPositions 0", delegatedPositions[0])

      const getPositionsWithMeta = ({}: {
        positions: Position[]
        delegatedPositions: DelegatedPostionV0[]
      }) => {}
    }
    doAsync()
  }, [])

  return null
}
