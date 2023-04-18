/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from "next/script"

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID
export const IS_PROD = process.env.NODE_ENV === "production"

export const GAScript = () => {
  if (!GA_ID || !IS_PROD) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        strategy="afterInteractive"
        id="ga"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      `,
        }}
      />
    </>
  )
}
