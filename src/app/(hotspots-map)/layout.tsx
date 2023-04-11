import { HotspotsMap } from "@/components/HotspotsMap"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HotspotsMap>{children}</HotspotsMap>
}
