import { humanReadable } from "@helium/spl-utils"
import {
  humanReadableLockup,
  humanReadableToken,
  humanReadableVeToken,
} from "../../utils"
import { PositionMetrics } from "../../utils/positionsMetrics"
import { Icon, StatsList } from "../StatsList"
import { GovernanceStatItem } from "./GovernanceStatItem"

type MetricsRowProps = {
  groupStats: PositionMetrics
  icon: Icon
  title: string
  token: string
}

export const MetricsRow = ({
  groupStats,
  icon,
  title,
  token,
}: MetricsRowProps) => {
  const isSubDao = icon === "mobile" || icon === "iot"
  const decimals = token === "HNT" ? 8 : 6

  let hntDescription = `Total, mean, and median of locked up ${token}`
  let veDescription = `Total, mean, and median of ${token} positions' ve${token} voting power`
  if (isSubDao) {
    if (token === "HNT") {
      hntDescription += ` delegated to ${icon.toUpperCase()}`
      veDescription += ` delegated to ${icon.toUpperCase()}`
    }
  } else if (title === "Undelegated") {
    hntDescription += ` that is undelegated`
    veDescription += " that is undelegated"
  } else {
    hntDescription += ` that is delegated network wide`
    veDescription += " for the network"
  }

  return (
    <StatsList title={title} icon={icon}>
      <div className="grow flex-wrap gap-3 md:flex">
        <div className="flex grow gap-3 pb-3 md:pb-0">
          <GovernanceStatItem
            header="Positions"
            values={[
              {
                label: "Total",
                value: humanReadable(groupStats.total.count, 0),
              },
            ]}
          />
          <GovernanceStatItem
            header={token}
            values={[
              {
                label: "Total",
                value: humanReadableToken(groupStats.total.hnt, decimals),
              },
              {
                label: "Mean",
                value: humanReadableToken(groupStats.stats.avgHnt, decimals),
              },
              {
                label: "Median",
                value: humanReadableToken(groupStats.stats.medianHnt, decimals),
              },
            ]}
            tooltip={{
              id: `${title} positions ${token}`,
              description: `${hntDescription}.`,
            }}
          />
        </div>
        <div className="flex grow gap-3">
          <GovernanceStatItem
            header={`ve${token} voting power`}
            values={[
              {
                label: "Total",
                value: humanReadableVeToken(
                  groupStats.total.vehnt.toString(),
                  decimals
                ),
              },
              {
                label: "Mean",
                value: humanReadableVeToken(
                  groupStats.stats.avgVehnt.toString(),
                  decimals
                ),
              },
              {
                label: "Median",
                value: humanReadableVeToken(
                  groupStats.stats.medianVehnt.toString(),
                  decimals
                ),
              },
            ]}
            tooltip={{
              id: `${title} positions veHNT`,
              description: `${veDescription}.`,
            }}
          />
          <GovernanceStatItem
            header="Lockup Duration"
            values={[
              {
                label: "Mean",
                value: humanReadableLockup(groupStats.stats.avgLockup),
              },
              {
                label: "Median",
                value: humanReadableLockup(groupStats.stats.medianLockup),
              },
            ]}
            tooltip={{
              id: `${title} positions lockup`,
              description: `Mean and median duration of time the ${token} positions are locked up for.`,
            }}
          />
        </div>
      </div>
    </StatsList>
  )
}
