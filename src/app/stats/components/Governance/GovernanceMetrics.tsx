import { humanReadable } from "@helium/spl-utils"
import clsx from "clsx"
import { PropsWithChildren } from "react"
import {
  humanReadableHnt,
  humanReadableLockup,
  humanReadableVeHNT,
} from "../../utils"
import { fetchGovernanceStats } from "../../utils/fetchGovernanceMetrics"

interface CellProps {
  isHeader?: boolean
  colSpan?: number
  styles?: string
}

const Cell = ({
  children,
  isHeader = false,
  colSpan = 1,
  styles,
}: PropsWithChildren<CellProps>) => {
  return (
    <td
      colSpan={colSpan}
      className={clsx(
        "border-2  px-2 py-1",
        "border-zinc-900/5",
        "dark:border-white/10",
        !isHeader && "font-normal",
        !!styles && styles
      )}
    >
      {children}
    </td>
  )
}

const GovernanceMetricsDesktop = ({ stats }: { stats: any }) => {
  return (
    <div className="hidden justify-center sm:flex">
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
            <Cell>{humanReadable(stats.network.total.count, 0)}</Cell>
            <Cell>{humanReadable(stats.iot.total.count, 0)}</Cell>
            <Cell>{humanReadable(stats.mobile.total.count, 0)}</Cell>
            <Cell>{humanReadable(stats.undelegated.total.count, 0)}</Cell>
          </tr>
          <tr>
            <Cell isHeader>Total HNT</Cell>
            <Cell>{humanReadableHnt(stats.network.total.hnt)}</Cell>
            <Cell>{humanReadableHnt(stats.iot.total.hnt)}</Cell>
            <Cell>{humanReadableHnt(stats.mobile.total.hnt)}</Cell>
            <Cell>{humanReadableHnt(stats.undelegated.total.hnt)}</Cell>
          </tr>
          <tr>
            <Cell isHeader>Mean HNT</Cell>
            <Cell>{humanReadableHnt(stats.network.stats.avgHnt)}</Cell>
            <Cell>{humanReadableHnt(stats.iot.stats.avgHnt)}</Cell>
            <Cell>{humanReadableHnt(stats.mobile.stats.avgHnt)}</Cell>
            <Cell>{humanReadableHnt(stats.undelegated.stats.avgHnt)}</Cell>
          </tr>
          <tr>
            <Cell isHeader>Median HNT</Cell>
            <Cell>{humanReadable(stats.network.stats.medianHnt, 8)}</Cell>
            <Cell>{humanReadable(stats.iot.stats.medianHnt, 8)}</Cell>
            <Cell>{humanReadable(stats.mobile.stats.medianHnt, 8)}</Cell>
            <Cell>{humanReadable(stats.undelegated.stats.medianHnt, 8)}</Cell>
          </tr>
          <tr>
            <Cell isHeader>Total veHNT</Cell>
            <Cell>
              {humanReadableVeHNT(stats.network.total.vehnt.toString())}
            </Cell>
            <Cell>{humanReadableVeHNT(stats.iot.total.vehnt.toString())}</Cell>
            <Cell>
              {humanReadableVeHNT(stats.mobile.total.vehnt.toString())}
            </Cell>
            <Cell>
              {humanReadableVeHNT(stats.undelegated.total.vehnt.toString())}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Mean VeHNT</Cell>
            <Cell>
              {humanReadableVeHNT(stats.network.stats.avgVehnt.toString())}
            </Cell>
            <Cell>
              {humanReadableVeHNT(stats.iot.stats.avgVehnt.toString())}
            </Cell>
            <Cell>
              {humanReadableVeHNT(stats.mobile.stats.avgVehnt.toString())}
            </Cell>
            <Cell>
              {humanReadableVeHNT(stats.undelegated.stats.avgVehnt.toString())}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Median VeHNT</Cell>
            <Cell>
              {humanReadableVeHNT(stats.network.stats.medianVehnt.toString())}
            </Cell>
            <Cell>
              {humanReadableVeHNT(stats.iot.stats.medianVehnt.toString())}
            </Cell>
            <Cell>
              {humanReadableVeHNT(stats.mobile.stats.medianVehnt.toString())}
            </Cell>
            <Cell>
              {humanReadableVeHNT(
                stats.undelegated.stats.medianVehnt.toString()
              )}
            </Cell>
          </tr>

          <tr>
            <Cell isHeader>Mean Lockup</Cell>
            <Cell>{humanReadableLockup(stats.network.stats.avgLockup)}</Cell>
            <Cell>{humanReadableLockup(stats.iot.stats.avgLockup)}</Cell>
            <Cell>{humanReadableLockup(stats.mobile.stats.avgLockup)}</Cell>
            <Cell>
              {humanReadableLockup(stats.undelegated.stats.avgLockup)}
            </Cell>
          </tr>
          <tr>
            <Cell isHeader>Median Lockup</Cell>
            <Cell>{humanReadableLockup(stats.network.stats.medianLockup)}</Cell>
            <Cell>{humanReadableLockup(stats.iot.stats.medianLockup)}</Cell>
            <Cell>{humanReadableLockup(stats.mobile.stats.medianLockup)}</Cell>
            <Cell>
              {humanReadableLockup(stats.undelegated.stats.medianLockup)}
            </Cell>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

type MobileRowProps = {
  label: string
  network: string
  mobile: string
  iot: string
  undelegated: string
}

const MobileRow = ({
  label,
  network,
  mobile,
  iot,
  undelegated,
}: MobileRowProps) => {
  return (
    <>
      <thead>
        <tr>
          <Cell isHeader colSpan={2} styles="text-center">
            {label}
          </Cell>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Cell isHeader>Network</Cell>
          <Cell>{network}</Cell>
        </tr>
        <tr>
          <Cell isHeader>IOT</Cell>
          <Cell>{iot}</Cell>
        </tr>
        <tr>
          <Cell isHeader>Mobile</Cell>
          <Cell>{mobile}</Cell>
        </tr>
        <tr>
          <Cell isHeader>Undelegated</Cell>
          <Cell>{undelegated}</Cell>
        </tr>
      </tbody>
    </>
  )
}

const GovernanceMetricsMobile = ({ stats }: { stats: any }) => {
  return (
    <div className="flex-col  justify-center gap-4 sm:hidden">
      <table className="m-auto flex-1 table-auto">
        <MobileRow
          label="Positions #"
          network={humanReadable(stats.network.total.count, 0)}
          iot={humanReadable(stats.iot.total.count, 0)}
          mobile={humanReadable(stats.mobile.total.count, 0)}
          undelegated={humanReadable(stats.undelegated.total.count, 0)}
        />
        <MobileRow
          label="Total HNT"
          network={humanReadableHnt(stats.network.total.hnt)}
          iot={humanReadableHnt(stats.iot.total.hnt)}
          mobile={humanReadableHnt(stats.mobile.total.hnt)}
          undelegated={humanReadableHnt(stats.undelegated.total.hnt)}
        />
        <MobileRow
          label="Mean HNT"
          network={humanReadableHnt(stats.network.stats.avgHnt)}
          iot={humanReadableHnt(stats.iot.stats.avgHnt)}
          mobile={humanReadableHnt(stats.mobile.stats.avgHnt)}
          undelegated={humanReadableHnt(stats.undelegated.stats.avgHnt)}
        />
        <MobileRow
          label="Median HNT"
          network={humanReadableHnt(stats.network.stats.medianHnt)}
          iot={humanReadableHnt(stats.iot.stats.medianHnt)}
          mobile={humanReadableHnt(stats.mobile.stats.medianHnt)}
          undelegated={humanReadableHnt(stats.undelegated.stats.medianHnt)}
        />
        <MobileRow
          label="Total veHNT"
          network={humanReadableVeHNT(stats.network.total.vehnt.toString())}
          iot={humanReadableVeHNT(stats.iot.total.vehnt.toString())}
          mobile={humanReadableVeHNT(stats.mobile.total.vehnt.toString())}
          undelegated={humanReadableVeHNT(
            stats.undelegated.total.vehnt.toString()
          )}
        />
        <MobileRow
          label="Mean VeHNT"
          network={humanReadableVeHNT(stats.network.stats.avgVehnt.toString())}
          iot={humanReadableVeHNT(stats.iot.stats.avgVehnt.toString())}
          mobile={humanReadableVeHNT(stats.mobile.stats.avgVehnt.toString())}
          undelegated={humanReadableVeHNT(
            stats.undelegated.stats.avgVehnt.toString()
          )}
        />
        <MobileRow
          label="Median VeHNT"
          network={humanReadableVeHNT(
            stats.network.stats.medianVehnt.toString()
          )}
          iot={humanReadableVeHNT(stats.iot.stats.medianVehnt.toString())}
          mobile={humanReadableVeHNT(stats.mobile.stats.medianVehnt.toString())}
          undelegated={humanReadableVeHNT(
            stats.undelegated.stats.medianVehnt.toString()
          )}
        />
        <MobileRow
          label="Mean Lockup"
          network={humanReadableLockup(stats.network.stats.avgLockup)}
          iot={humanReadableLockup(stats.iot.stats.avgLockup)}
          mobile={humanReadableLockup(stats.mobile.stats.avgLockup)}
          undelegated={humanReadableLockup(stats.undelegated.stats.avgLockup)}
        />
        <MobileRow
          label="Median Lockup"
          network={humanReadableLockup(stats.network.stats.medianLockup)}
          iot={humanReadableLockup(stats.iot.stats.medianLockup)}
          mobile={humanReadableLockup(stats.mobile.stats.medianLockup)}
          undelegated={humanReadableLockup(
            stats.undelegated.stats.medianLockup
          )}
        />
      </table>
    </div>
  )
}

export const GovernanceMetrics = async () => {
  const governanceStats = await fetchGovernanceStats()

  return (
    <>
      <GovernanceMetricsDesktop stats={governanceStats} />
      <GovernanceMetricsMobile stats={governanceStats} />
    </>
  )
}
