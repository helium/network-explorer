import { HexOutlineIcon } from "@/components/icons/HexOutlineIcon"
import { InfoCard } from "@/components/shared/InfoCard"
import { InfoWrapper } from "@/components/shared/InfoWrapper"
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline"
import HotspotWaves from "@public/hotspot-waves.png"
import animalHash from "angry-purple-tiger"
import Image from "next/image"
import Link from "next/link"
import { ConnectedDevices } from "./ConnectedDevices"
import { ExplorerOptions } from "./ExplorerOptions"
import { Insights } from "./Insights"
import { TechnicalInfo } from "./TechnicalInfo"
import { OpenCardProvider } from "./useOpenCard"

export const metadata = {
  title: "Helium Hotspots Map - Hotspot Details",
}

type Params = {
  hex: string
  address: string
}

export default function Page({ params }: { params: Params }) {
  return (
    <InfoWrapper>
      <OpenCardProvider>
        <div className="flex flex-col gap-4">
          <InfoCard>
            <div className="flex w-full justify-between">
              <Link
                href={`/new/hex/${params.hex}`}
                className="group flex items-center gap-2"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-white opacity-80 transition group-hover:opacity-100 dark:stroke-white" />
                <p className="text-sm text-white underline opacity-80 transition group-hover:opacity-100">
                  Back to Hotspots list
                </p>
              </Link>
              <Link href="/new" className="flex items-center">
                <XMarkIcon className="h-5 w-5 stroke-white opacity-80 transition hover:opacity-100 dark:stroke-white" />
              </Link>
            </div>
            <div className="flex w-full items-center justify-start gap-2">
              <HexOutlineIcon />
              <p className="text-xl font-medium leading-5 text-white opacity-80">
                {params.hex}
              </p>
            </div>
            <div className="h-[1px] w-full bg-[#898C8F] opacity-50" />
            <div className="flex w-full items-center justify-start gap-2">
              <Image alt="Hotspot with emissions waves" src={HotspotWaves} />
              <p className="text-xl font-medium leading-5 text-white">
                {animalHash(params.address)}
              </p>
            </div>
          </InfoCard>
          <Insights />
          <ConnectedDevices />
          <TechnicalInfo />
          <ExplorerOptions address={params.address} />
        </div>
      </OpenCardProvider>
    </InfoWrapper>
  )
}
