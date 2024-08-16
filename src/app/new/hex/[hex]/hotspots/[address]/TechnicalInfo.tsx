"use client"

import { InfoCard, InfoCardBody } from "@/components/shared/InfoCard"
import LatitudeIcon from "@public/latitude.png"
import LongitudeIcon from "@public/longitude.png"
import TechInfoIcon from "@public/tech-info.png"
import clsx from "clsx"
import Image from "next/image"
import { PropsWithChildren } from "react"
import { useOpenCard } from "./useOpenCard"

const Header = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-neutral-white mb-1 text-base font-medium leading-5 opacity-60">
      {children}
    </p>
  )
}

const Body = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-base font-medium leading-5 text-[#DBE0E6]">{children}</p>
  )
}

const CARD_LABEL = "TECHNICAL_INFO"

export const TechnicalInfo = () => {
  const { openCard, setOpenCard } = useOpenCard()
  const isActive = openCard === CARD_LABEL

  return (
    <InfoCard active={isActive} reducedPadding>
      <button
        className={clsx(
          `group flex w-full items-center justify-start gap-2 rounded-lg px-4 hover:bg-[#8A8A8A]/20`,
          "py-2 sm:py-4"
        )}
        onClick={() => setOpenCard(CARD_LABEL)}
      >
        <Image alt="Technical Information icon" src={TechInfoIcon} />
        <p className="text-base font-medium leading-5 text-white group-hover:text-neutral-200">
          Technical Information
        </p>
      </button>
      {isActive && (
        <InfoCardBody>
          <div className="w-full">
            <Header>Online Time</Header>
            <Body>3y 45m 27d 17:34:56</Body>
          </div>
          <div className="w-full">
            <Header>Hotspot manufacturer</Header>
            <Body>Cisco Systems</Body>
          </div>
          <div className="w-full">
            <Header>Antenna gain</Header>
            <Body>250.7 mb</Body>
          </div>
          <div className="w-full">
            <Header>Antenna elevation</Header>
            <Body>+15 ft</Body>
          </div>
          <div className="flex w-full gap-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <div>
                  <Image src={LatitudeIcon} alt="Latitude Icon" />
                </div>
                <Header>Latitude</Header>
              </div>
              <Body>37.78584</Body>
            </div>
            <div className="flex-1">
              <div className="flex gap-2">
                <div>
                  <Image src={LongitudeIcon} alt="Longitude Icon" />
                </div>
                <Header>Longitude</Header>
              </div>
              <Body>-122.43643</Body>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="flex-1">
              <Header>City</Header>
              <Body>Arroyo Grande</Body>
            </div>
            <div className="flex-1">
              <Header>State</Header>
              <Body>California</Body>
            </div>
          </div>
          <div className="w-full">
            <Header>Country</Header>
            <Body>United States</Body>
          </div>
        </InfoCardBody>
      )}
    </InfoCard>
  )
}
