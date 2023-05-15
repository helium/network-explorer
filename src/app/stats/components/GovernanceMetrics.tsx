import { humanReadable } from "@helium/spl-utils"
import clsx from "clsx"
import { PropsWithChildren } from "react"
import {
  humanReadableHnt,
  humanReadableLockup,
  humanReadableVeHNT,
} from "../utils"
import { fetchGovernanceStats } from "../utils/fetchGovernanceMetrics"

const Cell = ({
  children,
  isHeader = false,
}: PropsWithChildren<{ isHeader?: boolean }>) => {
  return (
    <td
      className={clsx(
        "border-2  px-2 py-1",
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
  const governanceStats = await fetchGovernanceStats()

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
            <Cell>{humanReadable(governanceStats.network.total.count, 0)}</Cell>
            <Cell>{humanReadable(governanceStats.iot.total.count, 0)}</Cell>
            <Cell>{humanReadable(governanceStats.mobile.total.count, 0)}</Cell>
            <Cell>
              {humanReadable(governanceStats.undelegated.total.count, 0)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Total HNT</Cell>
            <Cell>{humanReadableHnt(governanceStats.network.total.hnt)}</Cell>
            <Cell>{humanReadableHnt(governanceStats.iot.total.hnt)}</Cell>
            <Cell>{humanReadableHnt(governanceStats.mobile.total.hnt)}</Cell>
            <Cell>
              {humanReadableHnt(governanceStats.undelegated.total.hnt)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Mean HNT</Cell>
            <Cell>
              {humanReadableHnt(governanceStats.network.stats.avgHnt)}
            </Cell>
            <Cell>{humanReadableHnt(governanceStats.iot.stats.avgHnt)}</Cell>
            <Cell>{humanReadableHnt(governanceStats.mobile.stats.avgHnt)}</Cell>
            <Cell>
              {humanReadableHnt(governanceStats.undelegated.stats.avgHnt)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Median HNT</Cell>
            <Cell>
              {humanReadable(governanceStats.network.stats.medianHnt, 8)}
            </Cell>
            <Cell>{humanReadable(governanceStats.iot.stats.medianHnt, 8)}</Cell>
            <Cell>
              {humanReadable(governanceStats.mobile.stats.medianHnt, 8)}
            </Cell>
            <Cell>
              {humanReadable(governanceStats.undelegated.stats.medianHnt, 8)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Total veHNT</Cell>
            <Cell>
              {humanReadableVeHNT(
                governanceStats.network.total.vehnt.toString()
              )}
            </Cell>
            <Cell>
              {humanReadableVeHNT(governanceStats.iot.total.vehnt.toString())}
            </Cell>
            <Cell>
              {humanReadableVeHNT(
                governanceStats.mobile.total.vehnt.toString()
              )}
            </Cell>
            <Cell>
              {humanReadableVeHNT(
                governanceStats.undelegated.total.vehnt.toString()
              )}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Mean VeHNT</Cell>
            <Cell>
              {humanReadableVeHNT(
                governanceStats.network.stats.avgVehnt.toString()
              )}
            </Cell>
            <Cell>
              {humanReadableVeHNT(
                governanceStats.iot.stats.avgVehnt.toString()
              )}
            </Cell>
            <Cell>
              {humanReadableVeHNT(
                governanceStats.mobile.stats.avgVehnt.toString()
              )}
            </Cell>
            <Cell>
              {humanReadableVeHNT(
                governanceStats.undelegated.stats.avgVehnt.toString()
              )}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Median VeHNT</Cell>
            <Cell>
              {humanReadableVeHNT(
                governanceStats.network.stats.medianVehnt.toString()
              )}
            </Cell>
            <Cell>
              {humanReadableVeHNT(
                governanceStats.iot.stats.medianVehnt.toString()
              )}
            </Cell>
            <Cell>
              {humanReadableVeHNT(
                governanceStats.mobile.stats.medianVehnt.toString()
              )}
            </Cell>
            <Cell>
              {humanReadableVeHNT(
                governanceStats.undelegated.stats.medianVehnt.toString()
              )}
            </Cell>
          </tr>

          <tr>
            <Cell isHeader>Mean Lockup</Cell>
            <Cell>
              {humanReadableLockup(governanceStats.network.stats.avgLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(governanceStats.iot.stats.avgLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(governanceStats.mobile.stats.avgLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(governanceStats.undelegated.stats.avgLockup)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Median Lockup</Cell>
            <Cell>
              {humanReadableLockup(governanceStats.network.stats.medianLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(governanceStats.iot.stats.medianLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(governanceStats.mobile.stats.medianLockup)}
            </Cell>
            <Cell>
              {humanReadableLockup(
                governanceStats.undelegated.stats.medianLockup
              )}
            </Cell>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
