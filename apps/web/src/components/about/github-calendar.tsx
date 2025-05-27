"use client";

import debounce from "lodash/debounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeInput } from "react-activity-calendar";
import GitHubCalendar from "react-github-calendar";

interface GithubCalendarProps {
  githubUsername: string;
}

const GithubCalendar = ({ githubUsername }: GithubCalendarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const yellowTheme: ThemeInput = {
    light: ["#EBEBEB", "#FFDA6B"],
    dark: ["#383838", "#FFDA6B"],
  };

  const calendarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const debouncedScroll = debounce(() => {
      const scrollContainer = calendarRef.current?.firstChild;
      if (scrollContainer instanceof HTMLElement) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth;
      }
    }, 50);

    window.addEventListener("resize", debouncedScroll);
    return () => window.removeEventListener("resize", debouncedScroll);
  }, [isMounted]);

  const refCallback = useCallback(
    (calendar: HTMLElement) => {
      if (!calendar || !isMounted) return;
      calendarRef.current = calendar;
      if (calendar.firstChild instanceof HTMLElement) {
        calendar.firstChild.scrollLeft = calendar.firstChild.scrollWidth;
      }
    },
    [isMounted]
  );

  return (
    <section id="github-calendar" className="text-light-gray mt-5">
      {isMounted && (
        <GitHubCalendar
          ref={refCallback}
          username={githubUsername}
          blockSize={12}
          blockMargin={4}
          colorScheme="dark"
          blockRadius={2}
          fontSize={14}
          style={{
            fontWeight: "bold",
          }}
          hideColorLegend
          // hideTotalCount
          theme={yellowTheme}
        />
      )}
    </section>
  );
};

export default GithubCalendar;
