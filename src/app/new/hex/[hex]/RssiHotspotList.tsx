import { RssiPill } from "@/components/shared/RssiPill"
import animalHash from "angry-purple-tiger"
import Link from "next/link"

export type RssiHotspot = {
  address: string
  rssi: number
}

type RssiHotspotListProps = {
  hotspots: RssiHotspot[]
  hex: string
}

export const RssiHotspotList = ({ hotspots, hex }: RssiHotspotListProps) => {
  return (
    <div className="relative w-full">
      <p className="text-base font-medium leading-5 text-white">Hotspots</p>
      <div className="relative -left-4 mt-2 flex w-[297px] flex-col gap-0.5">
        {hotspots.map(({ address, rssi }) => {
          return (
            <Link
              href={`/new/hex/${hex}/hotspots/${address}`}
              key={address}
              className="group flex gap-2 rounded-lg px-4 py-2 hover:bg-[#8A8A8A]/20"
            >
              <div>
                <p className="text-sm leading-5 text-white group-hover:text-neutral-100">
                  {animalHash(address)}
                </p>
                <div className="flex items-center gap-2">
                  <RssiPill strength={rssi} />
                  <p className="text-sm leading-5 text-white opacity-80 group-hover:text-neutral-100">
                    RSSI: -{rssi} dBm
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
