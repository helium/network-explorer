import { XMarkIcon } from "@heroicons/react/24/outline"
import { isValidCell } from "h3-js"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: { hexId: string } }) {
  if (!isValidCell(params.hexId)) redirect("/")

  return (
    <div className="absolute inset-y-6 left-6 z-50 flex w-80 flex-col gap-4 rounded-xl bg-white/30 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/30 dark:text-zinc-200 dark:ring-white/10">
      <div className="flex w-full items-center p-2">
        <div className="flex-1">{params.hexId}</div>
        <Link href="/">
          <XMarkIcon className="h-6 w-6 text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 hover:dark:text-zinc-100" />
        </Link>
      </div>
    </div>
  )
}
