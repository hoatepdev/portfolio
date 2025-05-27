import { ChevronRight } from "lucide-react";
import Link from "next/link";

import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";

export async function AnimatedGradientTextDemo() {
  return (
    <div className="z-10 mt-5 flex items-center justify-center">
      <Link
        href="https://magicui.design/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Thanks for Magic UI!
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
      </Link>
    </div>
  );
}
