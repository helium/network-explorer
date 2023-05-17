import { HeliumIcon } from "@/components/icons/HeliumIcon"
import { HeliumIotIcon } from "@/components/icons/HeliumIotIcon"
import { HeliumMobileIcon } from "@/components/icons/HeliumMobileIcon"
import clsx from "clsx"
import Link from "next/link"
import { PropsWithChildren } from "react"

export type Icon = "hnt" | "mobile" | "iot" | "undelegated"

const IconInfo = {
  hnt: { Icon: HeliumIcon, styles: "fill-[#474DFF]" },
  mobile: { Icon: HeliumMobileIcon, styles: "" },
  iot: { Icon: HeliumIotIcon, styles: "" },
  undelegated: { Icon: HeliumIotIcon, styles: "fill-[#474DFF]" },
}

type StatsListProps = {
  title: string
  link?: string
  linkText?: string
  icon: Icon
}

export const StatsList = ({
  children,
  title,
  link,
  linkText,
  icon,
}: PropsWithChildren<StatsListProps>) => {
  const { Icon, styles } = IconInfo[icon]

  return (
    <div className="flex flex-col pt-2">
      <div className="flex justify-between">
        <div className="mb-2 flex items-center gap-2">
          <Icon className={clsx("h-6 w-6", styles)} />
          <h2 className="flex-1 text-lg text-zinc-600 dark:text-zinc-100">
            {title}
          </h2>
        </div>
        {!!link && !!linkText && (
          <Link
            href={link}
            className="text-indigo-600 dark:text-violet-300"
            target="_"
          >
            {linkText}
          </Link>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <>{children}</>
      </div>
    </div>
  )
}
