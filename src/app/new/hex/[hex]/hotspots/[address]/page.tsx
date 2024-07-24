import { HexOutlineIcon } from "@/components/icons/HexOutlineIcon"
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline"
import animalHash from "angry-purple-tiger"
import Image from "next/image"
import Link from "next/link"
import HotspotWaves from "../../../../../../../public/hotspot-waves.png"
import { ConnectedDevices } from "./ConnectedDevices"
import { ExplorerOptions } from "./ExplorerOptions"
import { Insights } from "./Insights"
import { TechInfo } from "./TechInfo"

export const metadata = {
  title: "Helium Hotspots Map - Hotspot Details",
}

type Params = {
  hex: string
  address: string
}

const Divider = () => <div className="w-full border-t border-neutral-400" />

export default function Page({ params }: { params: Params }) {
  return (
    <div className="absolute left-6 top-24 flex w-80 flex-col gap-3">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-[#131313]/60 p-3">
        <div className="flex w-full justify-between">
          <Link
            href={`/new/hex/${params.hex}`}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
            <p className="text-sm  text-neutral-200 underline">
              Back to hotspots list
            </p>
          </Link>
          <Link href="/new" className="flex items-center">
            <XMarkIcon className="h-4 w-4 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
          </Link>
        </div>
        <div className="flex w-full items-center justify-start gap-3">
          <HexOutlineIcon />
          <p className="text-lg font-medium text-neutral-200">{params.hex}</p>
        </div>
        <Divider />
        <div className="flex w-full items-center justify-start gap-3">
          <Image alt="Hotspot with emissions waves" src={HotspotWaves} />
          <p className="text-lg font-medium text-neutral-200">
            {animalHash(params.address)}
          </p>
        </div>
      </div>
      <Insights />
      <ConnectedDevices />
      <TechInfo />
      <ExplorerOptions />
    </div>
  )
}
