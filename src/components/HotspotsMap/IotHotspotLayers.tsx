import { Layer, Source } from "react-map-gl"
import {
  IOT_HOTSPOT_HEXES_LAYER,
  MIN_HEXES_ZOOM,
  MIN_MAP_ZOOM,
  POINTS_AND_HEXES_OVERLAP,
  getBlurredPointStyle,
  getHexFillStyle,
} from "./utils"

const LAYER_COLOR = "#27ac92"

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
          paint={getBlurredPointStyle(LAYER_COLOR)}
        />
      </Source>
      <Source type="vector" url="https://mt.hotspotty.org/helium_iot_hexes">
        <Layer
          id={IOT_HOTSPOT_HEXES_LAYER}
          type="fill"
          source-layer="helium_iot"
          paint={getHexFillStyle(LAYER_COLOR)}
        />
      </Source>
    </>
  )
}
