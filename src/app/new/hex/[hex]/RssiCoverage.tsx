import { RssiPill, getRssiColor } from "@/components/shared/RssiPill"
import clsx from "clsx"
import styles from "./RssiCoverage.module.css"

type RssiCoverageProps = {
  strong: number
  medium: number
  low: number
}

export const RssiCoverage = ({ strong, medium, low }: RssiCoverageProps) => {
  const isMediumInset = !!strong
  const isLowInset = !!strong || !!medium

  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-sm font-medium leading-5 text-neutral-200">
        RSSI area coverage (dBm)
      </p>
      <div className="display flex">
        {!!strong && (
          <div
            className={clsx(
              `h-3 w-10 min-w-[24px] rounded-full`,
              getRssiColor("strong")
            )}
            style={{ flex: strong }}
          />
        )}
        {!!medium && (
          <div
            className={clsx(
              "h-3 w-6 min-w-[24px] rounded-full",
              isMediumInset ? styles.mediumInset : getRssiColor("medium")
            )}
            style={{ flex: medium }}
          />
        )}
        {!!low && (
          <div
            className={clsx(
              "h-3 w-6 min-w-[24px] rounded-full",
              isLowInset ? styles.lowInset : getRssiColor("low")
            )}
            style={{ flex: low }}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="mt-[3px]">
            <RssiPill strength="strong" isCircle />
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm leading-4 text-neutral-200">-90 dBm</p>
            <p className="text-xs leading-3 text-neutral-200">
              {strong} Hotspots
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="mt-[3px]">
            <RssiPill strength="medium" isCircle />
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm leading-4 text-neutral-200">-70 dBm</p>
            <p className="text-xs leading-3 text-neutral-200">
              {medium} Hotspot
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="mt-[3px]">
            <RssiPill strength="low" isCircle />
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm leading-4 text-neutral-200">-50 dBm</p>
            <p className="text-xs leading-3 text-neutral-200">{low} Hotspot</p>
          </div>
        </div>
      </div>
    </div>
  )
}
