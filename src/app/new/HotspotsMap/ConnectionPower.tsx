import { RssiPill } from "@/components/shared/RssiPill"

export const ConnectionPower = () => {
  return (
    <div className="absolute bottom-6 right-6 flex gap-4 rounded-xl bg-[#131313]/60 px-3 py-3 font-sans backdrop-blur">
      <p className="text-sm text-white opacity-75">Connection Power</p>
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
  )
}
