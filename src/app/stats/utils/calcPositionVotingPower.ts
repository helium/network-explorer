import { BN } from "@coral-xyz/anchor"
import { calcMultiplier } from "./calcLockupMultiplier"
import { LockupKind, Position, Registrar, VotingMintConfig } from "./types"

// ripped from governance-ui - should eventually get moved into helium-program-library
export const calcPositionVotingPower = ({
  position,
  registrar,
  unixNow,
}: {
  position: Position | null
  registrar: Registrar | null
  unixNow: BN
}) => {
  let votingPower: BN = new BN(0)
  const mintCfgs = registrar?.votingMints || []
  const mintCfg = position ? mintCfgs[position.votingMintConfigIdx] : undefined

  console.log("registrar", registrar)
  console.log("mintCfgs", mintCfgs)
  console.log("mintCfg", mintCfg)

  if (position && mintCfg) {
    const {
      lockupSaturationSecs,
      baselineVoteWeightScaledFactor,
      maxExtraLockupVoteWeightScaledFactor,
      genesisVotePowerMultiplier = 1,
    } = mintCfg as VotingMintConfig
    console.log("mintcfg info")
    console.log({
      lockupSaturationSecs,
      baselineVoteWeightScaledFactor,
      maxExtraLockupVoteWeightScaledFactor,
      genesisVotePowerMultiplier,
    })
    const hasGenesisMultiplier = position.genesisEnd.gt(unixNow)
    const lockup = position!.lockup
    const lockupKind = Object.keys(lockup.kind as LockupKind)[0]
    const currTs = lockupKind === "constant" ? lockup.startTs : unixNow
    console.log("lockup", lockup)
    console.log("lockupKind", lockupKind)
    console.log("endTs", lockup.endTs.toNumber())
    console.log("endTs", lockup.endTs.toNumber())

    const lockupSecs = lockup.endTs.sub(currTs).toNumber()
    const amountLockedNative = position!.amountDepositedNative
    const baselineScaledFactorNum = baselineVoteWeightScaledFactor.toNumber()
    const maxExtraLockupVoteWeightScaledFactorNum =
      maxExtraLockupVoteWeightScaledFactor.toNumber()
    const lockupSaturationSecsNum = lockupSaturationSecs.toNumber()

    const multiplier =
      (hasGenesisMultiplier ? genesisVotePowerMultiplier : 1) *
      calcMultiplier({
        baselineScaledFactor: baselineScaledFactorNum,
        maxExtraLockupScaledFactor: maxExtraLockupVoteWeightScaledFactorNum,
        lockupSecs,
        lockupSaturationSecs: lockupSaturationSecsNum,
      })

    votingPower = amountLockedNative.muln(multiplier)
  }

  return votingPower
}
