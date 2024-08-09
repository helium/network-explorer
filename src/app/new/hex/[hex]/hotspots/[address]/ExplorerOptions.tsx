"use client"

import {
  HotspotProviders,
  NO_PREFERENCE,
} from "@/app/new/Settings/HotspotProviders"
import { InfoCard } from "@/components/shared/InfoCard"
import { Overlay } from "@/components/shared/Overlay"
import { usePreferences } from "@/context/usePreferences"
import {
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import ConnectedDots from "@public/connected-dots.png"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import styles from "./page.module.css"

type ExplorerOptionsType = {
  address: string
}

export const ExplorerOptions = ({ address }: ExplorerOptionsType) => {
  const [isOpen, setIsOpen] = useState(false)
  const { provider } = usePreferences()
  const hasNoPreference = provider?.label === NO_PREFERENCE.label

  return (
    <InfoCard reducedPadding>
      {hasNoPreference && (
        <button
          className={`group flex w-full justify-start gap-2 ${styles.button} rounded-lg p-4 hover:bg-[#8A8A8A]/20`}
          onClick={() => setIsOpen(() => true)}
        >
          <div className="flex h-6 w-6 items-center justify-center">
            <ArrowTopRightOnSquareIcon className="h-[18px] w-[18px]" />
          </div>
          <div className="flex flex-col items-start">
            <p className="text-base font-medium leading-6 text-white">
              Open in Third-Party Explorer
            </p>
            <p className="text-sm leading-4 text-[#DBE0E6] opacity-75 ">
              You haven&apos;t set this up yet
            </p>
          </div>
        </button>
      )}
      {!hasNoPreference && (
        <div className="flex w-full items-center justify-between gap-2">
          <Link
            href={provider!.getUrl(address)}
            target="_blank"
            className={`group flex w-full items-center justify-start gap-2 ${styles.button} rounded-lg p-4 hover:bg-[#8A8A8A]/20`}
          >
            {provider?.Icon}
            <p className="text-base font-medium leading-5 text-white group-hover:text-neutral-200">
              Open with {provider?.label}
            </p>
          </Link>
          <button
            className="group mr-2 rounded-lg p-1 transition hover:bg-[#8A8A8A]/20"
            onClick={() => setIsOpen(() => true)}
          >
            <Cog6ToothIcon className="h-6 w-6 stroke-white transition" />
          </button>
        </div>
      )}
      <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex w-[428px] flex-col gap-3 rounded-xl bg-[#131313]/50 px-8 py-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <Image src={ConnectedDots} alt="Connected Dots" />
              <button aria-label="Close" onClick={() => setIsOpen(false)}>
                <XMarkIcon className="h-8 w-8 stroke-white opacity-80 transition hover:opacity-100" />
              </button>
            </div>
            <HotspotProviders
              address={hasNoPreference ? address : ""}
              close={() => setIsOpen(false)}
            />
          </div>
        </div>
      </Overlay>
    </InfoCard>
  )
}
