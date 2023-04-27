"use client"

import clsx from "clsx"
import Link from "next/link"
import { PropsWithChildren } from "react"

type StatsListProps = {
  title: string
  link: string
  linkText: string
  Icon: (props: any) => JSX.Element
  iconStyles?: string
}

export const StatsList = ({
  children,
  title,
  link,
  linkText,
  Icon,
  iconStyles,
}: PropsWithChildren<StatsListProps>) => {
  return (
    <div className="flex flex-col py-2 ">
      <div className="flex justify-between">
        <div className="mb-2 flex items-center gap-2">
          <Icon className={clsx("h-6 w-6", iconStyles)} />
          <h2 className="flex-1 text-lg text-zinc-600 dark:text-zinc-100">
            {title}
          </h2>
        </div>
        <Link
          href={link}
          className="text-indigo-600 dark:text-violet-300"
          target="_"
        >
          {linkText}
        </Link>
      </div>
      <div className="flex flex-wrap gap-3">
        <>{children}</>
      </div>
    </div>
  )
}
