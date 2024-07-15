import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export const SettingsTrigger = () => {
  return (
    <div className="absolute bottom-6 left-6 flex h-10 w-10 items-center justify-center rounded-xl bg-[#131313]/60">
      <Link href="/preferences" className="group" aria-label="Preferences">
        <Cog6ToothIcon className="h-6 w-6 stroke-[#8B8B8B] transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
      </Link>
    </div>
  )
}
