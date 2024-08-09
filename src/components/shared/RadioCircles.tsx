import clsx from "clsx"

type RadioCirclesProps = {
  isActive: boolean
}

export const RadioCircles = ({ isActive }: RadioCirclesProps) => (
  <div className="flex items-center justify-center rounded-full border border-white p-0.5">
    <div className={clsx("h-3 w-3 rounded-full ", isActive && "bg-white")} />
  </div>
)
