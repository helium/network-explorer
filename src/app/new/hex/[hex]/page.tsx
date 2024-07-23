import { HexOutlineIcon } from "@/components/icons/HexOutlineIcon"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export const metadata = {
  title: "Helium Hotspots Map - Hotspot Details",
}

type Params = {
  hex: string
}

const Divider = () => <div className="w-full border-t border-neutral-400" />

export default function Page({ params }: { params: Params }) {
  return (
    <div className="absolute left-6 top-24 w-80">
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-[#131313]/60 p-3">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <HexOutlineIcon stroke="#fff" />
            <p className="text-lg text-neutral-200">{params.hex}</p>
          </div>
          <Link href="/new" className="flex items-center">
            <XMarkIcon className="h-4 w-4 stroke-neutral-200 transition group-hover:stroke-zinc-700 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-100" />
          </Link>
        </div>
      </div>
    </div>
  )
}
