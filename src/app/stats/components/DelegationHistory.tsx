import {
  HELIUM_IOT_COLOR,
  HELIUM_MOBILE_COLOR,
} from "@/components/HotspotsMap/utils"
import { BN } from "@coral-xyz/anchor"
import { currentEpoch } from "@helium/helium-sub-daos-sdk"
import {
  IOT_MINT,
  MOBILE_MINT,
  amountAsNum,
  numberWithCommas,
} from "@helium/spl-utils"
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
import { useSubDaoEpochInfo } from "../hooks/useSubDaoEpochInfo"
import { useUnixTimestamp } from "../hooks/useUnixTimestamp"
import { ONE_DAY_MS, veHntWoDecimal } from "../utils"

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
        <p className="label">Date: {format(label, DATE_FORMAT)}</p>
        {payload.map(({ dataKey, name, value }) => {
          let valueFormatted = ""
          let labelFormatted = ""
          if (String(name).includes("Delegated")) {
            valueFormatted = numberWithCommas(value as number, 0)
            labelFormatted = (name as string).includes("iot")
              ? "veHNT to IOT"
              : "veHNT to MOBILE"
          } else {
            valueFormatted = (value as number).toFixed(2)
            labelFormatted = "veHNT % to IOT"
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

export const DelegationHistory = () => {
  const unixTime = useUnixTimestamp()
  const epoch = currentEpoch(new BN(unixTime)).toNumber()
  const mobileEpochs: any[] = []
  const iotEpochs: any[] = []

  const epochsSinceMigration = epoch - 19467
  for (let offset = 1; offset <= Math.min(epochsSinceMigration, 30); offset++) {
    if (epoch - offset >= 19467) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      mobileEpochs.push(useSubDaoEpochInfo(MOBILE_MINT, offset))
      // eslint-disable-next-line react-hooks/rules-of-hooks
      iotEpochs.push(useSubDaoEpochInfo(IOT_MINT, offset))
    }
  }

  const isReady =
    mobileEpochs.every((epoch) => epoch.loading === false && !!epoch.info) &&
    iotEpochs.every((epoch) => epoch.loading === false && !!epoch.info)

  const getCleanedDate = () => {
    if (!isReady) return []

    return mobileEpochs
      .map((mEpoch, index) => {
        const iotInfo = iotEpochs[index].info
        const mobileInfo = mEpoch.info
        const date = new Date(amountAsNum(mobileInfo.epoch, 0) * ONE_DAY_MS)

        const mobileDelegated = veHntWoDecimal(
          mobileInfo.vehntAtEpochStart.toString()
        )
        const iotDelegated = veHntWoDecimal(
          iotInfo.vehntAtEpochStart.toString()
        )
        const percentIot =
          (iotDelegated / (mobileDelegated + iotDelegated)) * 100
        return {
          iotDelegated,
          mobileDelegated,
          percentIot,
          date,
        }
      })
      .reverse()
  }

  return (
    <div>
      <h2 className="flex-1 text-lg text-zinc-600 dark:text-zinc-100">
        Delegated HNT
      </h2>
      <div className="w-50 h-64">
        {isReady && (
          <ResponsiveContainer width="100%" height={256}>
            <LineChart width={300} height={100} data={getCleanedDate()}>
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
              />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => format(date, DATE_FORMAT)}
              />
              <Line
                type="monotone"
                dataKey="percentIot"
                stroke="#474DFF"
                strokeWidth={2}
                dot={false}
                yAxisId="percentIot"
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
        )}
      </div>
    </div>
  )
}
