import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Script from "next/script";

import { roboto } from "@/app/fonts";
import "@/app/globals.css";
import { WebVitals } from "@/components/web-vitals";
import config from "@/config";
import type { JsonLdHtml } from "@/types/json-ld";

const { googleAnalyticId, googleTagManagerId, jsonLdPerson, homeMetaData } =
  config;

export const metadata: Metadata = homeMetaData;

const addJsonLd = (): JsonLdHtml => {
  return {
    __html: JSON.stringify(jsonLdPerson, null, 2),
  };
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <WebVitals gaId={googleAnalyticId} />
        {children}
        <Script
          id="application/ld+json"
          type="application/ld+json"
          dangerouslySetInnerHTML={addJsonLd()}
          key="hoatepdev-website-jsonld"
        />
        <Analytics />
        <GoogleAnalytics gaId={googleAnalyticId} />
        <GoogleTagManager gtmId={googleTagManagerId} />
      </body>
    </html>
  );
}
