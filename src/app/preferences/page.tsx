import { PreferencesProvider } from "@/context/usePreferences"
import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import Link from "next/link"
import { ExitButton } from "./components/ExitButton"
import { ProviderList } from "./components/ProviderList"
import { ConditionalThemeToggle, ThemeToggle } from "./components/ThemeToggle"

export default function Page() {
  return (
    <div
      className={clsx(
        "absolute inset-0 top-0 z-50 flex w-auto items-center justify-center gap-4 border-t p-6 text-sm font-medium backdrop-blur-sm",
        "border-zinc-900/5 bg-gray-100/30 text-zinc-800",
        "dark:border-white/10 dark:bg-slate-800/30 dark:text-zinc-200"
      )}
    >
      <div
        className={clsx(
          "min-w-[80%] flex-col rounded-xl border p-2 p-4 sm:min-w-[33%]",
          "border-zinc-900/5 bg-white text-zinc-800 shadow",
          "dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
        )}
      >
        <div className="flex w-full items-center gap-3">
          <h1 className="flex-1 text-xl">Preferences</h1>
          <Link href="/">
            <XMarkIcon className="h-6 w-6 text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 hover:dark:text-zinc-100" />
          </Link>
        </div>
        <PreferencesProvider>
          <div className="py-4">
            <div>
              <h2 className="text-sm">Hotspot Analytics Provider</h2>
              <ProviderList />
            </div>
            <ConditionalThemeToggle>
              <div>
                <h2 className="text-sm">Theme</h2>
                <ThemeToggle />
              </div>
            </ConditionalThemeToggle>
          </div>
          <div className="flex justify-end gap-4">
            <ExitButton />
          </div>
        </PreferencesProvider>
      </div>
    </div>
  )
}
