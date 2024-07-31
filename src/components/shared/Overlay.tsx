import { Dialog, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment, PropsWithChildren, useCallback } from "react"

type OverlayProps = {
  isOpen: boolean
  setIsOpen: (bool: boolean) => void
}

export const Overlay = ({
  children,
  isOpen,
  setIsOpen,
}: PropsWithChildren<OverlayProps>) => {
  const closeOverlay = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      appear
      afterLeave={closeOverlay}
    >
      <Dialog as="div" className="relative z-50" onClose={closeOverlay}>
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
                "transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-opacity-80 shadow-2xl backdrop-blur transition-all dark:divide-opacity-20 dark:bg-gray-900/70 dark:bg-opacity-100"
              )}
            >
              <p>{children}</p>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
