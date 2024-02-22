import {
  fetchHntGovernanceStats,
  fetchSubDaoGovernanceStats,
} from "../../utils/fetchGovernanceMetrics"
import { GraphWrapper } from "../GraphWrapper"
import { DelegationHistory } from "./DelegationHistory"

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
          veHNT Governance
        </h2>
        <GraphWrapper label="Delegation History (30 days)">
          {/* @ts-expect-error Async Server Component */}
          <DelegationHistory />
        </GraphWrapper>
        {/* <MetricsRow
          title="Network"
          icon="hnt"
          groupStats={veHntStats.network}
          token="HNT"
        />
        <MetricsRow
          title="Delegated to IOT"
          icon="iot"
          groupStats={veHntStats.iot}
          token="HNT"
        />
        <MetricsRow
          title="Delegated to MOBILE"
          icon="mobile"
          groupStats={veHntStats.mobile}
          token="HNT"
        />
        <MetricsRow
          title="Undelegated"
          icon="hnt"
          groupStats={veHntStats.undelegated}
          token="HNT"
        /> */}
      </div>

      {/* <hr className="mx-4 my-8" />
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
      /> */}
    </div>
  )
}
