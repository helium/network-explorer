import { InfoWrapper } from "@/components/shared/InfoWrapper"
import clsx from "clsx"
import { ConnectedDevices } from "./ConnectedDevices"
import { DetailsHeaderProps } from "./DetailsHeader"
import { ExplorerOptions } from "./ExplorerOptions"
import { Insights } from "./Insights"
import { TechnicalInfo } from "./TechnicalInfo"
import { OpenCardProvider } from "./useOpenCard"

export const metadata = {
  title: "Helium Hotspots Map - Hotspot Details",
}

type Params = {
  hex: string
  address: string
}

export default function Page({ params }: { params: Params }) {
  return (
    <InfoWrapper>
      <OpenCardProvider>
        <div className={clsx("flex flex-col", "sm:gap-4")}>
          <DetailsHeaderProps {...params} />
          <Insights />
          <ConnectedDevices />
          <TechnicalInfo />
          <ExplorerOptions address={params.address} />
        </div>
      </OpenCardProvider>
    </InfoWrapper>
  )
}
