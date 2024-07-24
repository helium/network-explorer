import Image from "next/image"
import Hotspot from "../../../../../../../public/hotspot.png"

export const Insights = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-[#131313]/60 p-3">
      <div className="flex w-full items-center justify-start gap-3">
        <Image alt="Hotspot icon" src={Hotspot} />
        <p className="text-base font-medium text-neutral-200">
          Hotspot Insights
        </p>
      </div>
    </div>
  )
}
