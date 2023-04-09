import { Fragment } from "react"
import { Layer, Source } from "react-map-gl"
import { NetworkCoverageLayerOption } from "./LayerTabs"
import {
  MIN_HEXES_ZOOM,
  POINTS_AND_HEXES_OVERLAP,
  getBlurredPointStyle,
  getHexFillStyle,
} from "./utils"

export default function NetworkCoverageLayer({
  layer: { color, sourceDomain, points, hexes },
  ...props
}: {
  layer: NetworkCoverageLayerOption
}) {
  return (
    <Fragment {...props}>
      <Source
        id="points_source"
        type="vector"
        url={`${sourceDomain}/${points.sourcePath}`}
        maxzoom={MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP}
      >
        <Layer
          id="points_layer"
          type="circle"
          source-layer={points.sourceLayer}
          maxzoom={MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP}
          paint={getBlurredPointStyle(color)}
        />
      </Source>
      <Source
        id="hexes_source"
        type="vector"
        url={`${sourceDomain}/${hexes.sourcePath}`}
        minzoom={MIN_HEXES_ZOOM - POINTS_AND_HEXES_OVERLAP}
      >
        <Layer
          id="hexes_layer"
          type="fill"
          source-layer={hexes.sourceLayer}
          paint={getHexFillStyle(color)}
          minzoom={MIN_HEXES_ZOOM}
        />
      </Source>
    </Fragment>
  )
}
