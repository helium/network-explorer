"use client"

import { NetworkCoverageLayer } from "@/components/HotspotsMap/NetworkCoverageLayer"
import { networkLayers } from "@/components/HotspotsMap/utils"

export default function Page() {
  return <NetworkCoverageLayer layer={networkLayers.mobile} />
}
