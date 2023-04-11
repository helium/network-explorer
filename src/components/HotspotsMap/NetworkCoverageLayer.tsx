import { useTheme } from "next-themes"
import { Fragment } from "react"
import { Layer, Source } from "react-map-gl"
import { NetworkCoverageLayerOption } from "./LayerTabs"
import {
  MIN_HEXES_ZOOM,
  MIN_HEX_LABELS_ZOOM,
  POINTS_AND_HEXES_OVERLAP,
  getBlurredPointStyle,
  getHexFillStyle,
  getHexLabelStyle,
  hexLabelLayout,
} from "./utils"

export function NetworkCoverageLayer({
  layer: { color, sourceDomain, points, hexes },
  ...props
}: {
  layer: NetworkCoverageLayerOption
}) {
  const { resolvedTheme } = useTheme()
  return (
    <Fragment {...props}>
      <Source
        id="points_source"
        type="vector"
        url={`${sourceDomain}/${points.sourcePath}`}
      >
        <Layer
          id="points_layer"
          type="circle"
          source-layer={points.sourceLayer}
          maxzoom={MIN_HEXES_ZOOM + POINTS_AND_HEXES_OVERLAP}
          paint={getBlurredPointStyle(color)}
        />
        <Layer
          id="hotspot_count_labels"
          type="symbol"
          source-layer={points.sourceLayer}
          minzoom={MIN_HEX_LABELS_ZOOM}
          layout={hexLabelLayout}
          paint={getHexLabelStyle(resolvedTheme)}
        />
      </Source>
      <Source
        id="hexes_source"
        type="vector"
        url={`${sourceDomain}/${hexes.sourcePath}`}
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
