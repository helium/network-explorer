import clsx from "clsx"
import { PropsWithChildren } from "react"

type InfoCardProps = {
  reducedPadding?: boolean
  active?: boolean
  isLast?: boolean
}

export const InfoCard = ({
  children,
  reducedPadding,
  active = false,
  isLast = false,
}: PropsWithChildren<InfoCardProps>) => (
  <>
    <div
      className={clsx(
        "flex flex-col items-center justify-center rounded-xl font-sans sm:bg-[#131313]/30 sm:backdrop-blur",
        reducedPadding ? "p-1" : "gap-4 p-[20px]",
        active ? "sm:bg-[#131313]/50" : "sm:bg-[#131313]/25"
      )}
    >
      {children}
    </div>
    {!isLast && (
      <div className="mx-5 border-b-2 border-[#6E6E6E]/50 sm:hidden" />
    )}
  </>
)

// to be used in tandem with reducedPadding
export const InfoCardBody = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={clsx("flex w-full flex-col gap-4 px-5 pb-5 pt-1", "sm:px-5")}
    >
      {children}
    </div>
  )
}
