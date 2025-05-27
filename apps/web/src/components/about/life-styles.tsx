import { BlurFade } from "@/components/magicui/blur-fade";
import AboutSection from "@/components/section/about";
import GradientCard from "@/components/ui/gradient-card";
import type { LifeStyle } from "@/types/about";

interface LifeStylesProps {
  lifestyles: LifeStyle[];
}

function LifeStyles({ lifestyles }: LifeStylesProps) {
  return (
    <AboutSection id="life-styles" title="Life Styles">
      <BlurFade inView delay={0.4} direction="up">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {lifestyles.map((lifestyle: LifeStyle, index) => (
            <GradientCard key={lifestyle.title || index}>
              <div className="mb-2.5 flex items-center justify-center sm:mb-0 sm:mt-2">
                <lifestyle.icon
                  className="text-orange-yellow-crayola"
                  size={24}
                />
              </div>

              <div className="text-center sm:text-left">
                <h4 className="text-white-2 mb-[7px] text-lg font-bold">
                  {lifestyle.title}
                </h4>
                <p className="text-light-gray text-sm font-light leading-6">
                  {lifestyle.text}
                </p>
              </div>
            </GradientCard>
          ))}
        </div>
      </BlurFade>
    </AboutSection>
  );
}

export default LifeStyles;
