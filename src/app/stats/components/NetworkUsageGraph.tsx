"use client"

import {
  HELIUM_IOT_COLOR,
  HELIUM_MOBILE_COLOR,
} from "@/components/HotspotsMap/utils"
import clsx from "clsx"
import { format } from "date-fns"
import {
  Bar,
  ComposedChart,
  Line,
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
const RATE_COLOR = "#ff7300"

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
        {payload
          .sort((a) => {
            // want total / projected remaining first
            if (a.name === "projectedRemaining") {
              return -1
            }
            return 1
          })
          .map(({ dataKey, name, value }) => {
            let labelFormatted = ""
            let dotColor = "#474DFF"

            if (name === "iotUsage") {
              labelFormatted = "IOT usage"
              dotColor = HELIUM_IOT_COLOR
            } else if (name === "mobileUsage") {
              labelFormatted = "MOBILE usage"
              dotColor = HELIUM_MOBILE_COLOR
            } else if (name === "rate") {
              labelFormatted = "USD/hour"
              dotColor = RATE_COLOR
            } else if (name === "projectedRemaining") {
              labelFormatted = value === 0 ? "Daily Total" : "Est Daily Total"
              dotColor = "none"

              const targetNames = [
                "iotUsage",
                "mobileUsage",
                "projectedRemaining",
              ]
              const total = payload.reduce((acc, current) => {
                if (targetNames.includes(current.name as string)) {
                  return acc + (current.value as number)
                }
                return acc
              }, 0)
              value = total
            }
            let valueFormatted = "$" + (value as number).toFixed(2)

            return (
              <div className="w-100 flex justify-between gap-2" key={dataKey}>
                <div className="flex items-center">
                  <div
                    className="mr-1  h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: dotColor,
                    }}
                  />
                  <p> {labelFormatted}:</p>
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

export type NetworkUsageGraphRow = {
  iotUsage: number
  mobileUsage: number
  date: number
}

type NetworkUsageGraphProps = {
  data: NetworkUsageGraphRow[]
}

export const NetworkUsageGraph = ({ data }: NetworkUsageGraphProps) => {
  return (
    <div className="w-50 h-64">
      <ResponsiveContainer width="100%" height={256}>
        <ComposedChart width={300} height={100} data={data}>
          <Tooltip content={<CustomTooltip />} />
          <YAxis
            tickFormatter={(value) => "$" + (value as number).toFixed(0)}
            yAxisId="USD"
            orientation="right"
          />
          <YAxis
            tickFormatter={(value) => `$${(value as number).toFixed(0)}/h`}
            yAxisId="USD/h"
          />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), DATE_FORMAT)}
          />
          <Bar
            type="monotone"
            dataKey="iotUsage"
            fill={HELIUM_IOT_COLOR}
            stackId="a"
            yAxisId="USD"
          />
          <Bar
            type="monotone"
            dataKey="mobileUsage"
            fill={HELIUM_MOBILE_COLOR}
            stackId="a"
            yAxisId="USD"
          />
          <Bar
            type="monotone"
            dataKey="projectedRemaining"
            fill="#B6F8CC"
            stackId="a"
            yAxisId="USD"
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke={RATE_COLOR}
            yAxisId="USD/h"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
