import { InfoCard } from "@/components/shared/InfoCard"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

export const ExplorerOptions = () => {
  return (
    <InfoCard>
      <div className="flex w-full justify-start gap-3">
        <div className="flex h-6 w-6 items-center justify-center">
          <ArrowTopRightOnSquareIcon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-base font-medium leading-5 text-neutral-200">
            Open in Third-Party Explorer
          </p>
          <p className="text-sm leading-5 text-neutral-400">
            You haven&apos;t set this up yet
          </p>
        </div>
      </div>
    </InfoCard>
  )
}
