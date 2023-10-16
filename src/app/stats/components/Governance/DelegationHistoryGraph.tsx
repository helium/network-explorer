"use client"

import {
  HELIUM_IOT_COLOR,
  HELIUM_MOBILE_COLOR,
} from "@/components/HotspotsMap/utils"
import { numberWithCommas } from "@helium/spl-utils"
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
const PERCENT_IOT_COLOR = "#AAA"

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
        <p className="label">Date: {format(label, DATE_FORMAT)}</p>
        {payload.map(({ dataKey, name, value }) => {
          let dotColor = ""
          let valueFormatted = ""
          let labelFormatted = ""
          if (String(name).includes("Delegated")) {
            valueFormatted = numberWithCommas(value as number, 0)
            const isIot = (name as string).includes("iot")
            labelFormatted = isIot ? "veHNT to IOT" : "veHNT to MOBILE"
            dotColor = isIot ? HELIUM_IOT_COLOR : HELIUM_MOBILE_COLOR
          } else {
            valueFormatted = (value as number).toFixed(2) + "%"
            labelFormatted = "% veHNT to IOT"
            dotColor = PERCENT_IOT_COLOR
          }

          return (
            <div className="w-100 flex justify-between gap-6" key={dataKey}>
              <div className="flex items-center">
                <div
                  className="mr-1  h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: dotColor,
                  }}
                />
                <p>{labelFormatted}:</p>
              </div>
              <p>{valueFormatted}</p>
            </div>
          )
        })}
      </div>
    )
  }

  return null
}

export type DelegationHistoryGraphRow = {
  iotDelegated: number
  mobileDelegated: number
  percentIot: number
  date: number
}

type DelegationHistoryGraphProps = {
  data: DelegationHistoryGraphRow[]
}

export const DelegationHistoryGraph = ({
  data,
}: DelegationHistoryGraphProps) => {
  return (
    <div className="w-50 h-64">
      <ResponsiveContainer width="100%" height={256}>
        <LineChart width={300} height={100} data={data}>
          <Tooltip content={<CustomTooltip />} />
          <YAxis
            tickFormatter={(value) =>
              Math.round(value / 1000000).toString() + "M"
            }
            yAxisId="veHNT"
          />
          <YAxis
            dataKey="percentIot"
            orientation="right"
            yAxisId="percentIot"
            unit="%"
            domain={[0, 100]}
            range={[0, 1]}
          />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), DATE_FORMAT)}
          />
          <Line
            type="monotone"
            dataKey="percentIot"
            stroke={PERCENT_IOT_COLOR}
            strokeWidth={2}
            dot={false}
            yAxisId="percentIot"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="iotDelegated"
            stroke={HELIUM_IOT_COLOR}
            strokeWidth={2}
            dot={false}
            yAxisId="veHNT"
          />
          <Line
            type="monotone"
            dataKey="mobileDelegated"
            stroke={HELIUM_MOBILE_COLOR}
            strokeWidth={2}
            dot={false}
            yAxisId="veHNT"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
