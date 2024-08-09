import clsx from "clsx"
import { PropsWithChildren } from "react"

type InfoCardProps = {
  reducedPadding?: boolean
  active?: boolean
}

export const InfoCard = ({
  children,
  reducedPadding,
  active = false,
}: PropsWithChildren<InfoCardProps>) => (
  <div
    className={clsx(
      "flex flex-col items-center justify-center rounded-xl bg-[#131313]/30 font-sans backdrop-blur",
      reducedPadding ? "p-1" : "gap-4 p-[20px]",
      active ? "bg-[#131313]/50" : "bg-[#131313]/25"
    )}
  >
    {children}
  </div>
)

// to be used in tandem with reducedPadding
export const InfoCardBody = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full flex-col gap-4 px-5 pb-5 pt-1">{children}</div>
  )
}
