"use client"

import { HotspotProviders } from "@/app/new/Settings/HotspotProviders"
import { InfoCard } from "@/components/shared/InfoCard"
import { Overlay } from "@/components/shared/Overlay"
import { PreferencesProvider } from "@/context/usePreferences"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export const ExplorerOptions = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <InfoCard>
      <button
        className="flex w-full justify-start gap-3"
        onClick={() => setIsOpen(() => true)}
      >
        <div className="flex h-6 w-6 items-center justify-center">
          <ArrowTopRightOnSquareIcon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-base font-medium leading-5 text-neutral-200">
            Open in Third-Party Explorer
          </p>
          <p className="text-sm leading-5 text-neutral-400">
            You haven&apos;t set this up yet
          </p>
        </div>
      </button>
      <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
        <PreferencesProvider>
          <div className="flex w-[428px] flex-col gap-3 rounded-xl bg-[#131313]/60 px-8 py-6">
            <HotspotProviders />
          </div>
        </PreferencesProvider>
      </Overlay>
    </InfoCard>
  )
}
