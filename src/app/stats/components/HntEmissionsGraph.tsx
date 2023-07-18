"use client"

import {
  HELIUM_IOT_COLOR,
  HELIUM_MOBILE_COLOR,
} from "@/components/HotspotsMap/utils"
import clsx from "clsx"
import { format } from "date-fns"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts"
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"

const DATE_FORMAT = "M/dd"

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload) {
    return (
      <div
        className={clsx(
          "flex-col rounded-xl border p-4",
          "border-zinc-900/5 bg-white text-zinc-800 shadow",
          "dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
        )}
      >
        <p className="label">Date: {format(new Date(label), DATE_FORMAT)}</p>
        {payload.map(({ dataKey, name, value }) => {
          let valueFormatted = value
          let labelFormatted = ""
          if (String(name) === "total") {
            labelFormatted = "Total"
          } else {
            labelFormatted = String(name).toUpperCase() + " Treasury"
          }

          return (
            <div className="w-100 flex justify-between gap-2" key={dataKey}>
              <p>{labelFormatted}:</p>
              <p>{valueFormatted}</p>
            </div>
          )
        })}
      </div>
    )
  }

  return null
}

export type HntEmissionRow = {
  date: string
  total: number
  iot: number
  mobile: number
}

type DelegationHistoryGraphProps = {
  data: HntEmissionRow[]
}

export const HntEmissionsGraph = ({ data }: DelegationHistoryGraphProps) => {
  return (
    <div className="w-50 h-64">
      <ResponsiveContainer width="100%" height={256}>
        <LineChart width={300} height={100} data={data}>
          <Tooltip content={<CustomTooltip />} />
          <YAxis />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), DATE_FORMAT)}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#474DFF"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="iot"
            stroke={HELIUM_IOT_COLOR}
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="mobile"
            stroke={HELIUM_MOBILE_COLOR}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
