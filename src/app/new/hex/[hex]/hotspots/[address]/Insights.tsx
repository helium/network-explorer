import { InfoCard } from "@/components/shared/InfoCard"
import Image from "next/image"
import Hotspot from "../../../../../../../public/hotspot.png"

export const Insights = () => {
  return (
    <InfoCard>
      <div className="flex w-full items-center justify-start gap-3">
        <Image alt="Hotspot icon" src={Hotspot} />
        <p className="text-base font-medium text-neutral-200">
          Hotspot Insights
        </p>
      </div>
    </InfoCard>
  )
}
