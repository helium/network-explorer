"use client"

import "mapbox-gl/dist/mapbox-gl.css"
import { useTheme } from "next-themes"
import { useCallback, useMemo, useRef, useState } from "react"
import Map, { MapLayerMouseEvent, MapRef } from "react-map-gl"
import HexDetails from "./HexDetails"
import LayerTabs from "./LayerTabs"
import {
  HexFeatureDetails,
  INITIAL_MAP_VIEW_STATE,
  MAP_CONTAINER_STYLE,
  MAX_MAP_ZOOM,
  MIN_MAP_ZOOM,
} from "./utils"

export default function HotspotsMap() {
  const mapRef = useRef<MapRef>(null)
  const [cursor, setCursor] = useState("")
  const [selectedHex, setSelectedHex] = useState<HexFeatureDetails | null>(null)
  const { resolvedTheme } = useTheme()

  const mapStyleUrl = useMemo(() => {
    let key =
      resolvedTheme === "dark"
        ? "clg9crwz3001001plb31bjk9g"
        : "clg9cv0at001g01pegr0zscwq"

    return `mapbox://styles/hotspotty/${key}?optimize=true`
  }, [resolvedTheme])

  const onClick = useCallback((event: MapLayerMouseEvent) => {
    if (!mapRef.current || !event.features) return

    const map = mapRef.current.getMap()

    event.features.forEach(({ id, layer, properties }) => {
      if (!id || layer.id !== "hexes_layer" || !properties?.id) return
      const selectedHex = {
        hexFeatureId: id as number,
        hexId: properties.id as string,
        sourceId: layer.source as string,
        sourceLayer: layer["source-layer"] as string,
      }

      setSelectedHex(selectedHex)

      map.setFeatureState(
        {
          source: selectedHex.sourceId,
          sourceLayer: selectedHex.sourceLayer,
          id: selectedHex.hexFeatureId,
        },
        { selected: false }
      )
    })
  }, [])

  const onMouseEnter = useCallback(() => setCursor("pointer"), [])
  const onMouseLeave = useCallback(() => setCursor(""), [])

  const closeHexDetails = useCallback(() => {
    if (!mapRef.current || !selectedHex) return

    const map = mapRef.current.getMap()

    map.setFeatureState(
      {
        source: selectedHex.sourceId,
        sourceLayer: selectedHex.sourceLayer,
        id: selectedHex.hexFeatureId,
      },
      { selected: true }
    )

    setSelectedHex(null)
  }, [selectedHex])

  if (!process.env.NEXT_PUBLIC_MAPBOX_KEY) return null

  return (
    <Map
      initialViewState={INITIAL_MAP_VIEW_STATE}
      minZoom={MIN_MAP_ZOOM}
      maxZoom={MAX_MAP_ZOOM}
      style={MAP_CONTAINER_STYLE}
      mapStyle={mapStyleUrl}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      interactiveLayerIds={["hexes_layer"]}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      cursor={cursor}
      ref={mapRef}
    >
      <div className="fixed bottom-6 z-10 flex w-full justify-center">
        <LayerTabs />
      </div>

      <HexDetails selectedHex={selectedHex} onClose={closeHexDetails} />
    </Map>
  )
}
