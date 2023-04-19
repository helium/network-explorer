import { MapCover } from "@/components/MapCover"
import Link from "next/link"

export default function Page() {
  return (
    <MapCover title="Old Explorer">
      <div className="flex-column justify-between text-zinc-800 dark:text-slate-100 sm:items-center">
        <p className="text-sm">
          The old explorer is still accessible but displays data from the time
          of the chain halt. Due to this the data on the old explorer is now out
          of date. You can however still access this stale date here:
          <Link
            href="https://explorer-old.helium.com/"
            className="text-indigo-600 dark:text-violet-300"
            target="_"
          >
            &nbsp;Old Explorer
          </Link>
        </p>
      </div>
    </MapCover>
  )
}
