"use client"

import { InfoCard } from "@/components/shared/InfoCard"
import { RssiPill } from "@/components/shared/RssiPill"
import ConnectedDevicesIcon from "@public/connected-devices.png"
import Image from "next/image"
import { useState } from "react"

export const ConnectedDevices = () => {
  const [showDetails, setShowDetails] = useState(false)
  const [{ mappers, dimo }, setPreferences] = useState({
    mappers: true,
    dimo: true,
  })

  return (
    <InfoCard>
      <div className="flex w-full justify-between">
        <button
          className="group flex w-full items-center justify-between gap-3"
          onClick={() => setShowDetails((currentVal) => !currentVal)}
        >
          <div className="flex items-center gap-3">
            <Image alt="Connected Devices Icon" src={ConnectedDevicesIcon} />
            <p className="text-base font-medium text-white group-hover:text-neutral-200">
              Connected Devices
            </p>
          </div>
          {!showDetails && (
            <button className="flex h-full flex-col justify-around">
              <RssiPill strength="low" isEmpty={!mappers} />
              <RssiPill strength="medium" isEmpty={!dimo} />
            </button>
          )}
        </button>
      </div>
      {showDetails && (
        <>
          <button
            className="group flex h-12 w-full items-center justify-between rounded-xl border border-[#7C7E81]/30 p-4 hover:border-[#7C7E81]"
            onClick={() =>
              setPreferences((preferences) => ({
                ...preferences,
                mappers: !preferences.mappers,
              }))
            }
          >
            <p className="text-sm font-medium leading-5 text-white group-hover:text-neutral-200">
              Mappers
            </p>
            <RssiPill strength="low" isEmpty={!mappers} />
          </button>
          <button
            className="group flex h-12 w-full items-center justify-between rounded-xl border border-[#7C7E81]/30 p-4 hover:border-[#7C7E81]"
            onClick={() =>
              setPreferences((preferences) => ({
                ...preferences,
                dimo: !preferences.dimo,
              }))
            }
          >
            <p className="text-sm font-medium leading-5 text-white group-hover:text-neutral-200">
              DIMO
            </p>
            <RssiPill strength="medium" isEmpty={!dimo} />
          </button>
        </>
      )}
    </InfoCard>
  )
}
