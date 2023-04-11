import Link from "next/link"

export function Attribution() {
  return (
    <div className="absolute bottom-1 right-2.5 z-10">
      <Link
        href="https://hotspotty.net"
        target="_blank"
        aria-label="Powered by Hotspotty"
      >
        <span className="text-xs text-zinc-800 dark:text-zinc-200">
          Powered by{" "}
        </span>
        <span className="text-base font-semibold text-zinc-800 dark:text-white">
          Hotspotty
        </span>
      </Link>
    </div>
  )
}
