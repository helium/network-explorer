import { RssiPill } from "@/components/shared/RssiPill"
import animalHash from "angry-purple-tiger"
import clsx from "clsx"
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
    <div className="flex w-full flex-col justify-start gap-2">
      <p className="text-sm font-medium leading-5 text-neutral-200">Hotspots</p>
      {hotspots.map(({ address, rssi }, index) => {
        return (
          <Link
            href={`/new/hex/${hex}/hotspots/${address}`}
            key={address}
            className={clsx(
              "group flex gap-2",
              index !== 0 && "border-t border-neutral-400 pt-2"
            )}
          >
            <p className="text-sm leading-5 text-neutral-200 group-hover:text-neutral-100">
              {index + 1}
            </p>
            <div>
              <p className="text-sm leading-5 text-neutral-200 group-hover:text-neutral-100">
                {animalHash(address)}
              </p>
              <div className="flex items-center gap-2">
                <RssiPill strength={rssi} />
                <p className="text-sm leading-5 text-neutral-200 group-hover:text-neutral-100">
                  RSSI: -{rssi} dBm
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
