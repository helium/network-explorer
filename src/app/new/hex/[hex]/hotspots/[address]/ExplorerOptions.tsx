"use client"

import { HotspotProviders } from "@/app/new/Settings/HotspotProviders"
import { InfoCard } from "@/components/shared/InfoCard"
import { Overlay } from "@/components/shared/Overlay"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

type ExplorerOptionsType = {
  address: string
}

export const ExplorerOptions = ({ address }: ExplorerOptionsType) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <InfoCard>
      <button
        className="group flex w-full justify-start gap-3"
        onClick={() => setIsOpen(() => true)}
      >
        <div className="flex h-6 w-6 items-center justify-center">
          <ArrowTopRightOnSquareIcon className="h-5 w-5" />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-base font-medium leading-5 text-white group-hover:text-neutral-200">
            Open in Third-Party Explorer
          </p>
          <p className="text-sm leading-5 text-[#DBE0E6] opacity-75 group-hover:opacity-100">
            You haven&apos;t set this up yet
          </p>
        </div>
      </button>
      <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex w-[428px] flex-col gap-3 rounded-xl bg-[#131313]/60 px-8 py-6">
          <HotspotProviders address={address} close={() => setIsOpen(false)} />
        </div>
      </Overlay>
    </InfoCard>
  )
}
