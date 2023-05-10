import { VoterStakeRegistry } from "@helium/idls/lib/types/voter_stake_registry"
import { PublicKey } from "@solana/web3.js"
// @ts-ignore
import { IDL as VSRegistryIDL } from "@helium/idls/voter_stake_registry"
import { fetchIdlAccount } from "./fetchIdlAccount"

export const fetchRegistrar = (key: PublicKey) => {
  return fetchIdlAccount<VoterStakeRegistry>(
    key,
    VSRegistryIDL as VoterStakeRegistry,
    "registrar"
  )
}
