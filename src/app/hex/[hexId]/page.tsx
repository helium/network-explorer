import { HexHotspots } from "@/components/HotspotsMap/HexHotspots"
import { LoadingHexHotspots } from "@/components/HotspotsMap/LoadingHexHotspots"
import { HexIcon } from "@/components/icons/HexIcon"
import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { isValidCell } from "h3-js"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default async function Page({ params }: { params: { hexId: string } }) {
  if (!isValidCell(params.hexId)) redirect("/")

  return (
    <div
      className={clsx(
        "absolute bottom-28 left-4 right-4 top-6 z-40 flex w-auto flex-col gap-4 rounded-xl px-4 py-2 text-sm font-medium shadow-lg shadow-zinc-800/5 ring-1 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-auto sm:top-24 sm:max-h-[calc(100vh-8rem)] sm:w-80",
        "bg-white/30 text-zinc-800 ring-zinc-900/5",
        "dark:bg-zinc-800/30 dark:text-zinc-200 dark:ring-white/10"
      )}
    >
      <div className="flex w-full items-center gap-3 p-2">
        <HexIcon
          width={21}
          height={24}
          className="fill-zinc-500 dark:fill-white"
        />
        <div className="flex-1 text-xl text-zinc-600 dark:text-zinc-100">
          {params.hexId}
        </div>
        <Link href="/">
          <XMarkIcon className="h-6 w-6 text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 hover:dark:text-zinc-100" />
        </Link>
      </div>
      <Suspense fallback={<LoadingHexHotspots count={3} />}>
        {/* @ts-expect-error Async Server Component */}
        <HexHotspots hexId={params.hexId} />
      </Suspense>
    </div>
  )
}
