import { IdlAccounts, IdlTypes } from "@coral-xyz/anchor"
import { HeliumSubDaos } from "@helium/idls/lib/types/helium_sub_daos"
import { VoterStakeRegistry as HeliumVoterStakeRegistry } from "@helium/idls/lib/types/voter_stake_registry"

// ripped from governance-ui - should eventually get moved into helium-program-library
export type VotingMintConfig =
  IdlTypes<HeliumVoterStakeRegistry>["VotingMintConfigV0"]
type RegistrarV0 = IdlAccounts<HeliumVoterStakeRegistry>["registrar"]
export type Lockup = IdlTypes<HeliumVoterStakeRegistry>["Lockup"]
export type PositionV0 = IdlAccounts<HeliumVoterStakeRegistry>["positionV0"]
export type DelegatedPostionV0 =
  IdlAccounts<HeliumSubDaos>["delegatedPositionV0"]
export interface Registrar extends RegistrarV0 {
  votingMints: VotingMintConfig[]
}
export interface Position extends Omit<PositionV0, "lockup"> {
  lockup: Lockup
}

export type LockupKind = IdlTypes<HeliumVoterStakeRegistry>["LockupKind"]
