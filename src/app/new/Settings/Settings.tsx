import { ChevronLeftIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useState } from "react"
import { HotspotProviders } from "./HotspotProviders"
import { SettingsMain } from "./SettingsMain"
import { ThemeToggle } from "./ThemeToggle"

export const Settings = ({ close }: { close: () => void }) => {
  const [setting, setSetting] = useState("main")
  return (
    <div
      className={clsx(
        "flex flex-col gap-3 bg-[#131313]/50 p-6",
        "h-full w-full sm:h-auto sm:w-[428px] sm:rounded-xl"
      )}
    >
      {setting === "main" && (
        <SettingsMain close={close} setSetting={setSetting} />
      )}
      {setting !== "main" && (
        <>
          <div className="relative">
            <button
              onClick={() => setSetting("main")}
              className="rounded-lg p-1 hover:bg-[#8A8A8A]/20"
            >
              <ChevronLeftIcon className="h-10 w-10 stroke-[#F2F2F2]" />
            </button>
          </div>
          {setting === "provider" && <HotspotProviders />}
          {setting === "theme" && <ThemeToggle />}
        </>
      )}
    </div>
  )
}
