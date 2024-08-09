"use client"

import { InfoCard, InfoCardBody } from "@/components/shared/InfoCard"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import Hotspot from "@public/hotspot.png"
import Image from "next/image"
import { useState } from "react"

export const Insights = () => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <InfoCard reducedPadding active={showDetails}>
      <button
        className={`group flex w-full items-center gap-2 rounded-lg p-4 hover:bg-[#8A8A8A]/20`}
        onClick={() => setShowDetails((currentVal) => !currentVal)}
      >
        <Image alt="Hotspot icon" src={Hotspot} />
        <p className="text-base font-medium leading-5 text-white group-hover:text-neutral-200">
          Hotspot Insights
        </p>
      </button>
      {showDetails && (
        <InfoCardBody>
          <p className="text-base leading-5 text-[#DBE0E6] opacity-80">
            Your device coverage is strong due to the area you are in.
          </p>
          <div className="flex items-center gap-2 rounded-lg border border-[#566C4C]/50 bg-[#4A892D]/25 p-2">
            <div className="w-6">
              <CheckCircleIcon className="h-6 w-6 stroke-[#4CED00]" />
            </div>
            <p className="text-base leading-5 text-[#DBE0E6] opacity-80">
              This Hotspot has transferred data in the last 30 days.
            </p>
          </div>
          <div className="w-full">
            <p className="text-base font-medium leading-5 text-white">
              Area covered
            </p>
            <div className="mt-2 flex items-end">
              <p className="text-3xl leading-8 text-white">0.497</p>
              <p className="text-sm leading-5 text-white">mi²</p>
            </div>
          </div>
        </InfoCardBody>
      )}
    </InfoCard>
  )
}
