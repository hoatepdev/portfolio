"use client";

import { BriefcaseIcon, CalendarIcon, MapPin, School } from "lucide-react";
import Image from "next/image";

import "@/styles/skills-bar.css";
import type { TimeLine } from "@/types/resume";

interface ResumeCardProps {
  timeLine: TimeLine;
  resumeCategory: string;
}

export default function ResumeCard({
  timeLine,
  resumeCategory,
}: ResumeCardProps) {
  const { company } = timeLine;
  const { companyImage } = timeLine;
  const { title } = timeLine;
  const { employmentType } = timeLine;
  const { location } = timeLine;
  const { timePeriod } = timeLine;

  return (
    <section className="skill">
      <div className="skills-list content-card">
        <div className="flex flex-row items-center gap-4 p-6 pb-4">
          <div className="h-12 w-12 overflow-hidden rounded-md">
            <Image
              src={companyImage || "/favicon.ico"}
              alt={company}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/favicon.ico?height=40&width=40";
                e.currentTarget.onerror = null;
              }}
              width={40}
              height={40}
            />
          </div>
          <div className="space-y-1">
            <div className="text-white-1 font-semibold">{company}</div>
            <div className="text-light-gray text-sm">{title}</div>
          </div>
        </div>

        <div className="px-6 pb-2">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="text-orange-yellow-crayola inline-flex items-center gap-1 rounded-full border border-gray-700 px-2.5 py-0.5 text-xs font-medium">
              {/* 
              @todo Since the resume does not have fixed key definitions and allows users to define them, we need a field that can map these keys to icons based on the user's configuration.
              */}
              {resumeCategory === "educations" ? (
                <School className="h-3 w-3" />
              ) : resumeCategory === "experiences" ? (
                <BriefcaseIcon className="h-3 w-3" />
              ) : null}
              {employmentType}
            </span>
            <span className="text-orange-yellow-crayola inline-flex items-center gap-1 rounded-full border border-gray-700 px-2.5 py-0.5 text-xs font-medium">
              <MapPin className="h-3 w-3" />
              {location}
            </span>
            <span className="text-orange-yellow-crayola inline-flex items-center gap-1 rounded-full border border-gray-700 px-2.5 py-0.5 text-xs font-medium">
              <CalendarIcon className="h-3 w-3" />
              {timePeriod}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
