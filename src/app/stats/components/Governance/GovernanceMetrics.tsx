import { humanReadable } from "@helium/spl-utils"
import clsx from "clsx"
import { Fragment, PropsWithChildren } from "react"
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

const GovernanceMetricsDesktop = ({ statsRows }: { statsRows: StatsRow[] }) => {
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
          {statsRows.map((statsRow) => {
            return (
              <tr key={statsRow.label}>
                <Cell isHeader>{statsRow.label}</Cell>
                <Cell>{statsRow.network}</Cell>
                <Cell>{statsRow.iot}</Cell>
                <Cell>{statsRow.mobile}</Cell>
                <Cell>{statsRow.undelegated}</Cell>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const GovernanceMetricsMobile = ({ statsRows }: { statsRows: StatsRow[] }) => {
  return (
    <div className="flex-col  justify-center gap-4 sm:hidden">
      <table className="m-auto flex-1 table-auto">
        {statsRows.map((statsRow) => {
          return (
            <Fragment key={statsRow.label}>
              <thead>
                <tr>
                  <Cell isHeader colSpan={2} styles="text-center">
                    {statsRow.label}
                  </Cell>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Cell isHeader>Network</Cell>
                  <Cell>{statsRow.network}</Cell>
                </tr>
                <tr>
                  <Cell isHeader>IOT</Cell>
                  <Cell>{statsRow.iot}</Cell>
                </tr>
                <tr>
                  <Cell isHeader>Mobile</Cell>
                  <Cell>{statsRow.mobile}</Cell>
                </tr>
                <tr>
                  <Cell isHeader>Undelegated</Cell>
                  <Cell>{statsRow.undelegated}</Cell>
                </tr>
              </tbody>
            </Fragment>
          )
        })}
      </table>
    </div>
  )
}

type StatsRow = {
  label: string
  network: string
  iot: string
  mobile: string
  undelegated: string
}

export const GovernanceMetrics = async () => {
  const stats = await fetchGovernanceStats()
  const statsRows: StatsRow[] = [
    {
      label: "Positions #",
      network: humanReadable(stats.network.total.count, 0),
      iot: humanReadable(stats.iot.total.count, 0),
      mobile: humanReadable(stats.mobile.total.count, 0),
      undelegated: humanReadable(stats.undelegated.total.count, 0),
    },
    {
      label: "Total HNT",
      network: humanReadableHnt(stats.network.total.hnt),
      iot: humanReadableHnt(stats.iot.total.hnt),
      mobile: humanReadableHnt(stats.mobile.total.hnt),
      undelegated: humanReadableHnt(stats.undelegated.total.hnt),
    },
    {
      label: "Mean HNT",
      network: humanReadableHnt(stats.network.stats.avgHnt),
      iot: humanReadableHnt(stats.iot.stats.avgHnt),
      mobile: humanReadableHnt(stats.mobile.stats.avgHnt),
      undelegated: humanReadableHnt(stats.undelegated.stats.avgHnt),
    },
    {
      label: "Median HNT",
      network: humanReadableHnt(stats.network.stats.medianHnt),
      iot: humanReadableHnt(stats.iot.stats.medianHnt),
      mobile: humanReadableHnt(stats.mobile.stats.medianHnt),
      undelegated: humanReadableHnt(stats.undelegated.stats.medianHnt),
    },
    {
      label: "Total veHNT",
      network: humanReadableVeHNT(stats.network.total.vehnt.toString()),
      iot: humanReadableVeHNT(stats.iot.total.vehnt.toString()),
      mobile: humanReadableVeHNT(stats.mobile.total.vehnt.toString()),
      undelegated: humanReadableVeHNT(stats.undelegated.total.vehnt.toString()),
    },
    {
      label: "Mean VeHNT",
      network: humanReadableVeHNT(stats.network.stats.avgVehnt.toString()),
      iot: humanReadableVeHNT(stats.iot.stats.avgVehnt.toString()),
      mobile: humanReadableVeHNT(stats.mobile.stats.avgVehnt.toString()),
      undelegated: humanReadableVeHNT(
        stats.undelegated.stats.avgVehnt.toString()
      ),
    },
    {
      label: "Median VeHNT",
      network: humanReadableVeHNT(stats.network.stats.medianVehnt.toString()),
      iot: humanReadableVeHNT(stats.iot.stats.medianVehnt.toString()),
      mobile: humanReadableVeHNT(stats.mobile.stats.medianVehnt.toString()),
      undelegated: humanReadableVeHNT(
        stats.undelegated.stats.medianVehnt.toString()
      ),
    },
    {
      label: "Mean Lockup",
      network: humanReadableLockup(stats.network.stats.avgLockup),
      iot: humanReadableLockup(stats.iot.stats.avgLockup),
      mobile: humanReadableLockup(stats.mobile.stats.avgLockup),
      undelegated: humanReadableLockup(stats.undelegated.stats.avgLockup),
    },
    {
      label: "Median Lockup",
      network: humanReadableLockup(stats.network.stats.medianLockup),
      iot: humanReadableLockup(stats.iot.stats.medianLockup),
      mobile: humanReadableLockup(stats.mobile.stats.medianLockup),
      undelegated: humanReadableLockup(stats.undelegated.stats.medianLockup),
    },
  ]

  return (
    <>
      <GovernanceMetricsDesktop statsRows={statsRows} />
      <GovernanceMetricsMobile statsRows={statsRows} />
    </>
  )
}
