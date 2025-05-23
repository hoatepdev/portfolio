import React from "react";

import type { Metadata } from "next";

import PageHeader from "@/components/page-header";
import ResumeSection from "@/components/section/resume";

import type { ResumeSection as ResumeSectionType } from "@/types/resume";

import config from "@/config";

const { title, resumes } = config;

export const metadata: Metadata = {
  title: `Resume | ${title}`,
};

export default function Resume() {
  return (
    <article>
      <PageHeader header="Hugo's Resume" />
      {(Object.entries(resumes) as [string, ResumeSectionType][]).map(
        ([key, resumeSection]) => (
          <ResumeSection
            key={key}
            icon={resumeSection.icon}
            title={resumeSection.title}
            timeLines={resumeSection.timeLines}
            resumeCategory={key}
          />
        ),
      )}
    </article>
  );
}
