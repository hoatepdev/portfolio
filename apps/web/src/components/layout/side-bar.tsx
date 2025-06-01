"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { MdExpandMore } from "react-icons/md";

import IconBox from "@/components/icon-box";
import Footer from "@/components/layout/footer";
import config from "@/config";
import { useResponsiveImageSize } from "@/hooks/use-responsive-image-size";
import { breakpoints } from "@/lib/constants";
import "@/styles/side-bar.css";
import type { Contact, SocialLink } from "@/types/config";

const { socialLinks, contacts } = config;

interface SideBarProps {
  avatar: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  status: string[];
  contacts?: Contact[];
  socialLinks?: SocialLink[];
}

function SideBar({
  avatar,
  firstName,
  lastName,
  middleName,
  preferredName,
  status,
  contacts: propContacts = contacts,
  socialLinks: propSocialLinks = socialLinks,
}: SideBarProps) {
  const [isActive, setIsActive] = useState(false);
  const sideBarRef = useRef<HTMLDivElement>(null);
  const imageSize = useResponsiveImageSize(breakpoints);

  const handleSidebarToggle = () => setIsActive((prev) => !prev);
  const sideBarState = `sidebar${isActive ? " active" : ""}`;

  const randomTwoStatus = useMemo(
    () =>
      status
        ?.sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map((s, index) => (
          <p key={index} className="title">
            {s}
          </p>
        )),
    [status]
  );

  return (
    <aside className={sideBarState} ref={sideBarRef} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <Image
            id={`${firstName} (${preferredName}) ${lastName}`}
            src={avatar}
            alt={`${firstName} (${preferredName}) ${lastName}`}
            width={imageSize.width}
            height={imageSize.height}
            quality={100}
            loading="eager"
            priority
          />
        </figure>
        <div className="info-content">
          <div className="name-container">
            <h1
              className="name"
              title={`${firstName} (${preferredName}) ${lastName}`}
            >
              {firstName} <span>({preferredName})</span> {lastName}
            </h1>
            <p className="subname">({preferredName})</p>
          </div>
          <div className="status-container">{randomTwoStatus}</div>
        </div>
        <button
          className="info-more-btn"
          onClick={handleSidebarToggle}
          data-sidebar-btn
        >
          <span>Show Contacts</span>
          <MdExpandMore />
        </button>
      </div>
      <div className="sidebar-info-more">
        <div className="separator"></div>
        <ul className="contacts-list">
          {propContacts.map(({ icon: Icon, title, content, link }, index) => (
            <li key={index} className="flex min-w-full items-center gap-4">
              <IconBox icon={Icon} />
              <div className="contact-info">
                <p className="text-light-gray-70 mb-1 text-xs uppercase">
                  {title}
                </p>
                {link ? (
                  <Link
                    href={link}
                    className="hover:text-orange-yellow-crayola text-white-2 block truncate text-sm font-light transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </Link>
                ) : (
                  <span className="text-white-2 block truncate text-sm font-light">
                    {content}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="separator-no-line"></div>
        <ul className="flex items-center justify-center gap-4 pb-1 pl-2">
          {propSocialLinks.map(({ url, icon: Icon, name }) => (
            <li
              key={name}
              className="text-light-gray-70 hover:text-orange-yellow-crayola text-lg hover:scale-110"
            >
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
              >
                <Icon />
              </Link>
            </li>
          ))}
        </ul>
        <div className="separator-footer"></div>
        <Footer />
      </div>
    </aside>
  );
}

export default SideBar;
