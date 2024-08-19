"use client"

import { InfoCard, InfoCardBody } from "@/components/shared/InfoCard"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import Hotspot from "@public/hotspot.png"
import clsx from "clsx"
import Image from "next/image"
import { useOpenCard } from "./useOpenCard"

const CARD_LABEL = "INSIGHTS"

export const Insights = () => {
  const { openCard, setOpenCard } = useOpenCard()
  const isActive = openCard === CARD_LABEL

  return (
    <InfoCard reducedPadding label={CARD_LABEL}>
      <button
        className={clsx(
          `group flex w-full items-center gap-2 rounded-lg px-4 hover:bg-[#8A8A8A]/20`,
          "py-2 sm:py-4"
        )}
        onClick={() => setOpenCard(CARD_LABEL)}
      >
        <Image alt="Hotspot icon" src={Hotspot} />
        <p className="text-sm font-medium leading-4 text-white group-hover:text-neutral-200 sm:text-base sm:leading-5">
          Hotspot Insights
        </p>
      </button>
      {isActive && (
        <InfoCardBody>
          <p className="text-sm leading-4 text-[#DBE0E6] opacity-80 sm:text-base sm:leading-5">
            Your device coverage is strong due to the area you are in.
          </p>
          <div className="flex items-center gap-2 rounded-lg border border-[#566C4C]/50 bg-[#4A892D]/25 p-2">
            <div className="w-6">
              <CheckCircleIcon className="h-6 w-6 stroke-[#4CED00]" />
            </div>
            <p className="text-sm leading-4 text-[#DBE0E6] opacity-80 sm:text-base sm:leading-5">
              This Hotspot has transferred data in the last 30 days.
            </p>
          </div>
          <div className="w-full">
            <p className="text-sm font-medium leading-4 text-white sm:text-base sm:leading-5">
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
