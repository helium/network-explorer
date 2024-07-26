import clsx from "clsx"

export type RssiStrength = "strong" | "medium" | "low" | number

export type RssiPillProps = {
  strength: RssiStrength
  isCircle?: boolean
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
}

export const RssiPill = ({ strength, isCircle = false }: RssiPillProps) => {
  return (
    <div
      className={clsx(
        "h-2.5 w-4 rounded-lg",
        isCircle ? "w-2.5" : "w-4",
        getRssiColor(strength)
      )}
    />
  )
}
