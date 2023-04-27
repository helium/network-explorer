import { useIdlAccount } from "@helium/helium-react-hooks"
import { VoterStakeRegistry } from "@helium/idls/lib/types/voter_stake_registry"
import { PublicKey } from "@solana/web3.js"
import { useMemo } from "react"
// @ts-ignore
import { IDL as VSRegistryIDL } from "@helium/idls/voter_stake_registry"

export const useRegistrar = () => {
  const registrarKey = useMemo(
    () => new PublicKey("BMnWRWZrWqb6JMKznaDqNxWaWAHoaTzVabM6Qwyh3WKz"),
    []
  )
  return useIdlAccount<VoterStakeRegistry>(
    registrarKey,
    VSRegistryIDL as VoterStakeRegistry,
    "registrar"
  )
}
