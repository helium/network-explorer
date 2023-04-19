import { MapCover } from "@/components/MapCover"
import Link from "next/link"

export default function Page() {
  return (
    <MapCover title="Explorer Update">
      <div className="flex-column justify-between text-zinc-800 dark:text-slate-100 sm:items-center">
        <p className="text-sm">
          The existing Explorer continues to serve metrics from the halted
          Helium blockchain.
        </p>
        <p className="text-sm">
          Visit the
          <Link
            href="https://explorer-old.helium.com/"
            className="text-indigo-600 dark:text-violet-300"
            target="_"
          >
            &nbsp;Old Explorer&nbsp;
          </Link>
          for legacy data.
        </p>
      </div>
    </MapCover>
  )
}
