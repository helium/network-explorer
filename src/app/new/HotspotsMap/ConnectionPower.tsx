export const ConnectionPower = () => {
  return (
    <div className="absolute bottom-6 right-6 flex gap-4 rounded-xl bg-[#131313]/60 px-3 py-3">
      <p className="text-sm text-neutral-200">Connection Power</p>
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-4 rounded-lg bg-[#FF4D00]" />
        <p className="text-sm text-neutral-200">High</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-4 rounded-lg bg-[#FFA800]" />
        <p className="text-sm text-neutral-200">Medium</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2.5 w-4 rounded-lg bg-[#01FFF0]" />
        <p className="text-sm text-neutral-200">Low</p>
      </div>
    </div>
  )
}
