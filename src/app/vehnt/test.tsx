import { addPositionsMeta } from "../stats/utils/addPositionsMeta"
import { fetchDelegatedPositions } from "../stats/utils/fetchDelegatedPositions"
import { fetchPositions } from "../stats/utils/fetchPositions"
import { getPositionMetrics } from "../stats/utils/positionsMetrics"

export const VeHnt = async () => {
  const [positions, delegatedPositions] = await Promise.all([
    fetchPositions(),
    fetchDelegatedPositions(),
  ])

  const positionsWithMeta = await addPositionsMeta({
    positions: positions.map(({ info }) => info),
    delegatedPositions: delegatedPositions.map(({ info }) => info),
  })
  const positionMetrics = await getPositionMetrics(positionsWithMeta)
  console.log(positionMetrics)

  return null
}
