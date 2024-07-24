import Image from "next/image"
import ConnectedDevicesIcon from "../../../../../../../public/connected-devices.png"

export const ConnectedDevices = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-[#131313]/60 p-3">
      <div className="flex w-full justify-between">
        <div className="flex w-full items-center justify-start gap-3">
          <Image alt="Connected Devices Icon" src={ConnectedDevicesIcon} />
          <p className="text-base font-medium text-neutral-200">
            Connected Devices
          </p>
        </div>
        <div className="flex flex-col justify-around">
          <div className="h-2.5 w-4 rounded-lg bg-[#0DFEE1]" />
          <div className="h-2.5 w-4 rounded-lg bg-[#FFD600]" />
        </div>
      </div>
    </div>
  )
}
