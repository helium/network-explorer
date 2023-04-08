"use client"

import "mapbox-gl/dist/mapbox-gl.css"
import { useTheme } from "next-themes"
import { useMemo } from "react"
import Map from "react-map-gl"

type Coordinates = [number, number] // [lng, lat]

const MIN_MAP_ZOOM = 2

const WORLD_BOUNDS: [Coordinates, Coordinates] = [
  [-134.827109, 57.785781],
  [129.767893, -30.955724],
]

const INITIAL_VIEW_STATE = {
  bounds: WORLD_BOUNDS,
}

const MAP_CONTAINER_STYLE: React.CSSProperties = {
  height: "100%",
  width: "100%",
  overflow: "hidden",
  position: "relative",
  backgroundColor: "rgb(19,24,37)",
}

export default function HotspotsMap() {
  const { resolvedTheme } = useTheme()

  const mapStyleUrl = useMemo(() => {
    let key =
      resolvedTheme === "dark"
        ? "ckshalgloh40l17q6aapw2lp9"
        : "ckshap8do7p1617rzndourdz2"

    return `mapbox://styles/hotspotty/${key}`
  }, [resolvedTheme])

  return (
    <Map
      initialViewState={INITIAL_VIEW_STATE}
      minZoom={MIN_MAP_ZOOM}
      style={MAP_CONTAINER_STYLE}
      mapStyle={mapStyleUrl}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY ?? ""}
    />
  )
}
