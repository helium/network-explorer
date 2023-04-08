import { Fragment } from "react"
import { Layer, Source } from "react-map-gl"
import { NetworkCoverageLayerOption } from "./LayerTabs"
import {
  MIN_HEXES_ZOOM,
  MIN_MAP_ZOOM,
  POINTS_AND_HEXES_OVERLAP,
  getBlurredPointStyle,
  getHexFillStyle,
} from "./utils"

export default function NetworkCoverageLayer({
  layer: { name, color, sourceDomain, points, hexes },
  ...props
}: {
  layer: NetworkCoverageLayerOption
}) {
  const id = name.toLowerCase().replaceAll(" ", "_")
  return (
    <Fragment {...props}>
      <Source
        id={`${id}_points_source`}
        type="vector"
        url={`${sourceDomain}/${points.sourcePath}`}
        minzoom={MIN_MAP_ZOOM}
        maxzoom={MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP}
      >
        <Layer
          id={`${id}_points_layer`}
          type="circle"
          source-layer={points.sourceLayer}
          maxzoom={MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP}
          paint={getBlurredPointStyle(color)}
        />
      </Source>
      <Source
        id={`${id}_hexes_source`}
        type="vector"
        url={`${sourceDomain}/${hexes.sourcePath}`}
      >
        <Layer
          id={`${id}_hexes_layer`}
          type="fill"
          source-layer={hexes.sourceLayer}
          paint={getHexFillStyle(color)}
        />
      </Source>
    </Fragment>
  )
}
