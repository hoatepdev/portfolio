import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "backdrop-blur-xs group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-black/40 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f]",
        className
      )}
    >
      <div
        className={`animate-gradient bg-linear-to-r bg-size-[var(--bg-size)_100%] mask-subtract! absolute inset-0 block h-full w-full rounded-[inherit] from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 p-px [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
      />

      {children}
    </div>
  );
}
