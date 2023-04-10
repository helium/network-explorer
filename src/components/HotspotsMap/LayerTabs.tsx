import { Tab } from "@headlessui/react"
import clsx from "clsx"
import HeliumIotIcon from "../icons/HeliumIotIcon"
import HeliumMobileIcon from "../icons/HeliumMobileIcon"
import NetworkCoverageLayer from "./NetworkCoverageLayer"
import { HELIUM_IOT_COLOR, HELIUM_MOBILE_COLOR } from "./utils"

interface LayerConfig {
  sourcePath: string
  sourceLayer: string
}

export interface NetworkCoverageLayerOption {
  name: string
  icon: (props: any) => JSX.Element
  color: string
  sourceDomain: string
  points: LayerConfig
  hexes: LayerConfig
}

const layerOptions: NetworkCoverageLayerOption[] = [
  {
    name: "IOT",
    icon: HeliumIotIcon,
    color: HELIUM_IOT_COLOR,
    sourceDomain: process.env.NEXT_PUBLIC_HOTSPOTTY_TILESERVER_URL!,
    points: {
      sourcePath: "public.helium_iot_points.json",
      sourceLayer: "public.helium_iot_points",
    },
    hexes: {
      sourcePath: "public.helium_iot_hexes.json",
      sourceLayer: "public.helium_iot_hexes",
    },
  },
  {
    name: "MOBILE",
    icon: HeliumMobileIcon,
    color: HELIUM_MOBILE_COLOR,
    sourceDomain: process.env.NEXT_PUBLIC_HOTSPOTTY_TILESERVER_URL!,
    points: {
      sourcePath: "public.helium_mobile_points.json",
      sourceLayer: "public.helium_mobile_points",
    },
    hexes: {
      sourcePath: "public.helium_mobile_hexes.json",
      sourceLayer: "public.helium_mobile_hexes",
    },
  },
]

export default function LayerTabs() {
  return (
    <Tab.Group>
      <Tab.List className="flex gap-2 space-x-1 rounded-xl bg-white/30 p-1 text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/30 dark:ring-white/10">
        {layerOptions.map((option) => {
          const { name, icon: Icon } = option
          return (
            <Tab
              key={name}
              className={clsx(
                "font-semi-bold flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm leading-5 ring-opacity-60 ring-offset-1 transition focus:outline-none focus:ring-2 ui-selected:shadow",
                "ring-zinc-700 ring-offset-zinc-400/30 ui-selected:bg-zinc-400/30 ui-selected:text-gray-700 ui-not-selected:text-zinc-500 ui-not-selected:hover:bg-zinc-300 ui-not-selected:hover:text-zinc-700",
                "dark:ring-white dark:ring-offset-gray-400 ui-selected:dark:bg-zinc-500/30 ui-selected:dark:text-white ui-not-selected:dark:text-zinc-300 ui-not-selected:dark:hover:bg-zinc-700/50"
              )}
            >
              <Icon className="h-7 w-7" />
              {name}
            </Tab>
          )
        })}
      </Tab.List>
      <Tab.Panels>
        {layerOptions.map((option) => (
          <Tab.Panel key={option.name}>
            <NetworkCoverageLayer layer={option} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
