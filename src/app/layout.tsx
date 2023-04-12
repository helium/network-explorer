import { Header } from "@/components/Header"
import { Providers } from "@/components/Providers"
import "@/styles/tailwind.css"
import "focus-visible"

export const metadata = {
  manifest: "/manifest.json",
  themeColor: "#000000",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "64x64 32x32 24x24 16x16",
      },
      {
        url: "/logo192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/logo512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
  openGraph: {
    title: "Helium Explorer",
    description:
      "Helium Explorer is an open source network explorer for the Helium network",
    url: "https://explorer.helium.com",
    siteName: "Helium Explorer",
    images: [
      {
        url: "/og.png",
        width: 954,
        height: 696,
      },
    ],
    locale: "en-US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen bg-zinc-50 dark:bg-black">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
