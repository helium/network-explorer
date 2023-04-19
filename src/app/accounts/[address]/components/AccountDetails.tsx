"use client"

import Address from "@helium/address"
import { PublicKey } from "@solana/web3.js"
import clsx from "clsx"
import Link from "next/link"
import { useParams } from "next/navigation"

export const AccountDetails = () => {
  const { address } = useParams()
  const walletAddress = Address.fromB58(address)
  const solanaAddress = new PublicKey(walletAddress.publicKey).toBase58()

  return (
    <div className="flex-column justify-between text-zinc-800 dark:text-slate-100 sm:items-center">
      <p>View Account-specific data on:</p>
      <ul className="p-4">
        <li className="flex">
          <Link
            href={`https://explorer.solana.com/address/${solanaAddress}`}
            className={clsx(
              "flex gap-2 rounded-xl p-3",
              "border-zinc-900/5 bg-white text-zinc-800 shadow",
              "dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
            )}
            target="_"
          >
            <p>Solana Explorer</p>
          </Link>
        </li>
      </ul>
    </div>
  )
}
