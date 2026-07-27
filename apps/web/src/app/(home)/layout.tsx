import Hello from "@/components/hello";
import HomeHeader from "@/components/layout/home-header";
import SideBar from "@/components/layout/side-bar";
import { ProgressBar } from "@/components/progress-bar";
import ParticleBackground from "@/components/ui/particle-background";
import config from "@/config";

const { about, avatar, status, navigationLinks } = config;

const { firstName, lastName, middleName, preferredName } = about;

function HomeLayout({ children }: { readonly children: React.ReactNode }) {
  return (
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
  );
}

export default HomeLayout;
