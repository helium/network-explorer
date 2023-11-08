import { BN } from "@coral-xyz/anchor"
import { PositionWithMeta, SubDaos } from "./addPositionsMeta"
import { fetchUnixTimestap } from "./fetchUnixTimestamp"
import { LockupKind } from "./types"

export type PositionMetrics = {
  stats: {
    avgVehnt: BN
    avgHnt: BN
    avgLockup: BN
    medianVehnt: BN
    medianHnt: BN
    medianLockup: BN
  }
  total: {
    count: BN
    hnt: BN
    vehnt: BN
  }
}

export type PositionMetricsByGroup = {
  iot: PositionMetrics
  mobile: PositionMetrics
  network: PositionMetrics
  undelegated: PositionMetrics
}

const getMobilePositions = (positions: PositionWithMeta[]) => {
  return positions.filter((position) => position.subDao == SubDaos.MOBILE)
}

const getIotPositions = (positions: PositionWithMeta[]) => {
  return positions.filter((position) => position.subDao == SubDaos.IOT)
}

const getMean = (nums: BN[]): BN => {
  return getSum(nums).div(new BN(nums.length))
}

const getMedian = (nums: BN[]): BN => {
  nums.sort((a, b) => a.cmp(b))
  const count = nums.length
  return nums.length % 2 === 1
    ? nums[Math.floor(count / 2)]
    : nums[count / 2]
        .clone()
        .add(nums[count / 2 - 1])
        .divRound(new BN(2))
}

const getPositionLockups = async (positions: PositionWithMeta[]) => {
  const now = await fetchUnixTimestap()
  const nowBN = new BN(now)

  return positions.map((position) => {
    const lockup = position!.lockup
    const lockupKind = Object.keys(lockup.kind as LockupKind)[0]
    const currTs = lockupKind === "constant" ? lockup.startTs : nowBN
    const lockupSecs = lockup.endTs.sub(currTs)
    return lockupSecs
  })
}

const getSum = (nums: BN[]) => {
  return nums.reduce((acc, currentNum) => {
    return acc.add(currentNum)
  }, nums[0].clone())
}

export const getPositionMetrics = async (positions: PositionWithMeta[]) => {
  const now = await fetchUnixTimestap()
  const nowBN = new BN(now)

  const activePositions = positions.filter((position) => {
    const expiredCliff =
      Object.keys(position.lockup.kind as LockupKind)[0] === "cliff" &&
      position.lockup.endTs.lt(nowBN)

    // constant positions and non expired cliffs are still active
    return !expiredCliff
  })

  const vehnt = activePositions.map(({ veHnt }) => veHnt)
  const hnt = activePositions.map((position) => position.amountDepositedNative)
  const lockups = await getPositionLockups(activePositions)
  const positonMetrics: PositionMetrics = {
    stats: {
      avgVehnt: getMean(vehnt),
      avgHnt: getMean(hnt),
      avgLockup: getMean(lockups),
      medianVehnt: getMedian(vehnt),
      medianHnt: getMedian(hnt),
      medianLockup: getMedian(lockups),
    },
    total: {
      count: new BN(activePositions.length) as BN,
      hnt: getSum(hnt),
      vehnt: getSum(vehnt),
    },
  }

  return positonMetrics
}

export const getGroupedPositionMetrics = async (
  positions: PositionWithMeta[]
) => {
  const iotPositions = getIotPositions(positions)
  const mobilePositions = getMobilePositions(positions)
  const undelegatedPositions = positions.filter((position) => !position.subDao)
  const [iot, mobile, network, undelegated] = await Promise.all([
    getPositionMetrics(iotPositions),
    getPositionMetrics(mobilePositions),
    getPositionMetrics(positions),
    getPositionMetrics(undelegatedPositions),
  ])
  return {
    iot,
    mobile,
    network,
    undelegated,
  }
}
