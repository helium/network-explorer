"use client"

import animalHash from "angry-purple-tiger"
import { gaEvent } from "../GATracker"
import { HeliumIotIcon } from "../icons/HeliumIotIcon"
import { HeliumMobileIcon } from "../icons/HeliumMobileIcon"
import { Hotspot } from "./HexHotspots"

type HexHotSpotItemProps = {
  hotspot: Hotspot
}

export const HexHotSpotItem = ({ hotspot }: HexHotSpotItemProps) => {
  const hotspotName = animalHash(hotspot.hotspot_id)
  const hasSmallCells = hotspot.cells.length > 0
  const Avatar = hasSmallCells ? HeliumMobileIcon : HeliumIotIcon
  const subtitle = hasSmallCells
    ? `${hotspot.cells.length} small cell${
        hotspot.cells.length === 1 ? "" : "s"
      }`
    : "IoT Hotspot"

  return (
    <li>
      <div className="group relative flex items-center px-2 py-3">
        <a
          href={`https://app.hotspotty.net/hotspots/${hotspot.hotspot_id}/rewards`}
          target="_blank"
          className="-m-1 block flex-1 p-1"
          onClick={() => {
            gaEvent({
              action: "outbound_click",
              event: {
                description: "hotspotty",
              },
            })
          }}
        >
          <div
            className="absolute inset-0 group-hover:bg-zinc-300/30 dark:group-hover:bg-zinc-700/30"
            aria-hidden="true"
          />
          <div className="relative flex min-w-0 flex-1 items-center gap-4">
            <Avatar className="inline-block h-8 w-8 flex-shrink-0" />
            <div className="truncate">
              <p className="truncate text-sm font-medium leading-5 text-gray-900 dark:text-zinc-100">
                {hotspotName}
              </p>
              <p className="truncate text-xs text-gray-600 dark:text-zinc-300">
                {subtitle}
              </p>
            </div>
          </div>
        </a>
      </div>
    </li>
  )
}
