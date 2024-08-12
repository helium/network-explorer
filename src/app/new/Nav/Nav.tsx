"use client"

import { Coverage } from "@/components/icons/Coverage"
import { EnergyIcon } from "@/components/icons/EnergyIcon"
import { HeliumIcon2 } from "@/components/icons/HeliumIcon2"
import { IotIcon } from "@/components/icons/IotIcon"
import { MobileIcon } from "@/components/icons/MobileIcon"
import { RssiPill } from "@/components/shared/RssiPill"
import clsx from "clsx"
import Link from "next/link"
import { useCallback, useState } from "react"
import styles from "./Nav.module.css"
import { Search } from "./Search"
import { Selector } from "./Selector"

const Logo = () => {
  return (
    <div className="rounded-xl bg-[#131313]/30 backdrop-blur sm:p-1">
      <Link
        href="/"
        aria-label="Home"
        className={clsx(
          "group pointer-events-auto flex items-center gap-2 rounded-lg transition hover:bg-[#8A8A8A]/20 sm:p-1"
        )}
      >
        <div className="flex items-center gap-2">
          <HeliumIcon2 className="h-7 w-7 fill-zinc-600 transition group-hover:fill-zinc-800 dark:fill-zinc-200 dark:group-hover:fill-zinc-100" />
        </div>
        <div className="hidden sm:block">
          <Coverage />
        </div>
      </Link>
    </div>
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

const MAP_SETTINGS = [
  { name: "Modeled Coverage", Icon: <RssiPill strength="coverage" /> },
  { name: "Hotspot Location", Icon: <RssiPill strength="low" /> },
]

const Divider = () => <div className={clsx("h-2/3 w-[1px] bg-[#FFFFFF]/20")} />
type Selectors = "" | "map_settings" | "networks"

export const Nav = () => {
  const [openSelector, setOpenSelector] = useState<Selectors>("")
  const toggleSelector = useCallback((selectorLabel: Selectors) => {
    return () =>
      setOpenSelector((currentOpenSelector) => {
        if (currentOpenSelector === selectorLabel) return ""
        else return selectorLabel
      })
  }, [])

  return (
    <nav className="fixed z-20 w-full p-3">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="hidden sm:block">
          <div className="flex gap-2">
            <div className="flex items-center rounded-xl bg-[#131313]/60 px-1 backdrop-blur">
              <Search />
            </div>
            <div
              className={`relative flex gap-1 rounded-xl bg-[#131313]/60 p-1 ${styles.blur} items-center `}
            >
              <Selector
                options={MAP_SETTINGS}
                width="w-48"
                isOpen={openSelector === "map_settings"}
                toggle={toggleSelector("map_settings")}
              />
              <Divider />
              <Link
                href="/stats"
                className={clsx("rounded-lg px-3 py-2 hover:bg-[#8A8A8A]/30")}
              >
                <span className="text-sm text-[#DBE0E6] opacity-75 hover:opacity-100">
                  Network Stats
                </span>
              </Link>
              <Divider />
              <Selector
                options={NETWORKS}
                width="w-28"
                isOpen={openSelector === "networks"}
                toggle={toggleSelector("networks")}
              />
            </div>
          </div>
        </div>
        <div className="flex sm:hidden">
          <div
            className={`relative flex gap-0.5 rounded-xl bg-[#131313]/60 p-1 ${styles.blur} items-center `}
          >
            <Search />
            <Divider />
            <Selector
              options={[
                ...MAP_SETTINGS,
                { name: "Network Stats", Icon: undefined },
              ]}
              width="w-40"
              isOpen={openSelector === "map_settings"}
              toggle={toggleSelector("map_settings")}
            />
            <Divider />
            <Selector
              options={NETWORKS}
              width="w-[86px]"
              isOpen={openSelector === "networks"}
              toggle={toggleSelector("networks")}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}
