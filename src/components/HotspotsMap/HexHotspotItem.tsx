"use client"

import { usePreferences } from "@/context/usePreferences"
import animalHash from "angry-purple-tiger"
import Link from "next/link"
import { gaEvent } from "../GATracker"
import { HeliumIotIcon } from "../icons/HeliumIotIcon"
import { HeliumMobileIcon } from "../icons/HeliumMobileIcon"
import { Hotspot } from "./HexHotspots"

type HexHotSpotItemProps = {
  hotspot: Hotspot
}

export const HexHotSpotItem = ({ hotspot }: HexHotSpotItemProps) => {
  const { provider } = usePreferences()

  const hotspotName = animalHash(hotspot.hotspot_id)
  const hasSmallCells = hotspot.cells.length > 0
  const Avatar = hasSmallCells ? HeliumMobileIcon : HeliumIotIcon
  const subtitle = hasSmallCells
    ? `${hotspot.cells.length} small cell${
        hotspot.cells.length === 1 ? "" : "s"
      }`
    : "IoT Hotspot"

  return (
    <li key={hotspot.hotspot_id}>
      <div className="group relative flex items-center px-2 py-3">
        <Link
          href={
            !provider
              ? `/preferences?redirect=${hotspot.hotspot_id}`
              : `https://app.hotspotty.net/hotspots/${hotspot.hotspot_id}/rewards`
          }
          className="-m-1 block flex-1 p-1"
          target={!!provider ? "_" : "_self"}
          onClick={() => {
            if (!!provider) {
              gaEvent({
                action: "outbound_click",
                event: {
                  description: provider,
                },
              })
            }
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
        </Link>
      </div>
    </li>
  )
}
