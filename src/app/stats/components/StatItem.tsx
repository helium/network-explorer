import { numberWithCommas } from "@helium/spl-utils"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { ReactNode } from "react"
import { CountdownRenderProps } from "react-countdown"
import { Tooltip } from "react-tooltip"

export const CountdownRenderer = ({
  days,
  formatted: { hours, minutes, seconds },
}: CountdownRenderProps) => {
  let countdown = ""
  if (!!days) {
    countdown = `${days} days`
    if (days < 10) countdown += ` ${hours}:${minutes}:${seconds}`
  } else countdown = `${hours}:${minutes}:${seconds}`
  return <span className="text-base">{countdown}</span>
}

type ToolTip = {
  sourceText?: string
  description?: string
  cadence?: string
}

type StatItemProps = {
  label: string
  value: string | ReactNode | number
  unit?: string
  tooltip?: ToolTip
}

export const StatItem = ({ label, value, unit, tooltip }: StatItemProps) => {
  if (typeof value === "number") value = numberWithCommas(value, 0)
  const isValueString = typeof value === "string"
  const Value = !isValueString ? (
    value
  ) : (
    <p className="text-base">
      {value}
      {!!unit && <span className="text-xs text-gray-500"> {unit}</span>}
    </p>
  )

  return (
    <div
      className={clsx(
        "w-15 flex flex-1 flex-col justify-between gap-2 rounded-xl border p-4",
        "border-zinc-900/5 bg-white text-zinc-800 shadow",
        "dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
      )}
    >
      <div className="flex justify-between">
        <p className="text-sm">{label}</p>
        {!!tooltip && (
          <div>
            <a data-tooltip-id={label} data-tooltip-place="top">
              <InformationCircleIcon className="h-5 w-5" />
            </a>

            <Tooltip id={label}>
              <div className="max-w-xs">
                {tooltip.description && <p>{tooltip?.description}</p>}
                {tooltip.sourceText && <p>Source: {tooltip?.sourceText}</p>}
                {tooltip.cadence && <p>Updated: {tooltip?.cadence}</p>}
              </div>
            </Tooltip>
          </div>
        )}
      </div>
      {Value}
    </div>
  )
}
