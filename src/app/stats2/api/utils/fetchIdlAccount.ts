import { BorshAccountsCoder, Idl, IdlAccounts } from "@coral-xyz/anchor"
import { TypedAccountParser } from "@helium/spl-utils"
import { PublicKey } from "@solana/web3.js"
import { cache } from "react"

function getIdlAccount<IDL extends Idl, A extends string = string>(
  key: PublicKey,
  idl: IDL,
  type: A
): undefined {
  // ): UseAccountState<IdlAccounts<Idl>[A]> {
  const parser: TypedAccountParser<IdlAccounts<Idl>[A]> = () => {
    return (pubkey: any, data: { data: Buffer }) => {
      try {
        const coder = new BorshAccountsCoder(idl)
        const decoded = coder.decode(type, data.data)
        decoded.pubkey = pubkey
        return decoded
      } catch (e: any) {
        console.error(e)
      }
    }
  }
  return
  // return useAccount(key, parser)
}

export const fetchIdlAccount = cache(getIdlAccount)
