import { numberWithCommas } from "@helium/spl-utils"
import clsx from "clsx"
import { PropsWithChildren } from "react"
import { CountdownRenderProps } from "react-countdown"
import { ToolTipProps, Tooltip } from "./Tooltip"

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

type StatItemProps = {
  label: string
  value?: string | number
  unit?: string
  tooltip?: ToolTipProps
}

export const StatItem = ({
  label,
  value,
  children,
  unit,
  tooltip,
}: PropsWithChildren<StatItemProps>) => {
  if (typeof value === "number") value = numberWithCommas(value, 0)
  const isValueString = typeof value === "string"
  const Value = !isValueString ? (
    children
  ) : (
    <p className="text-base">
      {value}
      {!!unit && <span className="text-xs text-gray-500"> {unit}</span>}
    </p>
  )

  return (
    <div
      className={clsx(
        "w-15 flex-1 flex-col justify-between gap-2 rounded-xl border p-4",
        "border-zinc-900/5 bg-white text-zinc-800 shadow",
        "dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
      )}
    >
      <div className="flex justify-between">
        <p className="text-sm">{label}</p>
        {!!tooltip && <Tooltip {...tooltip} />}
      </div>
      {Value}
    </div>
  )
}
