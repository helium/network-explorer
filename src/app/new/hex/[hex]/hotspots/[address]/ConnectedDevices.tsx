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
          className="flex w-full items-center justify-start gap-3"
          onClick={() => setShowDetails((currentVal) => !currentVal)}
        >
          <Image alt="Connected Devices Icon" src={ConnectedDevicesIcon} />
          <p className="text-base font-medium text-neutral-200">
            Connected Devices
          </p>
        </button>
        {!showDetails && (
          <button className="flex flex-col justify-around">
            <RssiPill strength="low" isEmpty={!mappers} />
            <RssiPill strength="medium" isEmpty={!dimo} />
          </button>
        )}
      </div>
      {showDetails && (
        <>
          <button
            className="flex h-12 w-full items-center justify-between rounded-xl border border-neutral-400 p-4"
            onClick={() =>
              setPreferences((preferences) => ({
                ...preferences,
                mappers: !preferences.mappers,
              }))
            }
          >
            <p className="text-sm font-medium leading-5 text-neutral-200">
              Mappers
            </p>
            <RssiPill strength="low" isEmpty={!mappers} />
          </button>
          <button
            className="flex h-12 w-full items-center justify-between rounded-xl border border-neutral-400 p-4"
            onClick={() =>
              setPreferences((preferences) => ({
                ...preferences,
                dimo: !preferences.dimo,
              }))
            }
          >
            <p className="text-sm font-medium leading-5 text-neutral-200">
              DIMO
            </p>
            <RssiPill strength="medium" isEmpty={!dimo} />
          </button>
        </>
      )}
    </InfoCard>
  )
}
