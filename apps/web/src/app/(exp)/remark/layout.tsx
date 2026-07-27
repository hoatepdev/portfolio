import type { Metadata } from "next";

import Hello from "@/components/hello";
import HomeHeader from "@/components/layout/home-header";
import SideBar from "@/components/layout/side-bar";
import { ProgressBar } from "@/components/progress-bar";
import config from "@/config";

const { title, description, about, avatar, status, navigationLinks } = config;

const { firstName, lastName, middleName, preferredName } = about;

export const metadata: Metadata = {
  title,
  description,
};

function RemarkLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <ProgressBar className="fixed top-0 h-1 bg-yellow-500">
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
  );
}

export default RemarkLayout;
