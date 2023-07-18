import clsx from "clsx"
import { PropsWithChildren, ReactNode } from "react"

export const GraphWrapper = ({
  children,
  label,
}: PropsWithChildren<{ label: string | ReactNode }>) => {
  return (
    <div
      className={clsx(
        "flex-col gap-2 rounded-xl border p-4",
        "border-zinc-900/5 bg-white text-zinc-800 shadow",
        "dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
      )}
    >
      <p className="pb-2 text-sm">{label}</p>
      {children}
    </div>
  )
}
