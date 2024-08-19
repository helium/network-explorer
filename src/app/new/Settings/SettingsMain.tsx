import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  MoonIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

export const SettingsMain = ({
  close,
  setSetting,
}: {
  close: () => void
  setSetting: (settingValue: string) => void
}) => {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="mb-11 flex justify-between pl-2">
        <div className="flex items-center gap-2">
          <Cog6ToothIcon className="h-6 w-6 stroke-white transition sm:hidden" />
          <p className="text-xl font-medium leading-8 text-white">Settings</p>
        </div>
        <button
          aria-label="Close"
          onClick={close}
          className="relative hidden rounded-lg p-2 transition hover:bg-[#8A8A8A]/20 sm:block"
        >
          <XMarkIcon className="h-8 w-8 stroke-white transition hover:stroke-zinc-700 dark:stroke-[#DBE0E6] hover:dark:stroke-zinc-100" />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <button
          className="group flex w-full items-center justify-between rounded-lg px-2 py-3 hover:bg-[#8A8A8A]/20"
          onClick={() => setSetting("provider")}
        >
          <div className="flex items-center gap-2">
            <ArrowTopRightOnSquareIcon className="h-6 w-6 stroke-[#DBE0E6]" />
            <p className="text-base font-medium text-[#DBE0E6]">
              Third-Party Explorer
            </p>
          </div>
          <ChevronRightIcon className="h-6 w-6 stroke-[#DBE0E6]" />
        </button>
        <button
          className="group flex w-full items-center justify-between rounded-lg px-2 py-3 hover:bg-[#8A8A8A]/20"
          onClick={() => setSetting("theme")}
        >
          <div className="flex items-center gap-2">
            <MoonIcon className="h-6 w-6 stroke-[#DBE0E6]" />
            <p className="text-base font-medium text-[#DBE0E6]">Mode</p>
          </div>
          <ChevronRightIcon className="h-6 w-6 stroke-[#DBE0E6]" />
        </button>
      </div>
    </div>
  )
}
