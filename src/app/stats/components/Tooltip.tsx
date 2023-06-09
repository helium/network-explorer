"use client"
// broken into separate Client side component since ReactTooltip uses client side only state

import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { Tooltip as ReactTooltip } from "react-tooltip"

export type ToolTipProps = {
  sourceText?: string
  description?: string
  cadence?: string
  id: string
}

export const Tooltip = ({
  id,
  sourceText,
  description,
  cadence,
}: ToolTipProps) => {
  return (
    <div className="flex items-center">
      <a data-tooltip-id={id} data-tooltip-place="top">
        <InformationCircleIcon className="h-5 w-5" />
      </a>
      <ReactTooltip id={id}>
        <div className="max-w-xs">
          {!!description && <p>{description}</p>}
          {!!sourceText && <p>Source: {sourceText}</p>}
          {!!cadence && <p>Updated: {cadence}</p>}
        </div>
      </ReactTooltip>
    </div>
  )
}
