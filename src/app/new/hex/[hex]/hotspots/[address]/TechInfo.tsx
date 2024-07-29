"use client"

import { InfoCard } from "@/components/shared/InfoCard"
import Image from "next/image"
import { PropsWithChildren, useState } from "react"
import LatitudeIcon from "../../../../../../../public/latitude.png"
import LongitudeIcon from "../../../../../../../public/longitude.png"
import TechInfoIcon from "../../../../../../../public/tech-info.png"

const Header = ({ children }: PropsWithChildren) => {
  return (
    <p className="mb-0.5 text-sm font-medium leading-5 text-neutral-200">
      {children}
    </p>
  )
}

const BodyBig = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-base font-medium leading-5 text-neutral-200">
      {children}
    </p>
  )
}

const Body = ({ children }: PropsWithChildren) => {
  return <p className="text-sm  leading-5 text-neutral-200">{children}</p>
}

export const TechInfo = () => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <InfoCard>
      <button
        className="flex w-full items-center justify-start gap-3"
        onClick={() => setShowDetails((currentVal) => !currentVal)}
      >
        <Image alt="Technical Information icon" src={TechInfoIcon} />
        <p className="text-base font-medium text-neutral-200">
          Technical Information
        </p>
      </button>
      {showDetails && (
        <>
          <div className="w-full">
            <Header>Online Time</Header>
            <BodyBig>3y 45m 27d 17:34:56</BodyBig>
          </div>
          <div className="w-full">
            <Header>Hotspot manufacturer</Header>
            <BodyBig>Cisco Systems</BodyBig>
          </div>
          <div className="w-full">
            <Header>Antenna gain</Header>
            <BodyBig>250.7 mb</BodyBig>
          </div>
          <div className="w-full">
            <Header>Antenna elevation</Header>
            <BodyBig>+15 ft</BodyBig>
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
