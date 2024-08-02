import { HexOutlineIcon } from "@/components/icons/HexOutlineIcon"
import { InfoCard } from "@/components/shared/InfoCard"
import { InfoWrapper } from "@/components/shared/InfoWrapper"
import { RssiPill } from "@/components/shared/RssiPill"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { RssiCoverage } from "./RssiCoverage"
import { RssiHotspot, RssiHotspotList } from "./RssiHotspotList"

export const metadata = {
  title: "Helium Hotspots Map - Hotspot Details",
}

type Params = {
  hex: string
}

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

const Divider = () => <div className="w-full border-t border-neutral-400" />

export default function Page({ params }: { params: Params }) {
  const hotspotsInfo = getHotspotsInfo(HOTSPOTS)

  return (
    <InfoWrapper>
      <InfoCard>
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <HexOutlineIcon stroke="#fff" />
            <p className="text-lg text-neutral-200">{params.hex}</p>
          </div>
          <Link href="/new" className="flex items-center">
            <XMarkIcon className="h-4 w-4 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
          </Link>
        </div>
        <Divider />
        <div className="w-full">
          <div className="flex w-full justify-between">
            <p className="text-sm font-medium text-neutral-200">Area Info</p>
            <p className="text-sm text-neutral-400">Powered by Kuzco</p>
          </div>
          <p className="text-sm leading-5 text-neutral-200">
            Arroyo Grande is a city in San Luis Obispo County, California,
            United States. Its population is 15,851 inhabitants according to the
            2000 census.
          </p>
        </div>
        <Divider />
        <div className="flex w-full gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-sm font-medium leading-5 text-neutral-200">
              Hotspots covering this area
            </p>
            <p className="text-3xl leading-6 text-neutral-200">4</p>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <p className="text-sm font-medium leading-5 text-neutral-200">
              Max Expected Signal Strength
            </p>
            <div className="flex items-center justify-between">
              <RssiPill strength={hotspotsInfo.max} />
              <div className="flex items-end gap-2">
                <p className="text-3xl leading-6 text-neutral-200">
                  -{hotspotsInfo.max}
                </p>
                <p className="text-sm leading-3 text-neutral-200">dBm</p>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <RssiCoverage {...hotspotsInfo} />
        <Divider />
        <RssiHotspotList hotspots={HOTSPOTS} hex={params.hex} />
      </InfoCard>
    </InfoWrapper>
  )
}
