import { Mint, unpackMint } from "@solana/spl-token"
import { AccountInfo, PublicKey } from "@solana/web3.js"
import { ParsedAccountBase, fetchAccount } from "./fetchAccount"

export const MintParser = (pubKey: PublicKey, info: AccountInfo<Buffer>) => {
  const data = unpackMint(pubKey, info)

  const details = {
    pubkey: pubKey,
    account: {
      ...info,
    },
    info: data,
  } as ParsedAccountBase<Mint>

  return details
}

export function fetchMint(key: PublicKey | undefined | null) {
  return fetchAccount<ParsedAccountBase<Mint>>(key, MintParser)
}
