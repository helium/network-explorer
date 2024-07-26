import { PropsWithChildren } from "react"
import styles from "./InfoWrapper.module.css"

export const InfoWrapper = ({ children }: PropsWithChildren) => (
  <div
    className={`absolute left-6 top-24 w-80 ${styles.wrapper} overflow-auto rounded-xl`}
  >
    {children}
  </div>
)
