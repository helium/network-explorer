import { Dialog, Transition } from "@headlessui/react"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Fragment, useCallback, useState } from "react"
import { Settings } from "../Settings/Settings"

export const SettingsTrigger = () => {
  const [open, setOpen] = useState(false)
  const closeSettings = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div className="absolute bottom-6 left-6 flex h-10 w-10 items-center justify-center rounded-xl bg-[#131313]/60">
      <button onClick={() => setOpen(true)}>
        <Cog6ToothIcon className="h-6 w-6 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
      </button>
      <Transition.Root
        show={open}
        as={Fragment}
        appear
        afterLeave={closeSettings}
      >
        <Dialog as="div" className="relative z-50" onClose={closeSettings}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4 sm:p-6 md:p-24">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden bg-opacity-80 shadow-2xl transition-all dark:divide-opacity-20 dark:bg-gray-900 dark:bg-opacity-100"
                )}
              >
                <Settings close={closeSettings} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
