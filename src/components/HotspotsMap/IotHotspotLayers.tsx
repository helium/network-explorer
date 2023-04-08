import { Layer, Source } from "react-map-gl"
import { MIN_MAP_ZOOM } from "./constants"

export default function HotspotsLayer() {
  return (
    <>
      <Source
        id={HELIUM_IOT_POINTS_SOURCE}
        type="vector"
        url="https://mt.hotspotty.org/helium_iot_points"
        minzoom={MIN_MAP_ZOOM}
        maxzoom={MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP}
      >
        <Layer
          id="helium_iot_hotspots_circle"
          type="circle"
          source={HELIUM_IOT_POINTS_SOURCE}
          source-layer="helium_iot"
          maxzoom={MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP}
          paint={blurredOutlineStyle}
        />
      </Source>

      <Source
        id={HELIUM_IOT_HEXES_SOURCE}
        type="vector"
        url="https://mt.hotspotty.org/helium_iot_hexes"
      >
        <Layer
          id="helium_iot_hotspots_fill"
          type="fill"
          source={HELIUM_IOT_HEXES_SOURCE}
          source-layer="helium_iot"
          paint={hexFillStyle}
        />
      </Source>
    </>
  )
}

//
// Utils
//

const HELIUM_IOT_POINTS_SOURCE = "helium_iot_points"
const HELIUM_IOT_HEXES_SOURCE = "helium_iot_hexes"

const CELL_COLOR = "#27ac92"

const hexFillStyle = {
  "fill-color": CELL_COLOR,
  "fill-outline-color": "#15ddb5",
  "fill-opacity": 0.4,
}

const MIN_HEXES_ZOOM = 7
const POINTS_AND_HEXES_OVERLAP = 2

const blurredOutlineStyle: mapboxgl.CirclePaint = {
  "circle-color": CELL_COLOR,
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
}
