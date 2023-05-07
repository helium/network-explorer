import { Account, unpackAccount } from "@solana/spl-token"
import { AccountInfo, PublicKey } from "@solana/web3.js"
import { AccountState, fetchAccount } from "./fetchAccount"

const parser = (
  pubkey: PublicKey,
  acct: AccountInfo<Buffer>
): Account | undefined => {
  return unpackAccount(pubkey, acct)
}

export function fetchTokenAccount(
  address: PublicKey | undefined | null
): Promise<AccountState<Account | undefined>> {
  return fetchAccount(address, parser)
}
