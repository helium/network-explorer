"use client"

import { InfoCard } from "@/components/shared/InfoCard"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useState } from "react"
import Hotspot from "@public/hotspot.png"

const Divider = () => <div className="w-full border-t border-neutral-400" />

export const Insights = () => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <InfoCard>
      <button
        className="button flex w-full items-center gap-3"
        onClick={() => setShowDetails((currentVal) => !currentVal)}
      >
        <Image alt="Hotspot icon" src={Hotspot} />
        <p className="text-base font-medium text-neutral-200">
          Hotspot Insights
        </p>
      </button>
      {showDetails && (
        <>
          <p className="text-sm leading-5 text-neutral-200">
            Your device coverage is strong due to the area you are in.
          </p>
          <Divider />
          <div className="flex gap-2">
            <div className="w-6">
              <CheckCircleIcon className="h-6 w-6 stroke-[#4CED00]" />
            </div>
            <p className="text-sm leading-5 text-neutral-200">
              This hotspot has transferred data in the last 30 days.
            </p>
          </div>
          <Divider />
          <div className="w-full">
            <p className="text-sm font-medium leading-5 text-neutral-200">
              Area covered
            </p>
            <div className="mt-2 flex items-end">
              <p className="text-3xl leading-8 text-neutral-200">0.497</p>
              <p className="text-sm leading-5 text-neutral-200">mi²</p>
            </div>
          </div>
        </>
      )}
    </InfoCard>
  )
}
