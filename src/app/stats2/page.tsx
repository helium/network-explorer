import { MapCover } from "@/components/MapCover"
import { Stats } from "./components"

export const revalidate = 60 * 5 // revalidate 5 minutes

export default async function Page() {
  return (
    <MapCover title="Network Stats">
      <Stats />
    </MapCover>
  )
}
