import clsx from "clsx"

export type RssiStrength = "strong" | "medium" | "low" | "coverage" | number

export type RssiPillProps = {
  strength: RssiStrength
  isCircle?: boolean
  isEmpty?: boolean
}

export const getRssiColor = (strength: RssiStrength) => {
  if (typeof strength === "number") {
    if (strength >= 90) strength = "strong"
    else if (strength >= 70) strength = "medium"
    else strength = "low"
  }

  if (strength === "strong") return "bg-[#FF4D00]"
  if (strength === "medium") return "bg-[#FFD600]"
  if (strength === "low") return "bg-[#01FFF0]"
  if (strength === "coverage")
    return "bg-gradient-to-r from-[#01FFF0] via-[#FFD600] to-[#FF4D00]"
}

export const RssiPill = ({
  strength,
  isCircle = false,
  isEmpty = false,
}: RssiPillProps) => {
  return (
    <div
      className={clsx(
        "h-2.5 w-4 rounded-lg",
        isCircle ? "w-2.5" : "w-4",
        !isEmpty ? getRssiColor(strength) : "border border-neutral-400"
      )}
    />
  )
}
