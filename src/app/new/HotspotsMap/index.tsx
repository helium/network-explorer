"use client"

import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { Protocol } from "pmtiles"

import { cellToLatLng, cellsToMultiPolygon, getResolution } from "h3-js"
import { useTheme } from "next-themes"
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Map, {
  Layer,
  MapLayerMouseEvent,
  MapProvider,
  MapRef,
  MapStyle,
  NavigationControl,
  Source,
  useMap,
} from "react-map-gl"
import { gaEvent } from "../GATracker"
import { Attribution } from "./Attribution"
import { NetworkCoverageLayer } from "./NetworkCoverageLayer"
import { mapLayersDark } from "./mapLayersDark"
import { mapLayersLight } from "./mapLayersLight"
import {
  HexFeatureDetails,
  INITIAL_MAP_VIEW_STATE,
  MAP_CONTAINER_STYLE,
  MAX_MAP_ZOOM,
  MIN_MAP_ZOOM,
  ZOOM_BY_HEX_RESOLUTION,
  getHexOutlineStyle,
  networkLayers,
} from "./utils"

export function HotspotsMap({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const segments = useSelectedLayoutSegments()
  const segment = useSelectedLayoutSegment()
  const mapRef = useRef<MapRef>(null)
  const [selectedHex, setSelectedHex] = useState<HexFeatureDetails | null>(null)
  const [cursor, setCursor] = useState("")

  useEffect(() => {
    let protocol = new Protocol()
    maplibregl.addProtocol("pmtiles", protocol.tile)
    return () => {
      maplibregl.removeProtocol("pmtiles")
    }
  }, [])

  const mapStyle = useMemo(() => {
    const style: MapStyle = {
      version: 8,
      sources: {
        protomaps: {
          type: "vector",
          tiles: [`${process.env.NEXT_PUBLIC_PMTILES_URL}/{z}/{x}/{y}.mvt`],
        },
      },
      glyphs: "https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf",
      layers: resolvedTheme === "dark" ? mapLayersDark : mapLayersLight,
    }
    return style
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

  useEffect(() => {
    gaEvent({ action: "map_load" })
  }, [])

  const onMouseEnter = useCallback(() => setCursor("pointer"), [])
  const onMouseLeave = useCallback(() => setCursor(""), [])

  return (
    <MapProvider>
      <Map
        initialViewState={INITIAL_MAP_VIEW_STATE}
        minZoom={MIN_MAP_ZOOM}
        maxZoom={MAX_MAP_ZOOM}
        style={MAP_CONTAINER_STYLE}
        mapStyle={mapStyle}
        localFontFamily="NotoSans-Regular"
        // @ts-ignore
        mapLib={maplibregl}
        interactiveLayerIds={["hexes_layer"]}
        onLoad={selectHexByPathname}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        cursor={cursor}
        ref={mapRef}
        attributionControl={false}
      >
        {false && (
          <NavigationControl position="bottom-left" showCompass={false} />
        )}
        {children}

        {segment !== "stats" && <Attribution />}

        {segment !== "mobile" && (
          <NetworkCoverageLayer layer={networkLayers.iot} />
        )}

        {selectedHex && (
          <Source type="geojson" data={selectedHex.geojson}>
            <Layer type="line" paint={getHexOutlineStyle(resolvedTheme)} />
          </Source>
        )}
        <MapTest />
      </Map>
    </MapProvider>
  )
}

const MapTest = () => {
  const map = useMap()
  const [currentZoom, setCurrentZoom] = useState(map.current?.getZoom())
  const zoom = map.current?.getZoom()
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentZoom(map.current?.getZoom())
    }, 250)
    return () => clearInterval(interval)
  }, [map, setCurrentZoom])
  console.log(zoom)

  return (
    <div className="absolute bottom-1 left-1 bg-rose-950">
      <p color="white">Some random text</p>
      <button
        disabled={zoom === MAX_MAP_ZOOM}
        onClick={() => map.current?.zoomIn()}
      >
        ZOOM IN!
      </button>
      <button
        disabled={zoom === MIN_MAP_ZOOM}
        onClick={() => map.current?.zoomOut()}
      >
        ZOOM OUT!
      </button>
    </div>
  )
}
