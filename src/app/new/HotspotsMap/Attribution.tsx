import clsx from "clsx"
import Link from "next/link"
import { HotspottyIcon } from "../icons/HotspottyIcon"

export function Attribution({ className }: { className?: string }) {
  return (
    <Link
      className={clsx("group", "fixed bottom-0 end-0")}
      href="https://hotspotty.net"
      target="_blank"
      aria-label="Powered by Hotspotty"
    >
      <div className="mb-1 mr-1 flex flex-row items-center gap-2 rounded-xl px-2 py-1 ">
        <HotspottyIcon className="h-5 w-5 text-[#9546ea]" />
        <span className="whitespace-nowrap font-medium text-white group-hover:underline dark:text-zinc-200">
          Hotspotty
        </span>
      </div>
    </Link>
  )
}
