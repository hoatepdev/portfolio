import { Config } from "@/types/config";
import { Icons } from "@/components/icons";

import { PiMediumLogoBold } from "react-icons/pi";
import { Monitor, GraduationCap } from "lucide-react";
import { GoalIcon } from "@primer/octicons-react";
import {
  LuGithub,
  LuPencil,
  LuLinkedin,
  LuRss,
  LuMail,
  LuMapPin,
} from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaReact, FaAws } from "react-icons/fa";
import { AiOutlinePython } from "react-icons/ai";
import { RiJavaLine, RiJavascriptLine } from "react-icons/ri";
import { SiLatex, SiFastapi, SiKubernetes, SiPostman } from "react-icons/si";
import { BiLogoFlask } from "react-icons/bi";
import { VscTerminalLinux, VscAzure } from "react-icons/vsc";
import { DiRedis } from "react-icons/di";
import {
  TbBrandCpp,
  TbBrandTypescript,
  TbBrandGolang,
  TbBrandNextjs,
  TbBrandDjango,
  TbBrandDocker,
  TbBrandMysql,
  TbMarkdown,
  TbBrandAstro,
  TbBrandTerraform,
  TbPhotoSquareRounded,
} from "react-icons/tb";

const config: Config = {
  avatar: "/images/profile.webp",
  title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
  description:
    "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
  author: "Chun-Ho (Hugo) Lin - 1chooo",
  keywords: [
    "Hugo ChunHo Lin",
    "1chooo",
    "Software Engineering",
    "Next.js",
    "React",
  ],
  status: "Dive Deep. 🤿",
  siteURL: "https://www.1chooo.com",
  openGraph: {
    url: "https://www.1chooo.com/",
    type: "website",
    siteName: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
    title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
    description:
      "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
    images: [
      {
        url: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
        width: 1200,
        height: 630,
        alt: "Chun-Ho (Hugo) Lin - 1chooo Cover Image",
      },
    ],
  },
  navigationLinks: [
    { path: "/", label: "About" },
    { path: "/resume", label: "Resume" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/post", label: "Post" },
    { path: "/gallery", label: "Gallery" },
  ],
  contacts: [
    {
      icon: LuMapPin,
      title: "Location",
      content: "Los Angeles, CA 🇺🇸",
    },
    {
      icon: LuMail,
      title: "Email",
      link: "mailto:hugo970217@gmail.com",
      content: "hugo970217@gmail.com",
    },
    {
      icon: LuGithub,
      title: "GitHub",
      link: "https://github.com/1chooo",
      content: "@1chooo",
    },
    {
      icon: LuLinkedin,
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/1chooo/",
      content: "in/1chooo",
    },
  ],
  socialLinks: [
    {
      url: "https://github.com/1chooo",
      icon: LuGithub,
      name: "GitHub",
    },
    {
      url: "https://www.linkedin.com/in/1chooo/",
      icon: LuLinkedin,
      name: "LinkedIn",
    },
    {
      url: "https://medium.com/@1chooo",
      icon: PiMediumLogoBold,
      name: "Medium",
    },
    {
      url: "https://twitter.com/1chooo___",
      icon: FaXTwitter,
      name: "Twitter",
    },
    {
      url: `/rss.xml`,
      icon: LuRss,
      name: "RSS Feed",
    },
    {
      url: `/cv`,
      icon: Icons.Attachment,
      name: "CV",
    },
  ],
  homeMetaData: {
    metadataBase: new URL("https://www.1chooo.com"),
    title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
    description:
      "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
    authors: [{ name: "Chun-Ho (Hugo) Lin" }],
    creator: "Chun-Ho (Hugo) Lin",
    keywords: [
      "Chun-Ho (Hugo) Lin",
      "1chooo",
      "Software Engineering",
      "Next.js",
      "React",
    ],
    openGraph: {
      url: "https://www.1chooo.com/",
      type: "website",
      siteName: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
      title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
      description:
        "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
      images: [
        {
          url: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
          width: 1200,
          height: 630,
          alt: "Chun-Ho (Hugo) Lin - 1chooo Cover Image",
        },
      ],
    },
    manifest: "/manifest.json",
    twitter: {
      card: "summary_large_image",
      title: "Chun-Ho (Hugo) Lin - 1chooo | Open Source Enthusiast",
      description:
        "I'm Chun-Ho (Hugo) Lin, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
      images: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: [
        {
          url: "/logo192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
  },
  about: {
    firstName: "Chun-Ho",
    lastName: "Lin",
    middleName: "",
    preferredName: "Hugo",
    additionalName: "Hugo",
    pronouns: "He/Him",
    githubUsername: "1chooo",
    introduction: `
I'm an incoming student at [University of Southern California](https://usc.edu) ✌️. Previously, I obtained my Bachelor's degree from [National Central University](https://www.ncu.edu.tw/) 🐿️.

Software is built by humans. Unfortunately, humans make errors, ***LOTS of ERRORS 💣.*** Throughout human history, humans have learned to craft machines and tools to help us construct complex architecture. Inspired by this, I explore practical methodologies and tools to improve large-scale software systems' quality, reliability, and efficiency.

In my spare time, I focus on contributing to open-source projects, alongside working out 💪🏻, capturing street photography 📸, and writing tech content ✍🏻.
    `,
    lifestyles: [
      {
        icon: LuGithub,
        title: "Open Source",
        text: "Actively contributing to open source projects on GitHub.",
      },
      {
        icon: LuPencil,
        title: "Storytelling",
        text: "Love to share my knowledge and experience with others.",
      },
      {
        icon: GoalIcon,
        title: "Workouts",
        text: "Basketball and weight training defines my active workout lifestyle.",
      },
      {
        icon: TbPhotoSquareRounded,
        title: "Photography",
        text: "Sky brings freedom; streets, a reminder of others' contributions.",
      },
    ],
    techStacks: {
      programmingLanguages: [
        { name: "Python", icon: AiOutlinePython },
        { name: "TypeScript", icon: TbBrandTypescript },
        { name: "Golang", icon: TbBrandGolang },
        { name: "C++", icon: TbBrandCpp },
        { name: "Java", icon: RiJavaLine },
        { name: "JavaScript", icon: RiJavascriptLine },
        { name: "LaTeX", icon: SiLatex },
        { name: "Markdown", icon: TbMarkdown },
        { name: "Astro", icon: TbBrandAstro },
        { name: "Terraform", icon: TbBrandTerraform },
      ],
      frameworks: [
        { name: "React", icon: FaReact },
        { name: "FastAPI", icon: SiFastapi },
        { name: "Flask", icon: BiLogoFlask },
        { name: "Redis", icon: DiRedis },
        { name: "Linux Terminal", icon: VscTerminalLinux },
        { name: "AWS", icon: FaAws },
        { name: "Next.js", icon: TbBrandNextjs },
        { name: "Docker", icon: TbBrandDocker },
        { name: "MySQL", icon: TbBrandMysql },
        { name: "Django", icon: TbBrandDjango },
        { name: "Kubernetes", icon: SiKubernetes },
        { name: "Postman", icon: SiPostman },
        { name: "Azure", icon: VscAzure },
      ],
    },
  },
  resumes: {
    educations: {
      icon: GraduationCap,
      title: "Education",
      timeLines: [
        {
          company: "University of Southern California",
          companyImage: "/images/logos/usc.jpg",
          title: "Master of Science in Computer Science",
          employmentType: "Viterbi School of Engineering",
          location: "Los Angeles, CA 🇺🇸",
          timePeriod: "Aug. 2025 - Present",
          details: [],
        },
        {
          company: "National Central University",
          companyImage: "/images/logos/ncu.png",
          title: "Bachelors of Science in Atmospheric Sciences",
          employmentType: "College of Earth Sciences",
          location: "Taoyuan, Taiwan 🇹🇼",
          timePeriod: "Sep. 2020 - Jun. 2024",
          details: [
            "GPA: 3.8/4.3",
            "Relevant Courses: Data Structures, Algorithms, Database Systems, Software Engineering, Cloud Computing",
            "Projects: Developed a web application using React and Node.js, implemented a machine learning model for image classification, and created a cloud-based serverless application using AWS Lambda.",
            "Extracurricular Activities: Member of the Cloud Computing Club, participated in hackathons and coding competitions.",
          ],
        },
      ],
    },
    experiences: {
      icon: Monitor,
      title: "Professional Experiences",
      timeLines: [
        {
          company: "eCloudvalley Digital Technology",
          companyImage: "/images/logos/ecv.png",
          title: "Cloud Engineer",
          employmentType: "Intern",
          location: "New Taipei, Taiwan 🇹🇼",
          timePeriod: "Mar. 2024 - May. 2024",
          details: [
            "Led a team of 5 to enhance issue pools with AWS Bedrock, boosting cloud support efficiency by 80% through multi-language support and 95% accurate image recognition. Honored as the top-achieving internship team.",
            "Utilized a serverless architecture on AWS Lambda, performing troubleshooting with CloudWatch, deployed via AWS CDK, and integrated with DynamoDB and Bedrock services.",
            "Documented issues in 10+ mock cases, such as VPC entry failures, EC2 Apache server restarts, and S3 photo access problems, and provided detailed solutions for interns. Refer [here](https://github.com/1chooo/ecv-training-materials/tree/main/msp/aws_challenge) for a comprehensive list.",
          ],
        },
        {
          company: "Amazon Web Services",
          companyImage: "/images/logos/aws.svg",
          title: "Campus Ambassador",
          employmentType: "Contract",
          location: "Taipei, Taiwan 🇹🇼",
          timePeriod: "Aug. 2023 - Feb. 2024",
          details: [
            "Educated 700+ cloud developers and achieved 96% user satisfaction by conducting 2 technical workshops, developing an open-source project, and 1 UAD with AWS cloud services. Refer [here](https://github.com/aws-educate-tw/aws-line-business-card-workshop) for the source code.",
            "Conducted a comprehensive 35+ page market research study on cloud suppliers as part of an 11-member team.",
          ],
        },
        {
          company: "PEGATRON",
          companyImage: "/images/logos/pegatron.png",
          title: "AI Engineer",
          employmentType: "Intern",
          location: "Taipei, Taiwan 🇹🇼",
          timePeriod: "Jul. 2023 - Aug. 2023",
          details: [
            "Executed a POC, adapting an LLM model for Smart Manufacturing, and was awarded Silver internship team.",
            "Collaborated with a team of 5, utilized Git, a CI/CD pipeline, and followed an agile Scrum workflow.",
            "Implemented Prompt Engineering and LangChain for the NVIDIA Ominerve visual robot, enabling seamless speech/text operation, boosting test support by 83% across 6-11 scenarios with 85% stability.",
          ],
        },
        {
          company: "National Central University",
          companyImage: "/images/logos/ncu.png",
          title: "Website Developer",
          employmentType: "Part-time",
          location: "Taoyuan, Taiwan 🇹🇼",
          timePeriod: "Jul. 2022 - Jan. 2023",
          details: [
            "Partnered with a team of 2 to develop a multi-user score management system for the Center for Teacher Education, reducing credit exemption processing time by 80% and remotely maintaining the server via SSH.",
          ],
        },
      ],
    },
  },
  jsonLdPerson: {
    "@context": "http://schema.org",
    "@type": "Person",
    "@id": "https://www.1chooo.com/#person",
    givenName: "Chun-Ho",
    familyName: "Lin",
    additionalName: "Hugo",
    gender: "male",
    birthPlace: "New Taipei, TW",
    nationality: "Taiwan",
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "National Central University",
        sameAs: "https://www.ncu.edu.tw/",
      },
    ],
    jobTitle: "Software Engineer",
    skills: "Software Engineering, Web Development, Open Source",
    image: "https://www.1chooo.com/images/profile.webp",
    url: "https://www.1chooo.com",
    sameAs: [
      "https://www.linkedin.com/in/1chooo/",
      "http://github.com/1chooo",
      "https://medium.com/@1chooo",
    ],
  },
  giscusConfig: {
    id: "comments",
    repo: "1chooo/1chooo.com",
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || "",
    category: "General",
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CONFIG_CATEGORY_ID || "",
    mapping: "pathname",
    term: "Welcome to @giscus/react component!",
    reactionsEnabled: "1",
    emitMetadata: "1",
    inputPosition: "bottom",
    theme: "dark_tritanopia",
    lang: "en",
    loading: "lazy",
  },
  googleAnalyticId: process.env.NEXT_PUBLIC_GA_ID || "",
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID || "",
};

export default config;
