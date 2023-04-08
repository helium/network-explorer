import Header from "@/components/Header"
import "focus-visible"
import "../styles/tailwind.css"

type Props = {
  children: React.ReactNode
}

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
      "Helium Explorer is an open source block explorer providing detailed blockchain data from the Helium network",
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

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className="h-screen bg-zinc-50 dark:bg-black">
        <Header />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
