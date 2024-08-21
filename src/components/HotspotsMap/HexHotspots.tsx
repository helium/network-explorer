"use client"

import { Tooltip } from "@/app/stats/components/Tooltip"
import { PreferencesProvider } from "@/context/usePreferences"
import clsx from "clsx"
import { HexHotSpotItem } from "./HexHotspotItem"

export type Hotspot = {
  address: string
  name: string
  status: number
  statusString: "active" | "inactive"
  capabilities: {
    mobile: boolean
    iot: boolean
    cbrs: boolean
    wifi: boolean
  }
  location: {
    hex: string
  }
}

const RECENT = "recently rewarded"
const NOT_RECENT = "not recently rewarded"

const TOOLTIP_DESCRIPTIONS = {
  [RECENT]: "A hotspot that has received rewards in the past 30 days.",
  [NOT_RECENT]:
    "A hotspot that has not received rewards in the past 30 days. Such a hotstop is most likely offline. It is also possible for it to be online but not rewarded if it is not transmitting data, not participating in PoC, or only recently online.",
}

function getGroupedHotspots(hotspots: Hotspot[]) {
  const groupedHotspots: {
    [RECENT]: Hotspot[]
    [NOT_RECENT]: Hotspot[]
  } = {
    [RECENT]: [],
    [NOT_RECENT]: [],
  }

  hotspots.forEach((hotspot) => {
    const group = hotspot.status === 0 ? RECENT : NOT_RECENT
    groupedHotspots[group].push(hotspot)
  })

  return groupedHotspots
}

export async function HexHotspots({ hexId }: { hexId: string }) {
  console.log(process.env.NEXT_PUBLIC_HELIUMGEEK_EXPLORER_API2_URL)
  console.log(process.env.NEXT_PUBLIC_HELIUMGEEK_EXPLORER_API_TOKEN)
  const hotspots = (await fetch(
    `${process.env.NEXT_PUBLIC_HELIUMGEEK_EXPLORER_API2_URL}/hex/${hexId}`,
    {
      headers: {
        "x-api-key": `${process.env.NEXT_PUBLIC_HELIUMGEEK_EXPLORER_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json())) as Hotspot[]

  const groupedList = getGroupedHotspots(hotspots)

  if (hotspots.length === 0) {
    return (
      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-zinc-200">
        This hex contains no Hotspots.
      </div>
    )
  }

  return (
    <div className="relative flex-1 overflow-y-auto">
      {(Object.keys(groupedList) as Array<keyof typeof groupedList>).map(
        (group) => {
          if (groupedList[group].length === 0) return
          return (
            <div key={group}>
              <div
                className={clsx(
                  "sticky top-0 z-10 flex items-center justify-between rounded-lg px-2.5 py-1 text-sm font-medium",
                  "bg-zinc-300/80 text-gray-700",
                  "dark:bg-zinc-500/50 dark:text-white"
                )}
              >
                <div className="flex gap-2">
                  <span className="capitalize">{group}</span>
                  <Tooltip
                    id={group}
                    description={TOOLTIP_DESCRIPTIONS[group]}
                    width="tiny"
                  />
                </div>
                <span className="ml-2 text-xs font-normal">
                  {groupedList[group].length} Hotspots
                </span>
              </div>
              <PreferencesProvider>
                <ul
                  role="list"
                  className="z-0 flex-1 divide-y divide-gray-200 overflow-y-auto dark:divide-white/10"
                >
                  {groupedList[group].map((hotspot) => (
                    <HexHotSpotItem key={hotspot.address} hotspot={hotspot} />
                  ))}
                </ul>
              </PreferencesProvider>
            </div>
          )
        }
      )}
    </div>
  )
}
