import HexHotspots from "@/components/HotspotsMap/HexHotspots"
import LoadingHexHotspots from "@/components/HotspotsMap/LoadingHexHotspots"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { isValidCell } from "h3-js"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default async function Page({ params }: { params: { hexId: string } }) {
  if (!isValidCell(params.hexId)) redirect("/")

  return (
    <div className="absolute bottom-6 left-4 right-4 top-24 z-50 flex w-auto flex-col gap-4 rounded-xl bg-white/30 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/30 dark:text-zinc-200 dark:ring-white/10 sm:bottom-auto sm:left-6 sm:right-auto sm:top-6 sm:max-h-[calc(100vh-3rem)] sm:w-80">
      <div className="flex w-full items-center p-2">
        <div className="flex-1">Hex: {params.hexId}</div>
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
