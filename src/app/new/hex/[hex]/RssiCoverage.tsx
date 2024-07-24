import styles from "./RssiCoverage.module.css"

type RssiCoverageProps = {
  strong: number
  medium: number
  low: number
}

export const RssiCoverage = ({ strong, medium, low }: RssiCoverageProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-sm font-medium leading-5 text-neutral-200">
        RSSI area coverage (dBm)
      </p>
      <div className="display flex">
        <div
          className={`h-3 w-10 min-w-[24px] rounded-full bg-[#FF4D00]`}
          style={{ flex: strong }}
        />
        <div
          className={`h-3 w-6 min-w-[24px] rounded-full ${styles.yellow}`}
          style={{ flex: medium }}
        />
        <div
          className={`h-3 w-6 min-w-[24px] rounded-full ${styles.teal}`}
          style={{ flex: low }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#FF4D00]" />
          <div className="flex flex-col items-end">
            <p className="text-sm leading-4 text-neutral-200">-90 dBm</p>
            <p className="text-xs leading-3 text-neutral-200">
              {strong} Hotspots
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#FFD600]" />
          <div className="flex flex-col items-end">
            <p className="text-sm leading-4 text-neutral-200">-70 dBm</p>
            <p className="text-xs leading-3 text-neutral-200">
              {medium} Hotspot
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[#00FFF0]" />
          <div className="flex flex-col items-end">
            <p className="text-sm leading-4 text-neutral-200">-50 dBm</p>
            <p className="text-xs leading-3 text-neutral-200">{low} Hotspot</p>
          </div>
        </div>
      </div>
    </div>
  )
}
