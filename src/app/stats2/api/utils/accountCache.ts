import { AccountFetchCache } from "@helium/spl-utils"
import { Connection } from "@solana/web3.js"

const createAccountCache = () => {
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC!)

  return new AccountFetchCache({
    connection,
    delay: 50,
    commitment: "confirmed",
    extendConnection: false,
  })
}

export const accountCache = createAccountCache()
