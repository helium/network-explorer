import { MapCover } from "@/components/MapCover"
import { Stats } from "./components"

export default async function Page() {
  return (
    <MapCover title="Network Stats">
      <Stats />
    </MapCover>
  )
}
