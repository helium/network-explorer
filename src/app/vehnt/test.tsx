"use client"

import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { PublicKey } from "@solana/web3.js"
import { useEffect } from "react"
import { accountCache } from "../stats/utils/accountCache"

const HELIUM_VSR_ID = "hvsrNC3NKbcryqDs2DocYHZ9yPKEVzdSjQG6RVtK1s8"
const HNT_POSITION_V0_DESCRIMINATAOR = [
  152, 131, 154, 46, 158, 42, 31, 233, 153, 231, 240, 209, 136, 172, 103, 141,
  133, 237, 188, 234, 25, 98, 24, 31, 110, 4, 118, 170, 97, 47, 254, 176, 204,
  205, 221, 23, 230, 245, 155, 49,
]

const buff = Buffer.from(HNT_POSITION_V0_DESCRIMINATAOR)
const B58 = bs58.encode(buff)

export const VeHnt = () => {
  useEffect(() => {
    const fetchAccounts = async () => {
      console.log("fetchAccounts triggered")
      // console.log("position_descriminator", MY_WALLET_ADDRESS.toBase58())
      // console.log("position_descriminator bytes", MY_WALLET_ADDRESS.toBytes())
      const connection = accountCache.connection

      const accounts = await connection.getParsedProgramAccounts(
        new PublicKey(HELIUM_VSR_ID),
        {
          filters: [
            {
              dataSize: 180, // number of bytes
            },
            {
              memcmp: {
                offset: 0, // number of bytes
                bytes: B58, // base58 encoded string
              },
            },
          ],
        }
      )

      console.log(
        `Found ${accounts.length} token account(s) for HNT positions: `
      )
      accounts.forEach((account, i) => {
        if (i <= 2) {
          console.log(
            `-- Token Account Address ${i + 1}: ${account.pubkey.toString()} --`
          )

          console.log(account.pubkey.toString())
        }
        // console.log(`Mint: ${account.account.data["parsed"]["info"]["mint"]}`)
        // console.log(
        //   `Amount: ${account.account.data["parsed"]["info"]["tokenAmount"]["uiAmount"]}`
        // )
      })
    }

    console.log("triggering fetchAccounts")
    fetchAccounts()
  }, [])

  return null
}
