import { Overlay } from "@/components/shared/Overlay"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useCallback, useState } from "react"
import { Settings } from "../Settings/Settings"

type SettingsTriggerProps = {
  isAbsolute?: boolean
}

export const SettingsTrigger = ({
  isAbsolute = false,
}: SettingsTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeSettings = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <div
      className={
        isAbsolute
          ? clsx(
              "absolute flex h-10 w-10 items-center justify-center rounded-xl bg-[#131313]/60 backdrop-blur",
              "bottom-[72px] left-4",
              "sm:bottom-auto sm:left-auto sm:right-6 sm:top-[200px]"
            )
          : ""
      }
    >
      <button
        onClick={() => setIsOpen(true)}
        className="group rounded-lg p-1 transition hover:bg-[#8A8A8A]/20"
      >
        <Cog6ToothIcon className="h-6 w-6 stroke-white opacity-75 transition group-hover:opacity-75" />
      </button>
      <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
        <Settings close={closeSettings} />
      </Overlay>
    </div>
  )
}
