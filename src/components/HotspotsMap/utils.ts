import { CoordPair } from "h3-js"
import { HeliumIotIcon } from "../icons/HeliumIotIcon"
import { HeliumMobileIcon } from "../icons/HeliumMobileIcon"

export const MIN_MAP_ZOOM = 2
export const MAX_MAP_ZOOM = 14

const WORLD_BOUNDS: [CoordPair, CoordPair] = [
  [-134.827109, 57.785781],
  [129.767893, -30.955724],
]

export const INITIAL_MAP_VIEW_STATE = {
  bounds: WORLD_BOUNDS,
}

export const MAP_CONTAINER_STYLE: React.CSSProperties = {
  height: "100%",
  width: "100%",
  overflow: "hidden",
  position: "relative",
  backgroundColor: "rgb(19,24,37)",
}

export const MIN_HEXES_ZOOM = 7
export const MIN_HEX_LABELS_ZOOM = 11
export const POINTS_AND_HEXES_OVERLAP = 2

export const HELIUM_IOT_COLOR = "#27EE76"
export const HELIUM_MOBILE_COLOR = "#009FF9"

export const getHexFillStyle = (color: string): mapboxgl.FillPaint => ({
  "fill-color": color,
  "fill-opacity": 0.4,
})

export const getBlurredPointStyle = (color: string): mapboxgl.CirclePaint => ({
  "circle-color": color,
  "circle-opacity": [
    "interpolate",
    ["exponential", 2],
    ["zoom"],
    MIN_MAP_ZOOM,
    0.05,
    MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP,
    0.4,
  ],
  "circle-radius": [
    "interpolate",
    ["exponential", 2],
    ["zoom"],
    MIN_MAP_ZOOM,
    3,
    MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP,
    2,
  ],
})

export const getHexOutlineStyle = (
  theme: string | undefined
): mapboxgl.LinePaint => ({
  "line-color": theme === "dark" ? "#fff" : "rgb(113,113,122)",
  "line-width": 4,
})

export const getHexLabelStyle = (
  theme: string | undefined
): mapboxgl.SymbolPaint => ({
  "text-color": theme === "dark" ? "white" : "#6D6D6D",
})

export const hexLabelLayout: mapboxgl.SymbolLayout = {
  "text-font": ["NotoSans-Regular"],
  "text-field": ["get", "count"],
  "text-allow-overlap": false,
  "text-size": 23,
}

export interface HexFeatureDetails {
  hexId: string
  geojson: GeoJSON.Geometry
}

export const ZOOM_BY_HEX_RESOLUTION: { [resolution: number]: number } = {
  10: 14,
  9: 14,
  8: 13,
  7: 12,
  6: 11,
  5: 10,
  4: 9,
}

interface LayerConfig {
  sourcePath: string
  sourceLayer: string
}

export interface NetworkCoverageLayerOption {
  name: string
  icon: (props: any) => JSX.Element
  color: string
  sourceDomain: string
  points: LayerConfig
  hexes: LayerConfig
}

export const networkLayers: { [network: string]: NetworkCoverageLayerOption } =
  {
    mobile: {
      name: "MOBILE",
      icon: HeliumMobileIcon,
      color: HELIUM_MOBILE_COLOR,
      sourceDomain: process.env.NEXT_PUBLIC_HOTSPOTTY_TILESERVER_URL!,
      points: {
        sourcePath: "public.helium_mobile_points.json",
        sourceLayer: "public.helium_mobile_points",
      },
      hexes: {
        sourcePath: "public.helium_mobile_hexes.json",
        sourceLayer: "public.helium_mobile_hexes",
      },
    },
    iot: {
      name: "IOT",
      icon: HeliumIotIcon,
      color: HELIUM_IOT_COLOR,
      sourceDomain: process.env.NEXT_PUBLIC_HELIUMGEEK_TILESERVER_URL!,
      points: {
        sourcePath: "hg.gateways-rewarded-r8.points.json",
        sourceLayer: "hg.gateways-rewarded-r8.points",
      },
      hexes: {
        sourcePath: "hg.gateways-rewarded-r8.hexes.json",
        sourceLayer: "hg.gateways-rewarded-r8.hexes",
      },
    },
  }
