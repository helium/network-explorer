import Image from "next/image"
import TechInfoIcon from "../../../../../../../public/tech-info.png"

export const TechInfo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-[#131313]/60 p-3">
      <div className="flex w-full items-center justify-start gap-3">
        <Image alt="Tech Info icon" src={TechInfoIcon} />
        <p className="text-base text-neutral-200">Technical Information</p>
      </div>
    </div>
  )
}
