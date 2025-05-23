"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ProgressBarLink } from "@/components/progress-bar";
import { BlurFade } from "@/components/magicui/blur-fade";
import type { NavigationLink } from "@/types/nav-bar";

import "@/styles/nav-bar.css";

interface HomeHeaderProps {
  navigationLinks: NavigationLink[];
}

function HomeHeader({ navigationLinks }: HomeHeaderProps) {
  const currentPath = usePathname();

  const isActive = (path: string) => {
    if (path === "/post" && currentPath.startsWith("/post")) return true;
    else if (path === "/portfolio" && currentPath.startsWith("/portfolio"))
      return true;
    return currentPath === path;
  };

  return (
    <header className="navbar">
      <BlurFade direction="up">
        <ul className="navbar-list">
          {navigationLinks.map((item) => (
            <li className="navbar-item" key={item.path}>
              <ProgressBarLink
                href={item.path}
                className={`navbar-link text-light-gray ${isActive(item.path) ? "active" : ""}`}
              >
                {item.label}
              </ProgressBarLink>
            </li>
          ))}
        </ul>
      </BlurFade>
    </header>
  );
}

export default HomeHeader;
