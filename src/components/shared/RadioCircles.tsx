import clsx from "clsx"

type RadioCirclesProps = {
  isActive: boolean
}

export const RadioCircles = ({ isActive }: RadioCirclesProps) => (
  <div
    className={clsx(
      "flex items-center justify-center rounded-full border p-0.5 transition",
      isActive ? "border-white" : "border-[#E8EAED]"
    )}
  >
    <div className={clsx("h-3 w-3 rounded-full ", isActive && "bg-white")} />
  </div>
)
