"use client"

import { HotspottyIcon } from "@/components/icons/HotspottyIcon"
import clsx from "clsx"
import Link from "next/link"
import { useParams } from "next/navigation"

export const HotspotDetails = () => {
  const { address } = useParams()
  return (
    <div className="flex-column justify-between text-zinc-800 dark:text-slate-100 sm:items-center">
      <p>View Hotspot-specific data on:</p>
      <ul className="p-4">
        <li className="flex">
          <Link
            href={`https://app.hotspotty.net/devices/${address}/status`}
            className={clsx(
              "flex gap-2 rounded-xl p-3",
              "border-zinc-900/5 bg-white text-zinc-800 shadow",
              "dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
            )}
            target="_"
          >
            <HotspottyIcon className="h-6 w-6 text-[#9546ea]" /> Hotspotty
          </Link>
        </li>
      </ul>
    </div>
  )
}
