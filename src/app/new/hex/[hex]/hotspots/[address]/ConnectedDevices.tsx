"use client"

import { InfoCard, InfoCardBody } from "@/components/shared/InfoCard"
import { RssiPill } from "@/components/shared/RssiPill"
import ConnectedDevicesIcon from "@public/connected-devices.png"
import clsx from "clsx"
import Image from "next/image"
import { useState } from "react"
import styles from "./page.module.css"

export const ConnectedDevices = () => {
  const [showDetails, setShowDetails] = useState(false)
  const [{ mappers, dimo }, setPreferences] = useState({
    mappers: true,
    dimo: true,
  })

  return (
    <InfoCard reducedPadding active={showDetails}>
      <div className="flex w-full justify-between">
        <button
          className={`group flex w-full items-center justify-between gap-2 ${styles.button} w-full rounded-lg p-4 hover:bg-[#8A8A8A]/20`}
          onClick={() => setShowDetails((currentVal) => !currentVal)}
        >
          <div className="flex items-center gap-2">
            <Image alt="Connected Devices Icon" src={ConnectedDevicesIcon} />
            <p className="text-base font-medium leading-5 text-white group-hover:text-neutral-200">
              Connected Devices
            </p>
          </div>
          {!showDetails && (
            <button className="flex h-full flex-col justify-between">
              <RssiPill strength="low" isEmpty={!mappers} />
              <RssiPill strength="medium" isEmpty={!dimo} />
            </button>
          )}
        </button>
      </div>
      {showDetails && (
        <InfoCardBody>
          <button
            className={clsx(
              "group flex h-12 w-full items-center justify-between rounded-xl border border-[#7C7E81]/30 hover:border-[#7C7E81]",
              mappers ? "bg-[#131313]/30" : "inactive"
            )}
            onClick={() =>
              setPreferences((preferences) => ({
                ...preferences,
                mappers: !preferences.mappers,
              }))
            }
          >
            <div className="m-1 flex h-10 w-full items-center justify-between rounded-lg p-3 group-hover:bg-[#8A8A8A]/20">
              <p className="text-sm font-medium leading-5 text-white group-hover:text-neutral-200">
                Mappers
              </p>
              <RssiPill strength="low" isEmpty={!mappers} />
            </div>
          </button>
          <button
            className={clsx(
              "group flex h-12 w-full items-center justify-between rounded-xl border border-[#7C7E81]/30 hover:border-[#7C7E81]",
              dimo ? "bg-[#131313]/30" : "inactive"
            )}
            onClick={() =>
              setPreferences((preferences) => ({
                ...preferences,
                dimo: !preferences.dimo,
              }))
            }
          >
            <div className="m-1 flex h-10 w-full items-center justify-between rounded-lg p-3 group-hover:bg-[#8A8A8A]/20">
              <p className="text-sm font-medium leading-5 text-white group-hover:text-neutral-200">
                DIMO
              </p>
              <RssiPill strength="medium" isEmpty={!dimo} />
            </div>
          </button>
        </InfoCardBody>
      )}
    </InfoCard>
  )
}
