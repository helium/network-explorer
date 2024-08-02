import { Overlay } from "@/components/shared/Overlay"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { useCallback, useState } from "react"
import { Settings } from "../Settings/Settings"

export const SettingsTrigger = () => {
  const [isOpen, setIsOpen] = useState(false)
  const closeSettings = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <div className="absolute bottom-6 left-6 flex h-10 w-10 items-center justify-center rounded-xl bg-[#131313]/60 backdrop-blur">
      <button onClick={() => setIsOpen(true)}>
        <Cog6ToothIcon className="h-6 w-6 stroke-neutral-200 transition hover:stroke-zinc-700 dark:stroke-zinc-400 hover:dark:stroke-zinc-100" />
      </button>
      <Overlay isOpen={isOpen} setIsOpen={setIsOpen}>
        <Settings close={closeSettings} />
      </Overlay>
    </div>
  )
}
