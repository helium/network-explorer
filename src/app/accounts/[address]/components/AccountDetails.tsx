"use client"

import Address from "@helium/address"
import { PublicKey } from "@solana/web3.js"
import Link from "next/link"
import { useParams } from "next/navigation"

export const AccountDetails = () => {
  const { address } = useParams()
  const walletAddress = Address.fromB58(address)
  const solanaAddress = new PublicKey(walletAddress.publicKey).toBase58()

  return (
    <div className="flex-column justify-between text-zinc-800 dark:text-slate-100 sm:items-center">
      <p>
        The Helium explorer no longer provides account specific data. View
        Account-specific data on:
      </p>
      <ul className="p-4">
        <li>
          <Link
            href={`https://explorer.solana.com/address/${solanaAddress}`}
            className="flex gap-2"
            target="_"
          >
            <p> Solana Explorer</p>
          </Link>
        </li>
      </ul>
    </div>
  )
}
