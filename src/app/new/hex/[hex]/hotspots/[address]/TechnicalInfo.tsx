"use client"

import { InfoCard } from "@/components/shared/InfoCard"
import LatitudeIcon from "@public/latitude.png"
import LongitudeIcon from "@public/longitude.png"
import TechInfoIcon from "@public/tech-info.png"
import Image from "next/image"
import { PropsWithChildren, useState } from "react"
import styles from "./page.module.css"

const Header = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-neutral-white mb-0.5 text-sm font-medium leading-5 opacity-80">
      {children}
    </p>
  )
}

const Body = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-neutral-white text-base font-medium leading-5">
      {children}
    </p>
  )
}

export const TechnicalInfo = () => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <InfoCard>
      <button
        className={`group flex w-full items-center justify-start gap-2 ${styles.button}`}
        onClick={() => setShowDetails((currentVal) => !currentVal)}
      >
        <Image alt="Technical Information icon" src={TechInfoIcon} />
        <p className="text-base font-medium leading-5 text-white group-hover:text-neutral-200">
          Technical Information
        </p>
      </button>
      {showDetails && (
        <>
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
        </>
      )}
    </InfoCard>
  )
}
