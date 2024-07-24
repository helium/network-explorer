import { HexOutlineIcon } from "@/components/icons/HexOutlineIcon"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { RssiCoverage } from "./RssiCoverage"

export const metadata = {
  title: "Helium Hotspots Map - Hotspot Details",
}

type Params = {
  hex: string
}

const Divider = () => <div className="w-full border-t border-neutral-400" />

export default function Page({ params }: { params: Params }) {
  return (
    <div className="absolute left-6 top-24 w-80">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-[#131313]/60 p-3">
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
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium leading-5 text-neutral-200">
              Hotspots covering this area
            </p>
            <p className="text-3xl leading-6 text-neutral-200">4</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium leading-5 text-neutral-200">
              Maximum Expected Signal Strength
            </p>
            <div className="flex items-center justify-between">
              <div className="h-2 w-4 rounded-lg bg-[#FF4D00]"></div>
              <div className="flex items-end gap-2">
                <p className="text-3xl leading-6 text-neutral-200">-92</p>
                <p className="text-sm leading-3 text-neutral-200">dBm</p>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <RssiCoverage strong={1} medium={0} low={2} />
      </div>
    </div>
  )
}
