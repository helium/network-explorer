"use client"

import { HexOutlineIcon } from "@/components/icons/HexOutlineIcon"
import { InfoCard } from "@/components/shared/InfoCard"
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline"
import HotspotWaves from "@public/hotspot-waves.png"
import animalHash from "angry-purple-tiger"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useOpenCard } from "./useOpenCard"

export const metadata = {
  title: "Helium Hotspots Map - Hotspot Details",
}

type DetailsHeaderProps = {
  hex: string
  address: string
}

export const DetailsHeaderProps = ({ hex, address }: DetailsHeaderProps) => {
  const { openCard, setOpenCard } = useOpenCard()
  const router = useRouter()
  const isActiveCard = !!openCard

  return (
    <InfoCard>
      <div className="flex w-full justify-between">
        <button
          aria-label={
            openCard ? "Back to Hotspot details" : "Back to hospots list"
          }
          className="group flex items-center gap-2"
          onClick={
            openCard
              ? () => setOpenCard("")
              : () => router.push(`/new/hex/${hex}`)
          }
        >
          <ArrowLeftIcon className="h-4 w-4 stroke-white opacity-80 transition group-hover:opacity-100 dark:stroke-white" />
          <p className="text-sm text-white underline opacity-80 transition group-hover:opacity-100">
            Back to {openCard ? "Hotspot details" : "Hotspots list"}
          </p>
        </button>
        <Link href="/new" className="flex items-center">
          <XMarkIcon className="h-5 w-5 stroke-white opacity-80 transition hover:opacity-100 dark:stroke-white" />
        </Link>
      </div>

      <div
        className={clsx(
          "flex w-full items-center justify-start gap-2",
          isActiveCard && "hidden sm:flex"
        )}
      >
        <HexOutlineIcon />
        <p className="text-xl font-medium leading-5 text-white opacity-80">
          {hex}
        </p>
      </div>
      <div
        className={clsx(
          "h-[1px] w-full bg-[#898C8F] opacity-50",
          "hidden sm:block"
        )}
      />
      <div
        className={clsx(
          "flex w-full items-center justify-start gap-2",
          "mt-1 sm:mt-0",
          isActiveCard && "hidden sm:flex"
        )}
      >
        <Image alt="Hotspot with emissions waves" src={HotspotWaves} />
        <p className="text-xl font-medium leading-5 text-white">
          {animalHash(address)}
        </p>
      </div>
    </InfoCard>
  )
}
