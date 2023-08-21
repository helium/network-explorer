"use client"

import { PROVIDERS } from "@/app/preferences/components/ProviderList"
import clsx from "clsx"
import Link from "next/link"
import { useParams } from "next/navigation"

export const HotspotDetails = () => {
  const { address } = useParams()

  return (
    <div className="flex-column justify-between text-zinc-800 dark:text-slate-100 sm:items-center">
      <p>View Hotspot-specific data on:</p>
      <ul className="px-4">
        {PROVIDERS.map((provider) => {
          return (
            <li className="mt-2 flex" key={provider.label}>
              <Link
                href={provider.getUrl(address)}
                className={clsx(
                  "flex w-[120px] gap-2 rounded-xl p-3",
                  "border-zinc-900/5 bg-white text-zinc-800 shadow",
                  "dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
                )}
                target="_"
              >
                {provider.Icon} {provider.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
