import { ThemeToggle } from "@/app/preferences/components/ThemeToggle"
import { PreferencesProvider } from "@/context/usePreferences"
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

const Divider = () => <div className="w-full border-t border-neutral-400" />

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
          <Cog6ToothIcon className="h-8 w-8 stroke-neutral-200 dark:stroke-zinc-400" />
          <p className="text-lg font-medium text-neutral-200">Settings</p>
        </div>
        <button onClick={close}>
          <XMarkIcon className="h-8 w-8 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
        </button>
      </div>
      <Divider />
      <button
        className="flex w-full justify-between"
        onClick={() => setSetting("provider")}
      >
        <div className="flex items-center gap-2">
          <ArrowTopRightOnSquareIcon className="h-6 w-6 stroke-neutral-200 dark:stroke-zinc-400" />
          <p className="text-base font-medium text-neutral-200">
            Third-Party Explorer
          </p>
        </div>
        <ChevronRightIcon className="h-6 w-6 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
      </button>
      <Divider />
      <button
        className="flex w-full justify-between"
        onClick={() => setSetting("theme")}
      >
        <div className="flex items-center gap-2">
          <MoonIcon className="h-6 w-6 stroke-neutral-200 dark:stroke-zinc-400" />
          <p className="text-base font-medium text-neutral-200">Mode</p>
        </div>
        <ChevronRightIcon className="h-6 w-6 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
      </button>
    </>
  )
}

export const Settings = ({ close }: { close: () => void }) => {
  const [setting, setSetting] = useState("main")
  return (
    <PreferencesProvider>
      <div className="flex w-[428px] flex-col gap-3 rounded-xl bg-[#131313]/60 px-8 py-6">
        {setting === "main" && (
          <SettingsMain close={close} setSetting={setSetting} />
        )}
        {setting !== "main" && (
          <>
            <button onClick={() => setSetting("main")}>
              <ChevronLeftIcon className="h-8 w-8 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
            </button>
            {setting === "provider" && <HotspotProviders />}
            {setting === "theme" && <ThemeToggle />}
          </>
        )}
      </div>
    </PreferencesProvider>
  )
}
