import { RssiPill } from "@/components/shared/RssiPill"
import clsx from "clsx"

type RssiOverviewProps = {
  max: number
  isSmall: boolean
}

export const RssiOverview = ({ max, isSmall }: RssiOverviewProps) => {
  return (
    <div className="flex w-full gap-2">
      {!isSmall && (
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-base font-medium  leading-5 text-white">
            Hotspots in this area
          </p>
          <p className="text-3xl leading-6 text-white">4</p>
        </div>
      )}
      {isSmall && (
        <div className={clsx("flex flex-1 gap-2", !isSmall && "flex-col")}>
          <p
            className={clsx(
              "font-medium text-white",
              isSmall ? "text-sm leading-4" : "text-base leading-5"
            )}
          >
            Max Expected Signal Strength
          </p>
          <div
            className={clsx(
              "flex items-center justify-between",
              isSmall && "gap-0.5"
            )}
          >
            <RssiPill strength={max} />
            <div
              className={clsx("flex items-end", isSmall ? "gap-0.5" : "gap-2")}
            >
              <p
                className={clsx(
                  " text-white",
                  isSmall ? "text-sm leading-4" : "text-3xl leading-6"
                )}
              >
                -{max}
              </p>
              <p
                className={clsx(
                  "text-sm text-white",
                  isSmall ? "leading-4" : "leading-3"
                )}
              >
                {isSmall ? " " : ""}dBm
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
