import animalHash from "angry-purple-tiger"
import clsx from "clsx"
import Image from "next/image"

interface SmallCell {
  cell_id: string
  "24h_rewards_mobile": number
}

interface Hotspot {
  hotspot_id: string
  "24h_rewards_iot": number
  avatarUrl: string
  cells: SmallCell[]
}

interface HexData {
  hex: string
  resolution: number
  hotspots: Hotspot[]
}

export default async function HexHotspots({ hexId }: { hexId: string }) {
  const hexData = (await fetch(
    `${process.env.HOTSPOTTY_EXPLORER_API_URL}/hex/${hexId}`,
    {
      headers: {
        Authorization: `bearer ${process.env.HOTSPOTTY_EXPLORER_API_TOKEN}`,
      },
    }
  ).then((res) => res.json())) as HexData

  const hotspots = hexData.hotspots

  hotspots.sort(
    (hotspot1, hotspot2) =>
      hotspot2["24h_rewards_iot"] - hotspot1["24h_rewards_iot"]
  )

  return (
    <ul
      role="list"
      className="flex-1 divide-y divide-gray-200 overflow-y-auto dark:divide-white/10"
    >
      {hotspots.map((hotspot) => {
        const hotspotName = animalHash(hotspot.hotspot_id)
        let subtitle = "IoT hotspot"
        if (hotspot.cells.length === 1) subtitle = "One small cell attached"
        if (hotspot.cells.length > 1) {
          subtitle = `${hotspot.cells.length} small cells attached`
        }
        return (
          <li key={hotspot.hotspot_id}>
            <div className="group relative flex items-center px-5 py-6">
              <a
                href={`https://app.hotspotty.net/devices/${hotspot.hotspot_id}/status`}
                target="_blank"
                className="-m-1 block flex-1 p-1"
              >
                <div
                  className="absolute inset-0 group-hover:bg-gray-50 dark:group-hover:bg-zinc-700/30"
                  aria-hidden="true"
                />
                <div className="relative flex min-w-0 flex-1 items-center gap-4">
                  <span className="relative inline-block flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      width={40}
                      height={40}
                      src={hotspot.avatarUrl || "/logo192.png"}
                      alt={hotspotName}
                    />
                    <span
                      className={clsx(
                        hotspot["24h_rewards_iot"] > 0
                          ? "bg-green-400"
                          : "bg-red-300",
                        "absolute right-0 top-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white"
                      )}
                      aria-hidden="true"
                    />
                  </span>
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
  )
}
