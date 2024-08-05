import {
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  MoonIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { useState } from "react"
import { HotspotProviders } from "./HotspotProviders"
import { ThemeToggle } from "./ThemeToggle"

const Divider = () => (
  <div className="w-full border-t border-[#898C8F] opacity-50" />
)

const SettingsMain = ({
  close,
  setSetting,
}: {
  close: () => void
  setSetting: (settingValue: string) => void
}) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Cog6ToothIcon className="h-8 w-8 stroke-white dark:stroke-[#DBE0E6]" />
          <p className="text-lg font-medium text-white">Settings</p>
        </div>
        <button onClick={close}>
          <XMarkIcon className="h-8 w-8 stroke-white transition hover:stroke-zinc-700 dark:stroke-[#DBE0E6] hover:dark:stroke-zinc-100" />
        </button>
      </div>
      <Divider />
      <button
        className="group flex w-full items-center justify-between"
        onClick={() => setSetting("provider")}
      >
        <div className="flex items-center gap-2">
          <ArrowTopRightOnSquareIcon className="h-6 w-6 stroke-white dark:stroke-[#DBE0E6] group-hover:dark:stroke-zinc-100" />
          <p className="text-base font-medium text-white group-hover:text-neutral-100">
            Third-Party Explorer
          </p>
        </div>
        <ChevronRightIcon className="h-6 w-6 stroke-white transition group-hover:stroke-zinc-700 dark:stroke-[#F2F2F2] group-hover:dark:stroke-zinc-100" />
      </button>
      <Divider />
      <button
        className="group flex w-full items-center justify-between"
        onClick={() => setSetting("theme")}
      >
        <div className="flex items-center gap-2">
          <MoonIcon className="h-6 w-6 stroke-white dark:stroke-[#DBE0E6] group-hover:dark:stroke-zinc-100" />
          <p className="text-base font-medium text-white group-hover:text-neutral-100">
            Mode
          </p>
        </div>
        <ChevronRightIcon className="h-6 w-6 stroke-white transition group-hover:stroke-zinc-700 dark:stroke-[#F2F2F2] group-hover:dark:stroke-zinc-100" />
      </button>
    </>
  )
}

export const Settings = ({ close }: { close: () => void }) => {
  const [setting, setSetting] = useState("main")
  return (
    <div className="flex w-[428px] flex-col gap-3 rounded-xl bg-[#131313]/60 px-8 py-6">
      {setting === "main" && (
        <SettingsMain close={close} setSetting={setSetting} />
      )}
      {setting !== "main" && (
        <>
          <button onClick={() => setSetting("main")}>
            <ChevronLeftIcon className="h-8 w-8 stroke-white transition hover:stroke-zinc-700 dark:stroke-[#F2F2F2] hover:dark:stroke-zinc-100" />
          </button>
          {setting === "provider" && <HotspotProviders />}
          {setting === "theme" && <ThemeToggle />}
        </>
      )}
    </div>
  )
}
