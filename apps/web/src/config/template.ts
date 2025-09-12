import { GoalIcon } from "@primer/octicons-react";
import { GraduationCap, Monitor } from "lucide-react";
import { AiOutlinePython } from "react-icons/ai";
import { BiLogoFlask } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { FaAws, FaReact } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  LuGithub,
  LuLinkedin,
  LuMail,
  LuMapPin,
  LuPencil,
  LuRss,
} from "react-icons/lu";
import { PiMediumLogoBold } from "react-icons/pi";
import { RiJavaLine, RiJavascriptLine } from "react-icons/ri";
import { SiFastapi, SiKubernetes, SiLatex, SiPostman } from "react-icons/si";
import {
  TbBrandAstro,
  TbBrandCpp,
  TbBrandDjango,
  TbBrandDocker,
  TbBrandGolang,
  TbBrandMysql,
  TbBrandNextjs,
  TbBrandTerraform,
  TbBrandTypescript,
  TbMarkdown,
  TbPhotoSquareRounded,
} from "react-icons/tb";
import { VscAzure, VscTerminalLinux } from "react-icons/vsc";

import { Icons } from "@/components/icons";
import { Config } from "@/types/config";

const config: Config = {
  avatar: "/images/profile.webp",
  title: "Hòa T. (Thomas) Nguyen - hoatepdev | Open Source Enthusiast",
  description:
    "I'm Hòa T. (Thomas) Nguyen, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
  author: "Hòa T. (Thomas) Nguyen - hoatepdev",
  keywords: [
    "Hòa T. (Thomas) Nguyen",
    "hoatepdev",
    "Software Engineering",
    "Next.js",
    "React",
  ],
  status: ["Dive Deep. 🤿", "Explore. 🔍", "Build. 🔨"],
  siteURL: "https://p.hoatepdev.site",
  openGraph: {
    url: "https://p.hoatepdev.site/",
    type: "website",
    siteName: "Hòa T. (Thomas) Nguyen - hoatepdev | Open Source Enthusiast",
    title: "Hòa T. (Thomas) Nguyen - hoatepdev | Open Source Enthusiast",
    description:
      "I'm Hòa T. (Thomas) Nguyen, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
    images: [
      {
        url: "https://docs.hoatepdev.com/images/cover-with-hoatepdev-com.png",
        width: 1200,
        height: 630,
        alt: "Hòa T. (Thomas) Nguyen - hoatepdev Cover Image",
      },
    ],
  },
  navigationLinks: [
    { path: "/", label: "About" },
    { path: "/resume", label: "Resume" },
    // { path: "/portfolio", label: "Portfolio" },
    { path: "/post", label: "Post" },
    { path: "/contact", label: "Contact" },
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
      link: "mailto:hoatepdev@gmail.com",
      content: "contact@hoatepdev.com",
    },
    {
      icon: LuGithub,
      title: "GitHub",
      link: "https://github.com/hoatepdev",
      content: "@hoatepdev",
    },
    {
      icon: LuLinkedin,
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/hoatepdev/",
      content: "in/hoatepdev",
    },
  ],
  socialLinks: [
    {
      url: "https://github.com/hoatepdev",
      icon: LuGithub,
      name: "GitHub",
    },
    {
      url: "https://www.linkedin.com/in/hoatepdev/",
      icon: LuLinkedin,
      name: "LinkedIn",
    },
    {
      url: "https://medium.com/@hoatepdev",
      icon: PiMediumLogoBold,
      name: "Medium",
    },
    {
      url: "https://twitter.com/hoatepdev___",
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
    metadataBase: new URL("https://p.hoatepdev.site"),
    title: "Hòa T. (Thomas) Nguyen - hoatepdev | Open Source Enthusiast",
    description:
      "I'm Hòa T. (Thomas) Nguyen, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
    authors: [{ name: "Hòa T. (Thomas) Nguyen" }],
    creator: "Hòa T. (Thomas) Nguyen",
    keywords: [
      "Hòa T. (Thomas) Nguyen",
      "hoatepdev",
      "Software Engineering",
      "Next.js",
      "React",
    ],
    openGraph: {
      url: "https://p.hoatepdev.site/",
      type: "website",
      siteName: "Hòa T. (Thomas) Nguyen - hoatepdev | Open Source Enthusiast",
      title: "Hòa T. (Thomas) Nguyen - hoatepdev | Open Source Enthusiast",
      description:
        "I'm Hòa T. (Thomas) Nguyen, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
      images: [
        {
          url: "https://docs.hoatepdev.com/images/cover-with-hoatepdev-com.png",
          width: 1200,
          height: 630,
          alt: "Hòa T. (Thomas) Nguyen - hoatepdev Cover Image",
        },
      ],
    },
    manifest: "/manifest.json",
    twitter: {
      card: "summary_large_image",
      title: "Hòa T. (Thomas) Nguyen - hoatepdev | Open Source Enthusiast",
      description:
        "I'm Hòa T. (Thomas) Nguyen, a graduate with a Bachelor's degree from National Central University (NCU) 🐿️, driven by a sincere passion for Software Engineering 💻.",
      images: "https://docs.hoatepdev.com/images/cover-with-hoatepdev-com.png",
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
    firstName: "Hòa T.",
    lastName: "Nguyen",
    middleName: "",
    preferredName: "Thomas",
    additionalName: "Thomas",
    pronouns: "He/Him",
    githubUsername: "hoatepdev",
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
            "Documented issues in 10+ mock cases, such as VPC entry failures, EC2 Apache server restarts, and S3 photo access problems, and provided detailed solutions for interns. Refer [here](https://github.com/hoatepdev/ecv-training-materials/tree/main/msp/aws_challenge) for a comprehensive list.",
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
    "@id": "https://p.hoatepdev.site/#person",
    givenName: "Hòa T.",
    familyName: "Nguyen",
    additionalName: "Thomas",
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
    image: "https://p.hoatepdev.site/images/profile.webp",
    url: "https://p.hoatepdev.site",
    sameAs: [
      "https://www.linkedin.com/in/hoatepdev/",
      "http://github.com/hoatepdev",
      "https://medium.com/@hoatepdev",
    ],
  },
  giscusConfig: {
    id: "comments",
    repo: "hoatepdev/portfolio",
    repoId: process.env.NEXT_PUBLIC_GISCUS_CONFIG_REPO_ID || "",
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
