import clsx from "clsx"
import { PropsWithChildren } from "react"
import {
  fetchHntGovernanceStats,
  fetchSubDaoGovernanceStats,
} from "../../utils/fetchGovernanceMetrics"
import { DelegationHistory } from "./DelegationHistory"
import { MetricsRow } from "./MetricsRow"
const GovernanceItem = ({
  children,
  label,
}: PropsWithChildren<{ label: string }>) => {
  return (
    <div
      className={clsx(
        "flex-col gap-2 rounded-xl border p-4",
        "border-zinc-900/5 bg-white text-zinc-800 shadow",
        "dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
      )}
    >
      <p className="pb-2 text-sm">{label}</p>
      {children}
    </div>
  )
}

export const Governance = async () => {
  const [veHntStats, veIotMetrics, veMobileMetrics] = await Promise.all([
    fetchHntGovernanceStats(),
    fetchSubDaoGovernanceStats("iot"),
    fetchSubDaoGovernanceStats("mobile"),
  ])

  return (
    <div>
      <hr className="mx-4 my-8" />
      <div className="flex flex-col gap-2">
        <h2 className="text-xl text-zinc-600 dark:text-zinc-100">
          HNT Governance
        </h2>
        <GovernanceItem label="Delegation History (30 days)">
          {/* @ts-expect-error Async Server Component */}
          <DelegationHistory />
        </GovernanceItem>
        <MetricsRow
          title="Network"
          icon="hnt"
          groupStats={veHntStats.network}
          token="HNT"
        />
        <MetricsRow
          title="IOT"
          icon="iot"
          groupStats={veHntStats.iot}
          token="HNT"
        />
        <MetricsRow
          title="MOBILE"
          icon="mobile"
          groupStats={veHntStats.mobile}
          token="HNT"
        />
        <MetricsRow
          title="Undelegated"
          icon="hnt"
          groupStats={veHntStats.undelegated}
          token="HNT"
        />
      </div>

      <hr className="mx-4 my-8" />
      <MetricsRow
        title="veIOT Governance"
        icon="iot"
        groupStats={veIotMetrics}
        token="IOT"
      />
      <hr className="mx-4 my-8" />
      <MetricsRow
        title="veMOBILE Governance"
        icon="mobile"
        groupStats={veMobileMetrics}
        token="MOBILE"
      />
    </div>
  )
}
