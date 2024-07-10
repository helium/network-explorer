"use client"

import { DownCarret } from "@/components/icons/DownCarret"
import { EnergyIcon } from "@/components/icons/EnergyIcon"
import { HeliumIcon2 } from "@/components/icons/HeliumIcon2"
import { IotIcon } from "@/components/icons/IotIcon"
import { MobileIcon } from "@/components/icons/MobileIcon"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"

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

const Selector = () => {
  const [selected, setSelected] = useState(NETWORKS[0])
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className="relative flex items-center gap-2">
      {
        <button
          className="flex gap-2"
          onClick={() => setShowOptions((current) => !current)}
        >
          {selected.Icon}
          <p className="text-sm text-neutral-200">{selected.name}</p>
        </button>
      }
      <DownCarret />
      <div
        className={clsx(
          "absolute -left-3 top-12 flex flex-col gap-2 rounded-xl bg-[#131313] px-3 py-3",
          showOptions ? "flex" : "hidden"
        )}
      >
        {NETWORKS.map((network) => (
          <button
            className="flex gap-2"
            key={network.name}
            onClick={() => setSelected(network)}
          >
            {network.Icon}
            <p className="text-sm text-neutral-200">{network.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export const Nav = () => {
  return (
    <nav className="fixed z-20 w-full p-6">
      <div className="flex justify-between">
        <Logo />
        <div className="rounded-xl bg-[#131313] px-3 py-3">
          <Selector />
        </div>
      </div>
    </nav>
  )
}
