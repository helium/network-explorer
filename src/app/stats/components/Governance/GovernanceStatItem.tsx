import clsx from "clsx"
import { PropsWithChildren } from "react"
import { ToolTipProps, Tooltip } from "../Tooltip"

type StatItemValue = { label: string; value: string }

type GovernanceStatItemProps = {
  header: string
  values: StatItemValue[]
  tooltip?: ToolTipProps
}

export const GovernanceStatItem = ({
  header,
  values,
  tooltip,
}: PropsWithChildren<GovernanceStatItemProps>) => {
  return (
    <div
      className={clsx(
        "w-15 flex-1 flex-col justify-between gap-2 rounded-xl border p-4",
        "border-zinc-900/5 bg-white text-zinc-800 shadow",
        "dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
      )}
    >
      <div className="flex justify-between">
        <p className="text-base">{header}</p>
        {!!tooltip && <Tooltip {...tooltip} />}
      </div>
      {values.map(({ label, value }) => {
        return (
          <div key={label} className={"flex items-center justify-between"}>
            <p className="text-sm">{label}</p>
            <p className="text-sm">{value}</p>
          </div>
        )
      })}
    </div>
  )
}
