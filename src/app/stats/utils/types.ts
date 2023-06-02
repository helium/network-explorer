import { IdlAccounts, IdlTypes } from "@coral-xyz/anchor"
import { HeliumSubDaos } from "@helium/idls/lib/types/helium_sub_daos"
import { VoterStakeRegistry as HeliumVoterStakeRegistry } from "@helium/idls/lib/types/voter_stake_registry"
import { PublicKey } from "@solana/web3.js"

export type SubDao = "iot" | "mobile"
// ripped from governance-ui - should eventually get moved into helium-program-library
export type VotingMintConfig =
  IdlTypes<HeliumVoterStakeRegistry>["VotingMintConfigV0"]
type RegistrarV0 = IdlAccounts<HeliumVoterStakeRegistry>["registrar"]
export type Lockup = IdlTypes<HeliumVoterStakeRegistry>["Lockup"]

export type PositionV0 = IdlAccounts<HeliumVoterStakeRegistry>["positionV0"]
export interface Position extends Omit<PositionV0, "lockup"> {
  lockup: Lockup
  pubkey: PublicKey
}

export type DelegatedPositionV0 =
  IdlAccounts<HeliumSubDaos>["delegatedPositionV0"]
export interface DelegatedPosition extends DelegatedPositionV0 {
  pubkey: PublicKey
}

export interface Registrar extends RegistrarV0 {
  votingMints: VotingMintConfig[]
}

export type LockupKind = IdlTypes<HeliumVoterStakeRegistry>["LockupKind"]
