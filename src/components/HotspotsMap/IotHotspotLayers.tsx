import { Layer, Source } from "react-map-gl"
import { IOT_HOTSPOT_HEXES_LAYER, MIN_MAP_ZOOM } from "./constants"

export default function IotHotspotLayers() {
  return (
    <>
      <Source
        type="vector"
        url="https://mt.hotspotty.org/helium_iot_points"
        minzoom={MIN_MAP_ZOOM}
        maxzoom={MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP}
      >
        <Layer
          type="circle"
          source-layer="helium_iot"
          maxzoom={MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP}
          paint={blurredOutlineStyle}
        />
      </Source>

      <Source type="vector" url="https://mt.hotspotty.org/helium_iot_hexes">
        <Layer
          id={IOT_HOTSPOT_HEXES_LAYER}
          type="fill"
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

const CELL_COLOR = "#27ac92"

const hexFillStyle = {
  "fill-color": CELL_COLOR,
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
