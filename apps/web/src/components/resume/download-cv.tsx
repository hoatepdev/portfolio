import { ChevronRight } from "lucide-react";
import Link from "next/link";

import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";

function DownloadCV() {
  return (
    <div className="z-10 mb-5 mt-5 flex items-center justify-center">
      <Link href="/cv" target="_blank" rel="noopener noreferrer">
        <AnimatedGradientText>
          📑 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
            )}
          >
            Download Hugo's full CV
          </span>
          <ChevronRight className="text-white-1 ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
      </Link>
    </div>
  );
}

export default DownloadCV;
