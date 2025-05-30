import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { BlurFadeDemo } from "@/components/magicui/blur-fade-demo";
import PageHeader from "@/components/page-header";
import config from "@/config";
import { cn } from "@/lib/utils";

const { title } = config;

export const metadata: Metadata = {
  title: `Gallery | ${title}`,
};

function Gallery() {
  return (
    <article>
      <PageHeader header="Hugo's Gallery" />
      <BlurFadeDemo />
      <div className="z-10 mb-5 mt-5 flex items-center justify-center">
        <Link
          href="https://magicui.design/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AnimatedGradientText>
            📑 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `animate-gradient bg-linear-to-r bg-size-[var(--bg-size)_100%] inline from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-clip-text text-transparent`
              )}
            >
              Thanks for Magic UI!
            </span>
            <ChevronRight className="text-white-1 ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>
      </div>
    </article>
  );
}

export default Gallery;
