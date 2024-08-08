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
      className={clsx(
        isAbsolute &&
          "absolute right-6 top-[200px] flex h-10 w-10 items-center justify-center rounded-xl bg-[#131313]/60 backdrop-blur"
      )}
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
