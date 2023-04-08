import { Layer, Source } from "react-map-gl"
import {
  MIN_HEXES_ZOOM,
  MIN_MAP_ZOOM,
  POINTS_AND_HEXES_OVERLAP,
  getBlurredPointStyle,
  getHexFillStyle,
} from "./utils"

const LAYER_COLOR = "#D23E72"

export default function MobileHotspotLayer() {
  return (
    <>
      <Source
        id="cell_points_source"
        type="vector"
        url="https://hotspot-tileserver.helium.wtf/public.cell_points.json"
        minzoom={MIN_MAP_ZOOM}
        maxzoom={MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP}
      >
        <Layer
          source="cell_points_source"
          source-layer="public.cell_points"
          id="cell_points"
          type="circle"
          maxzoom={MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP}
          paint={getBlurredPointStyle(LAYER_COLOR)}
        />
      </Source>
      <Source
        id="cell_hexes_source"
        type="vector"
        url="https://hotspot-tileserver.helium.wtf/public.cell_h3_res8.json"
      >
        <Layer
          id="cell_hexes"
          type="fill"
          source="cell_hexes_source"
          source-layer="public.cell_h3_res8"
          paint={getHexFillStyle(LAYER_COLOR)}
        />
      </Source>
    </>
  )
}
