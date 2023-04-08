import { Tab } from "@headlessui/react"
import HeliumIotIcon from "../icons/HeliumIotIcon"
import HeliumMobileIcon from "../icons/HeliumMobileIcon"
import NetworkCoverageLayer from "./NetworkCoverageLayer"

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

export const layerOptions: NetworkCoverageLayerOption[] = [
  {
    name: "IOT - Hotspotty",
    icon: HeliumIotIcon,
    color: "#27EE76",
    sourceDomain: process.env.NEXT_PUBLIC_TILESERVER_URL!,
    points: {
      sourcePath: "helium_iot_points",
      sourceLayer: "helium_iot",
    },
    hexes: {
      sourcePath: "helium_iot_hexes",
      sourceLayer: "helium_iot",
    },
  },
  {
    name: "MOBILE - Hotspotty",
    icon: HeliumMobileIcon,
    color: "#009FF9",
    sourceDomain: process.env.NEXT_PUBLIC_TILESERVER_URL!,
    points: {
      sourcePath: "helium_mobile_points",
      sourceLayer: "helium_mobile",
    },
    hexes: {
      sourcePath: "helium_mobile_hexes",
      sourceLayer: "helium_mobile",
    },
  },
  {
    name: "IOT - Nova Labs",
    icon: HeliumIotIcon,
    color: "#27EE76",
    sourceDomain: "https://hotspot-tileserver.helium.wtf",
    points: {
      sourcePath: "public.cell_points.json",
      sourceLayer: "public.points",
    },
    hexes: {
      sourcePath: "public.h3_res8.json",
      sourceLayer: "public.h3_res8",
    },
  },
  {
    name: "MOBILE - Nova Labs",
    icon: HeliumMobileIcon,
    color: "#009FF9",
    sourceDomain: "https://hotspot-tileserver.helium.wtf",
    points: {
      sourcePath: "public.cell_points.json",
      sourceLayer: "public.cell_points",
    },
    hexes: {
      sourcePath: "public.cell_h3_res8.json",
      sourceLayer: "public.cell_h3_res8",
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
              className="font-semi-bold flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-1.5 text-sm leading-5 ring-white ring-opacity-60 ring-offset-1 ring-offset-gray-400 focus:outline-none focus:ring-2 ui-selected:text-gray-700 ui-selected:shadow ui-not-selected:text-gray-300 ui-not-selected:transition ui-not-selected:hover:bg-white/[0.12] ui-not-selected:hover:text-white ui-selected:dark:bg-zinc-500/30 ui-selected:dark:text-white ui-not-selected:dark:hover:bg-zinc-700"
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
