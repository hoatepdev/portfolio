import React from "react";
import { LuMapPin, LuZap } from "react-icons/lu";

import Globe from "@/components/about/globe";
import { Marquee } from "@/components/about/marquee";
import { BlurFade } from "@/components/magicui/blur-fade";
import AboutSection from "@/components/section/about";
import "@/styles/about/coding-stats.css";
import type { VCardIconType } from "@/types/config";

import GithubCalendar from "./github-calendar";

interface TechStack {
  name: string;
  icon: VCardIconType;
}

interface TechStacks {
  programmingLanguages: TechStack[];
  frameworks: TechStack[];
}

interface CodingStatsProps {
  techStacks: TechStacks;
  githubUsername: string;
}

function CodingStats({ techStacks, githubUsername }: CodingStatsProps) {
  return (
    <AboutSection id="coding-stats" title="Coding Stats">
      <BlurFade inView delay={0.4} direction="left">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-5">
          <div className="coding-item shadow-shadow-2 bg-gradient-onyx relative rounded-2xl before:absolute before:rounded-2xl before:content-['']">
            <div className="shadow-feature-card dark:shadow-feature-card-dark flex flex-col gap-2 overflow-hidden rounded-xl p-2">
              <div className="text-white-2 flex items-center gap-2">
                <LuZap size={18} />
                <h2 className="text-sm font-light">Stacks</h2>
              </div>
              <Marquee gap="20px" className="py-2" fade pauseOnHover>
                {techStacks.programmingLanguages.map((stack) => (
                  <stack.icon
                    key={stack.name}
                    className="text-white-2 hover:text-orange-yellow-crayola size-10 hover:scale-110"
                  />
                ))}
              </Marquee>
              <Marquee gap="20px" className="py-2" reverse fade pauseOnHover>
                {techStacks.frameworks.map((stack) => (
                  <stack.icon
                    key={stack.name}
                    className="text-white-2 hover:text-orange-yellow-crayola size-10 duration-300 hover:scale-110"
                  />
                ))}
              </Marquee>
            </div>
          </div>

          <div className="coding-item shadow-shadow-2 bg-gradient-onyx relative h-[200px] rounded-2xl before:absolute before:rounded-2xl before:content-[''] md:h-auto">
            <div className="absolute inset-x-0 bottom-[-190px] mx-auto aspect-square h-[388px] [@media(max-width:420px)]:bottom-[-140px] [@media(max-width:420px)]:h-[320px] [@media(min-width:768px)_and_(max-width:858px)]:h-[380px]">
              <div className="text-white-2 ml-4 mt-4 flex items-center gap-2">
                <LuMapPin size={18} />
                <h2 className="text-sm font-light">
                  HaNoi, Vietnam (UTC +07:00)
                </h2>
              </div>
              <Globe />
            </div>
          </div>
        </div>
      </BlurFade>

      <BlurFade inView delay={0.4} direction="up">
        <GithubCalendar githubUsername={githubUsername} />
      </BlurFade>
    </AboutSection>
  );
}

export default CodingStats;
