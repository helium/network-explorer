import { PropsWithChildren } from "react"

export const InfoCard = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-[#131313]/60 px-6 py-3 font-sans backdrop-blur">
    {children}
  </div>
)
