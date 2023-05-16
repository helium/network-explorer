import clsx from "clsx"
import { PropsWithChildren } from "react"
import { DelegationHistory } from "./DelegationHistory"
import { GovernanceMetrics } from "./GovernanceMetrics"

const GovernanceItem = ({
  children,
  label,
}: PropsWithChildren<{ label: string }>) => {
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

export const Governance = async () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg text-zinc-600 dark:text-zinc-100">Governance</h2>
      <GovernanceItem label="Delegation History (30 days)">
        {/* @ts-expect-error Async Server Component */}
        <DelegationHistory />
      </GovernanceItem>
      <GovernanceItem label="Delegation Stats">
        {/* @ts-expect-error Async Server Component */}
        <GovernanceMetrics />
      </GovernanceItem>
    </div>
  )
}
