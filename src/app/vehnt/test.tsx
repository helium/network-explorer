import { humanReadable } from "@helium/spl-utils"
import { humanReadableLockup, humanReadableVeHNT } from "../stats/utils"
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

  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Network</th>
            <th>IOT</th>
            <th>Mobile</th>
            <th>Undelegated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Positions #</td>
            <td>{humanReadable(positionMetrics.network.total.count, 0)}</td>
            <td>{humanReadable(positionMetrics.iot.total.count, 0)}</td>
            <td>{humanReadable(positionMetrics.mobile.total.count, 0)}</td>
            <td>{humanReadable(positionMetrics.undelegated.total.count, 0)}</td>
          </tr>
          <tr>
            <td>Total HNT</td>
            <td>{humanReadable(positionMetrics.network.total.hnt, 8)}</td>
            <td>{humanReadable(positionMetrics.iot.total.hnt, 8)}</td>
            <td>{humanReadable(positionMetrics.mobile.total.hnt, 8)}</td>
            <td>{humanReadable(positionMetrics.undelegated.total.hnt, 8)}</td>
          </tr>
          <tr>
            <td>Mean HNT</td>
            <td>{humanReadable(positionMetrics.network.stats.avgHnt, 8)}</td>
            <td>{humanReadable(positionMetrics.iot.stats.avgHnt, 8)}</td>
            <td>{humanReadable(positionMetrics.mobile.stats.avgHnt, 8)}</td>
            <td>
              {humanReadable(positionMetrics.undelegated.stats.avgHnt, 8)}
            </td>
          </tr>
          <tr>
            <td>Median HNT</td>
            <td>{humanReadable(positionMetrics.network.stats.medianHnt, 8)}</td>
            <td>{humanReadable(positionMetrics.iot.stats.medianHnt, 8)}</td>
            <td>{humanReadable(positionMetrics.mobile.stats.medianHnt, 8)}</td>
            <td>
              {humanReadable(positionMetrics.undelegated.stats.medianHnt, 8)}
            </td>
          </tr>
          <tr>
            <td>Total veHNT</td>
            <td>{humanReadableVeHNT(positionMetrics.network.total.vehnt)}</td>
            <td>{humanReadableVeHNT(positionMetrics.iot.total.vehnt)}</td>
            <td>{humanReadableVeHNT(positionMetrics.mobile.total.vehnt)}</td>
            <td>
              {humanReadableVeHNT(positionMetrics.undelegated.total.vehnt)}
            </td>
          </tr>
          <tr>
            <td>Mean VeHNT</td>
            <td>
              {humanReadableVeHNT(positionMetrics.network.stats.avgVehnt)}
            </td>
            <td>{humanReadableVeHNT(positionMetrics.iot.stats.avgVehnt)}</td>
            <td>{humanReadableVeHNT(positionMetrics.mobile.stats.avgVehnt)}</td>
            <td>
              {humanReadableVeHNT(positionMetrics.undelegated.stats.avgVehnt)}
            </td>
          </tr>
          <tr>
            <td>Median VeHNT</td>
            <td>
              {humanReadableVeHNT(positionMetrics.network.stats.medianVehnt)}
            </td>
            <td>{humanReadableVeHNT(positionMetrics.iot.stats.medianVehnt)}</td>
            <td>
              {humanReadableVeHNT(positionMetrics.mobile.stats.medianVehnt)}
            </td>
            <td>
              {humanReadableVeHNT(
                positionMetrics.undelegated.stats.medianVehnt
              )}
            </td>
          </tr>

          <tr>
            <td>Mean Lockup</td>
            <td>
              {humanReadableLockup(positionMetrics.network.stats.avgLockup)}
            </td>
            <td>{humanReadableLockup(positionMetrics.iot.stats.avgLockup)}</td>
            <td>
              {humanReadableLockup(positionMetrics.mobile.stats.avgLockup)}
            </td>
            <td>
              {humanReadableLockup(positionMetrics.undelegated.stats.avgLockup)}
            </td>
          </tr>
          <tr>
            <td>Median Lockup</td>
            <td>
              {humanReadableLockup(positionMetrics.network.stats.medianLockup)}
            </td>
            <td>
              {humanReadableLockup(positionMetrics.iot.stats.medianLockup)}
            </td>
            <td>
              {humanReadableLockup(positionMetrics.mobile.stats.medianLockup)}
            </td>
            <td>
              {humanReadableLockup(
                positionMetrics.undelegated.stats.medianLockup
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
