import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import Link from "next/link"
import { PropsWithChildren } from "react"

type StatsListProps = {
  title: string
}

export const MapCover = ({
  children,
  title,
}: PropsWithChildren<StatsListProps>) => {
  return (
    <div
      className={clsx(
        "absolute inset-0 bottom-0 top-28 z-10 flex w-auto flex-col gap-4 border-t p-6 text-sm font-medium backdrop-blur-sm",
        "border-zinc-900/5 bg-gray-100 text-zinc-800",
        "dark:border-white/10 dark:bg-slate-800 dark:text-zinc-200"
      )}
    >
      <div className="flex w-full items-center gap-3">
        <div className="flex-1 text-xl text-zinc-600 dark:text-zinc-100">
          <h1>{title}</h1>
        </div>
        <Link href="/">
          <XMarkIcon className="h-6 w-6 text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 hover:dark:text-zinc-100" />
        </Link>
      </div>
      {children}
    </div>
  )
}
