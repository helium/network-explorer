"use client"

import { cellToLatLng, cellsToMultiPolygon, getResolution } from "h3-js"
import "mapbox-gl/dist/mapbox-gl.css"
import { useTheme } from "next-themes"
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Map, { Layer, MapLayerMouseEvent, MapRef, Source } from "react-map-gl"
import { Attribution } from "./Attribution"
import { LayerTabs } from "./LayerTabs"
import {
  HexFeatureDetails,
  INITIAL_MAP_VIEW_STATE,
  MAP_CONTAINER_STYLE,
  MAX_MAP_ZOOM,
  MIN_MAP_ZOOM,
  ZOOM_BY_HEX_RESOLUTION,
  getHexOutlineStyle,
} from "./utils"

export function HotspotsMap({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const segments = useSelectedLayoutSegments()
  const mapRef = useRef<MapRef>(null)
  const [selectedHex, setSelectedHex] = useState<HexFeatureDetails | null>(null)
  const [cursor, setCursor] = useState("")

  const mapStyleUrl = useMemo(() => {
    const styleUrl = new URL(
      resolvedTheme === "dark"
        ? process.env.NEXT_PUBLIC_MAPBOX_DARK_STYLE!
        : process.env.NEXT_PUBLIC_MAPBOX_LIGHT_STYLE!
    )
    styleUrl.searchParams.append("optimize", "true")
    return styleUrl.toString()
  }, [resolvedTheme])

  const selectHex = useCallback((hexId: string | null) => {
    if (!hexId) {
      setSelectedHex(null)
      return
    }

    const selectedHex = {
      hexId,
      geojson: {
        type: "MultiPolygon",
        coordinates: cellsToMultiPolygon([hexId], true),
      } as GeoJSON.Geometry,
    }

    setSelectedHex(selectedHex)

    if (!mapRef.current) return
    const map = mapRef.current.getMap()
    const [lat, lng] = cellToLatLng(hexId)
    const bounds = map.getBounds()
    const zoom = map.getZoom()
    const hexResolution = getResolution(hexId)
    const newZoom = ZOOM_BY_HEX_RESOLUTION[hexResolution]
    if (zoom < newZoom - 3 || !bounds.contains([lng, lat])) {
      // Fly to the hex if it's not visible in the current viewport, or if it's not zoomed in enough
      map.flyTo({ center: [lng, lat], zoom: newZoom })
    }
  }, [])

  const selectHexByPathname = useCallback(() => {
    if (!mapRef.current) return

    if (segments.length === 2 && segments[0] === "hex") {
      const hexId = segments[1]
      if (selectedHex?.hexId !== hexId) {
        selectHex(hexId)
      }
    } else if (pathname === "/" && selectedHex?.hexId) {
      selectHex(null)
    }
  }, [pathname, segments, selectHex, selectedHex?.hexId])

  useEffect(() => {
    selectHexByPathname()
  }, [selectHexByPathname])

  const onClick = useCallback(
    (event: MapLayerMouseEvent) => {
      event.features?.forEach(({ layer, properties }) => {
        if (layer.id !== "hexes_layer" || !properties?.id) return
        if (selectedHex?.hexId === properties.id) {
          router.push("/")
        } else {
          router.push(`/hex/${properties.id}`)
        }
      })
    },
    [router, selectedHex?.hexId]
  )

  const onMouseEnter = useCallback(() => setCursor("pointer"), [])
  const onMouseLeave = useCallback(() => setCursor(""), [])

  return (
    <Map
      initialViewState={INITIAL_MAP_VIEW_STATE}
      minZoom={MIN_MAP_ZOOM}
      maxZoom={MAX_MAP_ZOOM}
      style={MAP_CONTAINER_STYLE}
      mapStyle={mapStyleUrl}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      interactiveLayerIds={["hexes_layer"]}
      onLoad={selectHexByPathname}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      cursor={cursor}
      ref={mapRef}
      attributionControl={false}
    >
      {children}
      <div className="fixed bottom-10 z-10 flex w-full justify-center sm:bottom-6">
        <LayerTabs />
      </div>
      <Attribution />
      {selectedHex && (
        <Source type="geojson" data={selectedHex.geojson}>
          <Layer type="line" paint={getHexOutlineStyle(resolvedTheme)} />
        </Source>
      )}
    </Map>
  )
}
