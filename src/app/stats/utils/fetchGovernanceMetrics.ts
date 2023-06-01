import { BN } from "@coral-xyz/anchor"
import { cache } from "react"
import { addPositionsMeta } from "./addPositionsMeta"
import { fetchDelegatedPositions } from "./fetchDelegatedPositions"
import { fetchPositions } from "./fetchPositions"
import {
  PositionMetricsByGroup,
  getGroupedPositionMetrics,
  getPositionMetrics,
} from "./positionsMetrics"
import { SubDao } from "./types"

// Constant dev stats to avoid lengthy query
const DEV_STATS: PositionMetricsByGroup = {
  iot: {
    stats: {
      avgVehnt: new BN("16504989572469"),
      avgHnt: new BN("118766358469"),
      avgLockup: new BN("70832890"),
      medianVehnt: new BN("591001198238"),
      medianHnt: new BN("5000000000"),
      medianLockup: new BN("61595855"),
    },
    total: {
      count: new BN("8028"),
      hnt: new BN("953451549365328"),
      vehnt: new BN("132501876514036308"),
    },
  },
  mobile: {
    stats: {
      avgVehnt: new BN("20131304531050"),
      avgHnt: new BN("212512684786"),
      avgLockup: new BN("71358773"),
      medianVehnt: new BN("675000000000"),
      medianHnt: new BN("5000000000"),
      medianLockup: new BN("61615151"),
    },
    total: {
      count: new BN("3397"),
      hnt: new BN("721905090218708"),
      vehnt: new BN("68385810657852879"),
    },
  },
  network: {
    stats: {
      avgVehnt: new BN("21076989079226"),
      avgHnt: new BN("274595426492"),
      avgLockup: new BN("68202917"),
      medianVehnt: new BN("527268864466"),
      medianHnt: new BN("5000000000"),
      medianLockup: new BN("61405008"),
    },
    total: {
      count: new BN("12931"),
      hnt: new BN("3550788683546754"),
      vehnt: new BN("272546366009733278"),
    },
  },
  undelegated: {
    stats: {
      avgVehnt: new BN("47582062986392"),
      avgHnt: new BN("1245308130121"),
      avgLockup: new BN("47114737"),
      medianVehnt: new BN("162650183588"),
      medianHnt: new BN("2500000000"),
      medianLockup: new BN("30003207"),
    },
    total: {
      count: new BN("1506"),
      hnt: new BN("1875432043962718"),
      vehnt: new BN("71658467167152029"),
    },
  },
}
const getHntGovernanceMetrics = async () => {
  if (process.env.NODE_ENV === "development") {
    return DEV_STATS
  }

  const [positions, delegatedPositions] = await Promise.all([
    fetchPositions("hnt"),
    fetchDelegatedPositions(),
  ])

  const positionsWithMeta = await addPositionsMeta({
    positions: positions.map(({ info }) => info),
    delegatedPositions: delegatedPositions.map(({ info }) => info),
  })
  return await getGroupedPositionMetrics(positionsWithMeta)
}

export const fetchHntGovernanceStats = cache(getHntGovernanceMetrics)

const getSubDaoGovernanceMetrics = async (subDao: SubDao) => {
  if (process.env.NODE_ENV === "development") {
    return DEV_STATS[subDao]
  }

  const positions = await fetchPositions(subDao)
  const positionsWithMeta = await addPositionsMeta({
    positions: positions.map(({ info }) => info),
    delegatedPositions: [],
  })
  const metrics = await getPositionMetrics(positionsWithMeta)

  return metrics
}

export const fetchSubDaoGovernanceStats = cache(async (subDao: SubDao) => {
  return await getSubDaoGovernanceMetrics(subDao)
})
