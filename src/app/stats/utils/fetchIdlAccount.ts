import { BorshAccountsCoder, Idl, IdlAccounts } from "@coral-xyz/anchor"
import { TypedAccountParser } from "@helium/spl-utils"
import { PublicKey } from "@solana/web3.js"
import { AccountState, fetchAccount } from "./fetchAccount"

export function fetchIdlAccount<IDL extends Idl, A extends string = string>(
  key: PublicKey,
  idl: IDL,
  type: A
): Promise<AccountState<IdlAccounts<Idl>[A]>> {
  const parser: TypedAccountParser<IdlAccounts<Idl>[A]> = (pubkey, data) => {
    try {
      const coder = new BorshAccountsCoder(idl)
      const decoded = coder.decode(type, data.data)
      decoded.pubkey = pubkey
      return decoded
    } catch (e: any) {
      console.error(e)
    }
  }
  return fetchAccount(key, parser)
}
