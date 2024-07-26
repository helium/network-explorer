import { InfoCard } from "@/components/shared/InfoCard"
import Image from "next/image"
import TechInfoIcon from "../../../../../../../public/tech-info.png"

export const TechInfo = () => {
  return (
    <InfoCard>
      <div className="flex w-full items-center justify-start gap-3">
        <Image alt="Tech Info icon" src={TechInfoIcon} />
        <p className="text-base font-medium text-neutral-200">
          Technical Information
        </p>
      </div>
    </InfoCard>
  )
}
