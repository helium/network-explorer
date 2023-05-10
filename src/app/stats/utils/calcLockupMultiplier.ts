// ripped from governance-ui - should eventually get moved into helium-program-library

export const calcMultiplier = ({
  baselineScaledFactor,
  maxExtraLockupScaledFactor,
  lockupSecs,
  lockupSaturationSecs,
}: {
  baselineScaledFactor: number
  maxExtraLockupScaledFactor: number
  lockupSecs: number
  lockupSaturationSecs: number
}): number => {
  let multiplier = 0
  const base = baselineScaledFactor !== 0 ? baselineScaledFactor : 1e9

  multiplier =
    (Math.min(lockupSecs / lockupSaturationSecs, 1) *
      maxExtraLockupScaledFactor) /
    base

  return multiplier
}
