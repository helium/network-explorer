import { RssiPill } from "@/components/shared/RssiPill"
import clsx from "clsx"

export const ConnectionPower = () => {
  return (
    <div
      className={clsx(
        "absolute bottom-4 flex w-full justify-center",
        "sm:bottom-6 sm:right-6 sm:w-auto sm:justify-end"
      )}
    >
      <div className="flex gap-4 rounded-xl bg-[#131313]/60 px-3 py-3 font-sans backdrop-blur">
        <p className="text-sm text-white opacity-75">Signal Strength</p>
        <div className="flex items-center gap-2">
          <RssiPill strength="strong" />
          <p className="text-sm text-white opacity-75">High</p>
        </div>
        <div className="flex items-center gap-2">
          <RssiPill strength="medium" />
          <p className="text-sm text-white opacity-75">Medium</p>
        </div>
        <div className="flex items-center gap-2">
          <RssiPill strength="low" />
          <p className="text-sm text-white opacity-75">Low</p>
        </div>
      </div>
    </div>
  )
}
