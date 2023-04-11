import clsx from "clsx"
import Link from "next/link"
import { HotspottyIcon } from "../icons/HotspottyIcon"

export function Attribution({ className }: { className?: string }) {
  return (
    <Link
      className={clsx("group", className)}
      href="https://hotspotty.net"
      target="_blank"
      aria-label="Powered by Hotspotty"
    >
      <div className="flex gap-3 rounded-xl bg-white/30 p-4 text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/30 dark:ring-white/10">
        <HotspottyIcon className="h-10 w-10" />
        <div className="flex-1">
          <div className="text-xs font-light text-zinc-800 dark:text-zinc-200">
            Powered by{" "}
          </div>
          <div className="text-lg font-semibold text-zinc-800 group-hover:underline dark:text-white">
            Hotspotty
          </div>
        </div>
      </div>
    </Link>
  )
}
