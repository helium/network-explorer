import animalHash from "angry-purple-tiger"
import clsx from "clsx"
import HeliumIotIcon from "../icons/HeliumIotIcon"
import HeliumMobileIcon from "../icons/HeliumMobileIcon"

interface SmallCell {
  cell_id: string
  mobile_rewards_24h: number
}

interface Hotspot {
  hotspot_id: string
  iot_rewards_24h: number
  avatar_url: string
  cells: SmallCell[]
}

interface HexData {
  hex: string
  resolution: number
  hotspots: Hotspot[]
}

function getHotspot24hRewards(hotspot: Hotspot) {
  let totalRewards = hotspot.iot_rewards_24h
  hotspot.cells.forEach((cell) => {
    totalRewards += cell.mobile_rewards_24h
  })
  return totalRewards
}

function isHotspotActive(hotspot: Hotspot) {
  return getHotspot24hRewards(hotspot) > 0
}

function getGroupedHotspots(hotspots: Hotspot[]) {
  const groupedHotspots: {
    [group: string]: Hotspot[]
  } = {
    active: [],
    inactive: [],
  }

  hotspots.forEach((hotspot) => {
    const group = isHotspotActive(hotspot) ? "active" : "inactive"
    groupedHotspots[group].push(hotspot)
  })

  return groupedHotspots
}

export default async function HexHotspots({ hexId }: { hexId: string }) {
  const hexData = (await fetch(
    `${process.env.NEXT_PUBLIC_HOTSPOTTY_EXPLORER_API_URL}/hex/${hexId}`,
    {
      headers: {
        Authorization: `bearer ${process.env.NEXT_PUBLIC_HOTSPOTTY_EXPLORER_API_TOKEN}`,
      },
    }
  ).then((res) => res.json())) as HexData

  const hotspots = hexData.hotspots

  hotspots.sort((h1, h2) => getHotspot24hRewards(h2) - getHotspot24hRewards(h1))

  const groupedList = getGroupedHotspots(hotspots)

  if (hotspots.length === 0) {
    return (
      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-zinc-200">
        This hex contains no hotspots.
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
                "sticky top-0 z-10 flex items-center justify-between rounded-lg px-6 py-1 text-sm font-medium",
                "bg-zinc-300/80 text-gray-700",
                "dark:bg-zinc-500/50 dark:text-white"
              )}
            >
              <span className="capitalize">{group}</span>
              <span className="ml-2 text-xs font-normal">
                {groupedList[group].length} hotspots
              </span>
            </div>
            <ul
              role="list"
              className="z-0 flex-1 divide-y divide-gray-200 overflow-y-auto dark:divide-white/10"
            >
              {groupedList[group].map((hotspot) => {
                const hotspotName = animalHash(hotspot.hotspot_id)
                const hasSmallCells = hotspot.cells.length > 0
                const Avatar = hasSmallCells ? HeliumMobileIcon : HeliumIotIcon
                const subtitle = hasSmallCells
                  ? `${hotspot.cells.length} small cell${
                      hotspot.cells.length === 1 ? "" : "s"
                    }`
                  : "IoT hotspot"
                return (
                  <li key={hotspot.hotspot_id}>
                    <div className="group relative flex items-center px-5 py-6">
                      <a
                        href={`https://app.hotspotty.net/devices/${hotspot.hotspot_id}/status`}
                        target="_blank"
                        className="-m-1 block flex-1 p-1"
                      >
                        <div
                          className="absolute inset-0 group-hover:bg-zinc-300/30 dark:group-hover:bg-zinc-700/30"
                          aria-hidden="true"
                        />
                        <div className="relative flex min-w-0 flex-1 items-center gap-4">
                          <Avatar className="inline-block h-10 w-10 flex-shrink-0" />
                          <div className="truncate">
                            <p className="truncate text-sm font-medium text-gray-900 dark:text-zinc-200">
                              {hotspotName}
                            </p>
                            <p className="truncate text-sm text-gray-500 dark:text-zinc-400">
                              {subtitle}
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
