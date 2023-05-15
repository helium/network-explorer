import { cache } from "react"
import { addPositionsMeta } from "./addPositionsMeta"
import { fetchDelegatedPositions } from "./fetchDelegatedPositions"
import { fetchPositions } from "./fetchPositions"
import { getPositionMetrics } from "./positionsMetrics"

const getGovernanceMetrics = async () => {
  const [positions, delegatedPositions] = await Promise.all([
    fetchPositions(),
    fetchDelegatedPositions(),
  ])

  const positionsWithMeta = await addPositionsMeta({
    positions: positions.map(({ info }) => info),
    delegatedPositions: delegatedPositions.map(({ info }) => info),
  })
  const positionMetrics = await getPositionMetrics(positionsWithMeta)
  return positionMetrics
}

export const fetchGovernanceStats = cache(getGovernanceMetrics)
