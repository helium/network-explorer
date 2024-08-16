import { InfoWrapper } from "@/components/shared/InfoWrapper"
import { HexPage } from "./HexPage"

export const metadata = {
  title: "Helium Hotspots Map - Hotspot Details",
}

type Params = {
  hex: string
}

export default function Page({ params }: { params: Params }) {
  return (
    <InfoWrapper>
      <HexPage params={params} />
    </InfoWrapper>
  )
}
