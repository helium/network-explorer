import animalHash from "angry-purple-tiger"
import clsx from "clsx"
import Link from "next/link"

export const getRssiColor = (rssi: number) => {
  if (rssi >= 90) return "bg-[#FF4D00]"
  if (rssi >= 70) return "bg-[#FFD600]"
  return "bg-[#00FFF0]"
}

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
              "flex gap-2",
              index !== 0 && "border-t border-neutral-400 pt-2"
            )}
          >
            <p>{index + 1}</p>
            <div>
              <p className="text-sm leading-5 text-neutral-200">
                {animalHash(address)}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={clsx(
                    "h-2 w-4 rounded-lg bg-[#FF4D00]",
                    getRssiColor(rssi)
                  )}
                />
                <p className="text-sm leading-5 text-neutral-200">
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
