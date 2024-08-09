import { PropsWithChildren } from "react"

export const InfoCard = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col items-center justify-center gap-5 rounded-xl bg-[#131313]/60 p-[20px] font-sans backdrop-blur">
    {children}
  </div>
)
