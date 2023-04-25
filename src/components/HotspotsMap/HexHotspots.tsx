import { PreferencesProvider } from "@/context/usePreferences"
import clsx from "clsx"
import { HexHotSpotItem } from "./HexHotspotItem"

interface SmallCell {
  cell_id: string
}

export interface Hotspot {
  hotspot_id: string
  active: boolean
  cells: SmallCell[]
}

interface HexData {
  hex: string
  resolution: number
  hotspots: Hotspot[]
}

function getGroupedHotspots(hotspots: Hotspot[]) {
  const groupedHotspots: {
    [group: string]: Hotspot[]
  } = {
    active: [],
    inactive: [],
  }

  hotspots.forEach((hotspot) => {
    const group = hotspot.active ? "active" : "inactive"
    groupedHotspots[group].push(hotspot)
  })

  return groupedHotspots
}

export async function HexHotspots({ hexId }: { hexId: string }) {
  const { hotspots } = (await fetch(
    `${process.env.NEXT_PUBLIC_HOTSPOTTY_EXPLORER_API_URL}/hex/${hexId}`,
    {
      headers: {
        Authorization: `bearer ${process.env.NEXT_PUBLIC_HOTSPOTTY_EXPLORER_API_TOKEN}`,
      },
    }
  ).then((res) => res.json())) as HexData

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
      {Object.keys(groupedList).map((group) => {
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
              <span className="capitalize">{group}</span>
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
                  <HexHotSpotItem key={hotspot.hotspot_id} hotspot={hotspot} />
                ))}
              </ul>
            </PreferencesProvider>
          </div>
        )
      })}
    </div>
  )
}
