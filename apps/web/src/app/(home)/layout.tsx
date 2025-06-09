import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Script from "next/script";

import { roboto } from "@/app/fonts";
import "@/app/globals.css";
import Hello from "@/components/hello";
import HomeHeader from "@/components/layout/home-header";
import SideBar from "@/components/layout/side-bar";
import { ProgressBar } from "@/components/progress-bar";
import ParticleBackground from "@/components/ui/particle-background";
import { WebVitals } from "@/components/web-vitals";
import config from "@/config";
import type { JsonLdHtml } from "@/types/json-ld";

const {
  googleAnalyticId,
  googleTagManagerId,
  about,
  avatar,
  status,
  navigationLinks,
  jsonLdPerson,
  homeMetaData,
} = config;

const { firstName, lastName, middleName, preferredName } = about;

export const metadata: Metadata = homeMetaData;

const addJsonLd = (): JsonLdHtml => {
  return {
    __html: JSON.stringify(jsonLdPerson, null, 2),
  };
};

function HomeLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <WebVitals gaId={googleAnalyticId} />
      <body>
        <ProgressBar className="fixed top-0 h-1 bg-yellow-500">
          <ParticleBackground />
          <Hello />
          <main>
            <SideBar
              avatar={avatar}
              firstName={firstName}
              lastName={lastName}
              middleName={middleName}
              preferredName={preferredName}
              status={status}
            />
            <div className="main-content">
              <HomeHeader navigationLinks={navigationLinks} />
              {children}
            </div>
          </main>
        </ProgressBar>
        <Script
          id="application/ld+json"
          type="application/ld+json"
          dangerouslySetInnerHTML={addJsonLd()}
          key="hoatepdev-website-jsonld"
        />
        <Analytics />
      </body>
      <GoogleAnalytics gaId={googleAnalyticId} />
      <GoogleTagManager gtmId={googleTagManagerId} />
    </html>
  );
}

export default HomeLayout;
