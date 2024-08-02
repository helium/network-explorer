"use client"

import { EnergyIcon } from "@/components/icons/EnergyIcon"
import { HeliumIcon2 } from "@/components/icons/HeliumIcon2"
import { IotIcon } from "@/components/icons/IotIcon"
import { MobileIcon } from "@/components/icons/MobileIcon"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import Link from "next/link"
import { ReactElement, useState } from "react"
import styles from "./Nav.module.css"
import { Search } from "./Search"

const Logo = () => {
  return (
    <Link href="/" aria-label="Home" className={clsx("pointer-events-auto")}>
      <div className="group flex items-center gap-2">
        <HeliumIcon2 className="h-7 w-7 fill-zinc-600 transition group-hover:fill-zinc-800 dark:fill-zinc-200 dark:group-hover:fill-zinc-100" />
      </div>
    </Link>
  )
}

const NETWORKS = [
  {
    Icon: <IotIcon fill="#282828" className="h-6 w-6" />,
    name: "IOT",
  },
  {
    Icon: <MobileIcon className="h-6 w-6" />,
    name: "MOBILE",
  },
  {
    Icon: (
      <div className={"rounded-full bg-[#282828]"}>
        <EnergyIcon className="h-6 w-6" />
      </div>
    ),
    name: "ENERGY",
  },
]

type Option = {
  Icon?: ReactElement
  name: string
}

const Selector = ({
  options,
  width,
}: {
  options: Option[]
  width?: string
}) => {
  const [selected, setSelected] = useState(options[0])
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className={clsx("relative flex justify-between gap-2", width)}>
      <button
        className="group flex w-full items-center justify-between gap-2"
        onClick={() => setShowOptions((current) => !current)}
      >
        <div className="flex gap-2">
          {selected.Icon}
          <p className="text-sm text-neutral-200 group-hover:text-neutral-100">
            {selected.name}
          </p>
        </div>
        <ChevronDownIcon className="h-3 w-3 stroke-neutral-200 group-hover:stroke-neutral-100" />
      </button>
      <div
        className={clsx(
          "absolute -left-3 top-12 flex flex-col gap-2 rounded-xl bg-[#131313]/60 p-3",
          showOptions ? "flex" : "hidden",
          styles.blur
        )}
      >
        {options.map((network) => (
          <button
            className="justify-left group flex gap-2"
            key={network.name}
            onClick={() => {
              setSelected(network)
              setShowOptions(false)
            }}
          >
            {network.Icon}
            <p className="text-sm text-neutral-200 group-hover:text-neutral-100">
              {network.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

const Divider = () => <div className="border-l border-neutral-700" />

export const Nav = () => {
  return (
    <nav className="fixed z-20 w-full p-6">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center rounded-xl bg-[#131313]/60 px-3 backdrop-blur">
            <Search />
          </div>
          <div
            className={`relative flex gap-4 rounded-xl bg-[#131313]/60 p-3 ${styles.blur}`}
          >
            <Selector
              options={[
                { name: "Modeled Coverage" },
                { name: "Hotspot Location" },
              ]}
              width="w-36"
            />
            <Divider />
            <Link href="/stats">
              <span className="text-sm text-neutral-200 hover:text-neutral-100">
                Network Stats
              </span>
            </Link>
            <Divider />
            <Selector options={NETWORKS} width="w-28" />
          </div>
        </div>
      </div>
    </nav>
  )
}
