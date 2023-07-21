import { BorshAccountsCoder, Idl, IdlAccounts } from "@coral-xyz/anchor"
import { TypedAccountParser } from "@helium/account-fetch-cache"

export function getIdlParser<IDL extends Idl, A extends string = string>(
  idl: IDL,
  type: A
) {
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
  return parser
}
