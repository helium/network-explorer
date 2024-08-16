"use client"

import { useOpenCard } from "@/app/new/hex/[hex]/hotspots/[address]/useOpenCard"
import clsx from "clsx"
import { PropsWithChildren } from "react"

type InfoCardProps = {
  reducedPadding?: boolean
  isLast?: boolean
  label?: string
}

export const InfoCard = ({
  children,
  reducedPadding,
  isLast = false,
  label,
}: PropsWithChildren<InfoCardProps>) => {
  const { openCard } = useOpenCard()
  const isActive = openCard === label
  const hide = !!openCard && label && !isActive

  return (
    <div className={clsx(hide && "hidden sm:block")}>
      <div
        className={clsx(
          "flex flex-col items-center justify-center rounded-xl font-sans sm:backdrop-blur",
          reducedPadding ? "p-1" : "gap-4 p-[20px]",
          isActive ? "sm:bg-[#131313]/75" : "sm:bg-[#131313]/50"
        )}
      >
        {children}
      </div>
      {!isLast && !openCard && (
        <div className="mx-5 border-b-2 border-[#6E6E6E]/50 sm:hidden" />
      )}
    </div>
  )
}

// to be used in tandem with reducedPadding
export const InfoCardBody = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={clsx("flex w-full flex-col gap-4 px-5 pb-5 pt-1", "sm:px-5")}
    >
      {children}
    </div>
  )
}
