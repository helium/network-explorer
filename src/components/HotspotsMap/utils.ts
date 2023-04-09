type Coordinates = [number, number] // [lng, lat]

export const MIN_MAP_ZOOM = 2
export const MAX_MAP_ZOOM = 14

const WORLD_BOUNDS: [Coordinates, Coordinates] = [
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
export const POINTS_AND_HEXES_OVERLAP = 2

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

export const hexOutlineStyle: mapboxgl.LinePaint = {
  "line-color": "#fff",
  "line-width": [
    "case",
    ["boolean", ["feature-state", "selected"], true],
    0,
    6,
  ],
}

export interface HexFeatureDetails {
  hexFeatureId: number
  hexId: string
  sourceId: string
  sourceLayer: string
}
