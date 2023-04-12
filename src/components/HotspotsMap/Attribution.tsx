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
      <div className="flex flex-row items-center gap-2 rounded-xl bg-white/30 px-4 py-3 text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/30 dark:ring-white/10">
        <HotspottyIcon className="h-6 w-6 text-[#9546ea]" />
        <span className="whitespace-nowrap font-medium text-zinc-800 group-hover:underline dark:text-zinc-200">
          Powered by Hotspotty
        </span>
      </div>
    </Link>
  )
}
