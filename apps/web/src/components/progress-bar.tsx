"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useSpring,
} from "motion/react";
import Link, { type LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  Suspense,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface ProgressContextType {
  state: "initial" | "in-progress" | "completing" | "complete";
  value: ReturnType<typeof useSpring>;
  start: () => void;
  done: () => void;
  reset: () => void;
}

const ProgressBarContext = createContext<ProgressContextType | null>(null);

export function useProgressBar() {
  const progress = useContext(ProgressBarContext);

  if (progress === null) {
    throw new Error("Need to be inside provider");
  }

  return progress;
}

interface ProgressBarProps {
  className: string;
  children: ReactNode;
}

export function ProgressBar({ className, children }: ProgressBarProps) {
  const progress = useProgress();
  const width = useMotionTemplate`${progress.value}%`;

  return (
    <ProgressBarContext.Provider value={progress}>
      <Suspense fallback={null}>
        <ProgressBarRouteComplete progress={progress} />
      </Suspense>
      <AnimatePresence onExitComplete={progress.reset}>
        {progress.state !== "complete" && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className={className}
          />
        )}
      </AnimatePresence>
      {children}
    </ProgressBarContext.Provider>
  );
}

type ProgressBarLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

export function ProgressBarLink({
  href,
  children,
  onClick,
  ...props
}: ProgressBarLinkProps) {
  const progress = useProgressBar();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (shouldStartProgress(event, href, props.target, props.download)) {
      progress.start();
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

function ProgressBarRouteComplete({
  progress,
}: {
  progress: ProgressContextType;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const previousRouteKey = useRef(routeKey);

  useEffect(() => {
    if (previousRouteKey.current === routeKey) {
      return;
    }

    previousRouteKey.current = routeKey;
    progress.done();
  }, [progress, routeKey]);

  return null;
}

function shouldStartProgress(
  event: MouseEvent<HTMLAnchorElement>,
  href: ProgressBarLinkProps["href"],
  target?: string,
  download?: unknown
) {
  if (
    event.defaultPrevented ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0 ||
    target === "_blank" ||
    download
  ) {
    return false;
  }

  if (typeof href !== "string") {
    return true;
  }

  if (href.startsWith("#")) {
    return false;
  }

  try {
    const url = new URL(href, window.location.href);

    if (url.origin !== window.location.origin) {
      return false;
    }

    return (
      `${url.pathname}${url.search}` !==
      `${window.location.pathname}${window.location.search}`
    );
  } catch {
    return false;
  }
}

function useProgress() {
  const [state, setState] = useState<
    "initial" | "in-progress" | "completing" | "complete"
  >("initial");

  const value = useSpring(0, {
    damping: 25,
    mass: 0.5,
    stiffness: 300,
    restDelta: 0.1,
  });

  useInterval(
    () => {
      // If we start progress but the bar is currently complete, reset it first.
      if (value.get() === 100) {
        value.jump(0);
      }

      const current = value.get();

      let diff;
      if (current === 0) {
        diff = 15;
      } else if (current < 50) {
        diff = rand(1, 10);
      } else {
        diff = rand(1, 5);
      }

      value.set(Math.min(current + diff, 99));
    },
    state === "in-progress" ? 750 : null
  );

  useEffect(() => {
    if (state === "initial") {
      value.jump(0);
    } else if (state === "completing") {
      value.set(100);
    }

    return value.on("change", (latest) => {
      if (latest === 100) {
        setState("complete");
      }
    });
  }, [value, state]);

  function reset() {
    setState("initial");
  }

  function start() {
    setState("in-progress");
  }

  function done() {
    setState((state) =>
      state === "initial" || state === "in-progress" ? "completing" : state
    );
  }

  return { state, value, start, done, reset };
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      tick();

      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
