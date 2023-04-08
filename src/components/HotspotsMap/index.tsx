"use client"

import "mapbox-gl/dist/mapbox-gl.css"
import { useTheme } from "next-themes"
import { useMemo } from "react"
import Map from "react-map-gl"
import LayerTabs from "./LayerTabs"
import {
  INITIAL_MAP_VIEW_STATE,
  MAP_CONTAINER_STYLE,
  MAX_MAP_ZOOM,
  MIN_MAP_ZOOM,
} from "./utils"

export default function HotspotsMap() {
  const { resolvedTheme } = useTheme()

  const mapStyleUrl = useMemo(() => {
    let key =
      resolvedTheme === "dark"
        ? "ckshalgloh40l17q6aapw2lp9"
        : "ckshap8do7p1617rzndourdz2"

    return `mapbox://styles/hotspotty/${key}?optimize=true`
  }, [resolvedTheme])

  if (!process.env.NEXT_PUBLIC_MAPBOX_KEY) return null

  return (
    <Map
      initialViewState={INITIAL_MAP_VIEW_STATE}
      minZoom={MIN_MAP_ZOOM}
      maxZoom={MAX_MAP_ZOOM}
      style={MAP_CONTAINER_STYLE}
      mapStyle={mapStyleUrl}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
    >
      <div className="fixed bottom-6 z-10 flex w-full justify-center">
        <LayerTabs />
      </div>
    </Map>
  )
}