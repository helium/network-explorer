"use client"

import { HexOutlineIcon } from "@/components/icons/HexOutlineIcon"
import { InfoCard } from "@/components/shared/InfoCard"
import { useInfoWrapper } from "@/components/shared/InfoWrapper"
import { XMarkIcon } from "@heroicons/react/24/outline"
import KuzcoLogo from "@public/kuzco-logo.png"
import Image from "next/image"
import Link from "next/link"
import { RssiCoverage } from "./RssiCoverage"
import { RssiHotspot, RssiHotspotList } from "./RssiHotspotList"
import { RssiOverview } from "./RssiOverview"

const HOTSPOTS: RssiHotspot[] = [
  {
    address: "112SFacmbDiWrDfXPoZVAd3od9BbbHMFxQhDWNyrgU4KKfGK6gtG",
    rssi: 91,
  },
  {
    address: "112VZR2pe4APgF3Gb78KjaJmUhaE8PPgp1cpB1q2hWq6Mt2GdMbb",
    rssi: 85,
  },
  {
    address: "11WhQN8PLb6FFkmgSir3Kosw2pVp1vrRtxgh6aF7UYbHYSPbzVB",
    rssi: 84,
  },
  {
    address: "112LGVmE97oPdyYbdCGadwDavT7BBH8EjNpEzST8VrXqHEK6btQt",
    rssi: 69,
  },
  {
    address: "115mA2TtBNSLgw5ap94Ku19gVTnNzRupcc144f5QJ7qjFAYNVFx",
    rssi: 52,
  },
  {
    address: "115mA2TtBNSLgw5ap94Ku19gVTnNzRupcc144f5QJ7qjFAYNVFx",
    rssi: 44,
  },
  {
    address: "112c1ffCAmNcd7PxSyg9N2e1dzvdRYw7SnH1uQUBcTp54BJAtaW5",
    rssi: 39,
  },
]

const getHotspotsInfo = (hotspots: RssiHotspot[]) => {
  const info = {
    max: 0,
    strong: 0,
    medium: 0,
    low: 0,
  }

  hotspots.forEach(({ rssi }) => {
    info.max = Math.max(info.max, rssi)
    if (rssi >= 90) info.strong++
    else if (rssi >= 70) info.medium++
    else info.low++
  })

  return info
}

const Divider = () => (
  <div className="hidden w-full border-t border-[#898C8F] opacity-50 sm:block" />
)

type Params = {
  hex: string
}

export const HexPage = ({ params }: { params: Params }) => {
  const hotspotsInfo = getHotspotsInfo(HOTSPOTS)
  const { isOpen } = useInfoWrapper()

  return (
    <InfoCard isFirst isLast>
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <HexOutlineIcon />
          <p className="text-xl font-medium leading-5 text-white">
            {params.hex}
          </p>
        </div>
        <Link href="/new" className="flex items-center">
          <XMarkIcon className="h-6 w-6 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
        </Link>
      </div>
      {!isOpen && (
        <div className="w-full sm:hidden">
          <RssiCoverage {...hotspotsInfo} />
        </div>
      )}
      <Divider />
      {!isOpen && (
        <div className="w-full sm:hidden">
          <RssiOverview max={hotspotsInfo.max} isSmall />
        </div>
      )}
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <p className="text-base font-medium leading-5">Area Info</p>
          <div className="flex items-center gap-0.5 opacity-50">
            <Image src={KuzcoLogo} alt="Kuzco Logo" />
            <p className="text-sm text-white ">Powered by Kuzco</p>
          </div>
        </div>
        <p className="pt-1 text-sm leading-5 text-white opacity-80">
          Arroyo Grande is a city in San Luis Obispo County, California, United
          States. Its population is 15,851 inhabitants according to the 2000
          census.
        </p>
      </div>
      <Divider />
      <RssiOverview max={hotspotsInfo.max} isSmall={false} />
      <Divider />
      <RssiCoverage {...hotspotsInfo} />
      <Divider />
      <RssiHotspotList hotspots={HOTSPOTS} hex={params.hex} />
    </InfoCard>
  )
}
