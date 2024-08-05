"use client"

import { SettingsTrigger } from "@/app/new/HotspotsMap/SettingsTrigger"
import {
  HotspotProviders,
  NO_PREFERENCE,
} from "@/app/new/Settings/HotspotProviders"
import { InfoCard } from "@/components/shared/InfoCard"
import { Overlay } from "@/components/shared/Overlay"
import { usePreferences } from "@/context/usePreferences"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState } from "react"

type ExplorerOptionsType = {
  address: string
}

export const ExplorerOptions = ({ address }: ExplorerOptionsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const { provider } = usePreferences()
  const hasNoPreference = provider?.label === NO_PREFERENCE.label

  return (
    <InfoCard>
      {hasNoPreference && (
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
      )}
      {!hasNoPreference && (
        <div className="flex w-full items-center justify-between">
          <Link
            href={provider!.getUrl(address)}
            target="_blank"
            className="flex items-center gap-2"
          >
            {provider?.Icon}
            <p className="text-base font-medium leading-5 text-white group-hover:text-neutral-200">
              Open with {provider?.label}
            </p>
          </Link>
          <SettingsTrigger />
        </div>
      )}
      <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex w-[428px] flex-col gap-3 rounded-xl bg-[#131313]/60 px-8 py-6">
          <HotspotProviders address={address} close={() => setIsOpen(false)} />
        </div>
      </Overlay>
    </InfoCard>
  )
}
