import { humanReadable } from "@helium/spl-utils"
import clsx from "clsx"
import { PropsWithChildren } from "react"
import {
  humanReadableHnt,
  humanReadableLockup,
  humanReadableVeHNT,
} from "../utils"
import { addPositionsMeta } from "../utils/addPositionsMeta"
import { fetchDelegatedPositions } from "../utils/fetchDelegatedPositions"
import { fetchGovernanceStats } from "../utils/fetchGovernanceMetrics"
import { fetchPositions } from "../utils/fetchPositions"

const Cell = ({
  children,
  isHeader = false,
}: PropsWithChildren<{ isHeader?: boolean }>) => {
  return (
    <td
      className={clsx(
        "border  px-2 py-1",
        "border-zinc-900/5",
        "dark:border-white/10",
        !isHeader && "font-normal"
      )}
    >
      {children}
    </td>
  )
}

export const GovernanceMetrics = async () => {
  const [positions, delegatedPositions] = await Promise.all([
    fetchPositions(),
    fetchDelegatedPositions(),
  ])

  const positionsWithMeta = await addPositionsMeta({
    positions: positions.map(({ info }) => info),
    delegatedPositions: delegatedPositions.map(({ info }) => info),
  })
  const positionMetrics = await fetchGovernanceStats()

  return (
    <div className="flex justify-center">
      <table className="table-auto">
        <thead>
          <tr>
            <Cell isHeader></Cell>
            <Cell isHeader>Network</Cell>
            <Cell isHeader>IOT</Cell>
            <Cell isHeader>Mobile</Cell>
            <Cell isHeader>Undelegated</Cell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell isHeader>Positions #</Cell>
            <Cell>{humanReadable(positionMetrics.network.total.count, 0)}</Cell>
            <Cell>{humanReadable(positionMetrics.iot.total.count, 0)}</Cell>
            <Cell>{humanReadable(positionMetrics.mobile.total.count, 0)}</Cell>
            <Cell>
              {humanReadable(positionMetrics.undelegated.total.count, 0)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Total HNT</Cell>
            <Cell>{humanReadableHnt(positionMetrics.network.total.hnt)}</Cell>
            <Cell>{humanReadableHnt(positionMetrics.iot.total.hnt)}</Cell>
            <Cell>{humanReadableHnt(positionMetrics.mobile.total.hnt)}</Cell>
            <Cell>
              {humanReadableHnt(positionMetrics.undelegated.total.hnt)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Mean HNT</Cell>
            <Cell>
              {humanReadableHnt(positionMetrics.network.stats.avgHnt)}
            </Cell>
            <Cell>{humanReadableHnt(positionMetrics.iot.stats.avgHnt)}</Cell>
            <Cell>{humanReadableHnt(positionMetrics.mobile.stats.avgHnt)}</Cell>
            <Cell>
              {humanReadableHnt(positionMetrics.undelegated.stats.avgHnt)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Median HNT</Cell>
            <Cell>
              {humanReadable(positionMetrics.network.stats.medianHnt, 8)}
            </Cell>
            <Cell>{humanReadable(positionMetrics.iot.stats.medianHnt, 8)}</Cell>
            <Cell>
              {humanReadable(positionMetrics.mobile.stats.medianHnt, 8)}
            </Cell>
            <Cell>
              {humanReadable(positionMetrics.undelegated.stats.medianHnt, 8)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Total veHNT</Cell>
            <Cell>
              {humanReadableVeHNT(positionMetrics.network.total.vehnt)}
            </Cell>
            <Cell>{humanReadableVeHNT(positionMetrics.iot.total.vehnt)}</Cell>
            <Cell>
              {humanReadableVeHNT(positionMetrics.mobile.total.vehnt)}
            </Cell>
            <Cell>
              {humanReadableVeHNT(positionMetrics.undelegated.total.vehnt)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Mean VeHNT</Cell>
            <Cell>
              {humanReadableVeHNT(positionMetrics.network.stats.avgVehnt)}
            </Cell>
            <Cell>
              {humanReadableVeHNT(positionMetrics.iot.stats.avgVehnt)}
            </Cell>
            <Cell>
              {humanReadableVeHNT(positionMetrics.mobile.stats.avgVehnt)}
            </Cell>
            <Cell>
              {humanReadableVeHNT(positionMetrics.undelegated.stats.avgVehnt)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Median VeHNT</Cell>
            <Cell>
              {humanReadableVeHNT(positionMetrics.network.stats.medianVehnt)}
            </Cell>
            <Cell>
              {humanReadableVeHNT(positionMetrics.iot.stats.medianVehnt)}
            </Cell>
            <Cell>
              {humanReadableVeHNT(positionMetrics.mobile.stats.medianVehnt)}
            </Cell>
            <Cell>
              {humanReadableVeHNT(
                positionMetrics.undelegated.stats.medianVehnt
              )}
            </Cell>
          </tr>

          <tr>
            <Cell isHeader>Mean Lockup</Cell>
            <Cell>
              {humanReadableLockup(positionMetrics.network.stats.avgLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(positionMetrics.iot.stats.avgLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(positionMetrics.mobile.stats.avgLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(positionMetrics.undelegated.stats.avgLockup)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Median Lockup</Cell>
            <Cell>
              {humanReadableLockup(positionMetrics.network.stats.medianLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(positionMetrics.iot.stats.medianLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(positionMetrics.mobile.stats.medianLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(
                positionMetrics.undelegated.stats.medianLockup
              )}
            </Cell>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
