"use client"

/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from "next/script"

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID
export const IS_PROD = process.env.NODE_ENV === "production"

export const GAScript = () => {
  if (!GA_ID || !IS_PROD) return null

  return (
    <div>
      <Script
        id="gtag"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
        }}
      />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
    </div>
  )
}
