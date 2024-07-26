import { InfoCard } from "@/components/shared/InfoCard"
import { RssiPill } from "@/components/shared/RssiPill"
import Image from "next/image"
import ConnectedDevicesIcon from "../../../../../../../public/connected-devices.png"

export const ConnectedDevices = () => {
  return (
    <InfoCard>
      <div className="flex w-full justify-between">
        <div className="flex w-full items-center justify-start gap-3">
          <Image alt="Connected Devices Icon" src={ConnectedDevicesIcon} />
          <p className="text-base font-medium text-neutral-200">
            Connected Devices
          </p>
        </div>
        <div className="flex flex-col justify-around">
          <RssiPill strength="low" />
          <RssiPill strength="medium" />
        </div>
      </div>
    </InfoCard>
  )
}
