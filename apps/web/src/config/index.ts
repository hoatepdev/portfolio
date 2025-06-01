import { GoalIcon } from "@primer/octicons-react";
import { GraduationCap, Monitor } from "lucide-react";
import { AiOutlinePython } from "react-icons/ai";
import { BiLogoFlask, BiLogoPostgresql } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { FaAws, FaDev, FaGitAlt, FaNpm, FaReact } from "react-icons/fa";
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
import {
  SiExpress,
  SiFastapi,
  SiKubernetes,
  SiLatex,
  SiMongodb,
  SiNestjs,
  SiPostman,
} from "react-icons/si";
import {
  TbBrandAstro,
  TbBrandCpp,
  TbBrandDjango,
  TbBrandDocker,
  TbBrandGolang,
  TbBrandMysql,
  TbBrandNextjs,
  TbBrandNodejs,
  TbBrandTerraform,
  TbBrandTypescript,
  TbMarkdown,
  TbPhotoSquareRounded,
} from "react-icons/tb";
import { VscAzure, VscTerminalLinux } from "react-icons/vsc";

import { Icons } from "@/components/icons";
import { Config } from "@/types/config";

const config: Config = {
  avatar: "/images/avatar.avif",
  title: "Hoà T. (Thomas) Nguyen - hoatepdev | Full-stack Developer",
  description:
    "I'm Hoà T. (Thomas) Nguyen, a graduate with a Bachelor's degree from Post and Telecommunication Institute of Technology (PTIT) 🐿️, driven by a sincere passion for Software Engineering 💻.",
  author: "Hoà T. (Thomas) Nguyen - hoatepdev",
  keywords: [
    "Hoà T. (Thomas) Nguyen",
    "hoatepdev",
    "Software Engineering",
    "Next.js",
    "React",
  ],
  status: [
    "Curious 🤔",
    "Passionate 🔥",
    "Dedicated 💪",
    "Collaborative 🤝",
    "Focused 🎯",
    "Creative 🎨",
    "Resilient 🛡️",
    "Innovative 💡",
    "Reliable ⏱️",
    "Adaptable 🌱",
    "Optimistic 🌈",
  ],
  siteURL: "https://www.hoatepdev.com",
  openGraph: {
    url: "https://www.hoatepdev.com/",
    type: "website",
    siteName: "Hoà T. (Thomas) Nguyen - hoatepdev | Full-stack Developer",
    title: "Hoà T. (Thomas) Nguyen - hoatepdev | Full-stack Developer",
    description:
      "I'm Hoà T. (Thomas) Nguyen, a graduate with a Bachelor's degree from Post and Telecommunication Institute of Technology (PTIT) 🐿️, driven by a sincere passion for Software Engineering 💻.",
    images: [
      {
        url: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
        width: 1200,
        height: 630,
        alt: "Hoà T. (Thomas) Nguyen - hoatepdev Cover Image",
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
      content: "Hanoi, Vietnam 🇻🇳",
    },
    {
      icon: LuMail,
      title: "Email",
      link: "mailto:hoanguyentrandev@gmail.com",
      content: "hoanguyentrandev@gmail.com",
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
      url: "https://dev.to/hoatepdev",
      icon: FaDev,
      name: "Dev.to",
    },
    {
      url: "https://twitter.com/hoatepdev",
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
    metadataBase: new URL("https://www.hoatepdev.com"),
    title: "Hoà T. (Thomas) Nguyen - hoatepdev | Full-stack Developer",
    description:
      "I'm Hoà T. (Thomas) Nguyen, a graduate with a Bachelor's degree from Post and Telecommunication Institute of Technology (PTIT) 🐿️, driven by a sincere passion for Software Engineering 💻.",
    authors: [{ name: "Hoà T. (Thomas) Nguyen" }],
    creator: "Hoà T. (Thomas) Nguyen",
    keywords: [
      "Hoà T. (Thomas) Nguyen",
      "hoatepdev",
      "Software Engineering",
      "Next.js",
      "React",
    ],
    openGraph: {
      url: "https://www.hoatepdev.com/",
      type: "website",
      siteName: "Hoà T. (Thomas) Nguyen - hoatepdev | Full-stack Developer",
      title: "Hoà T. (Thomas) Nguyen - hoatepdev | Full-stack Developer",
      description:
        "I'm Hoà T. (Thomas) Nguyen, a graduate with a Bachelor's degree from Post and Telecommunication Institute of Technology (PTIT) 🐿️, driven by a sincere passion for Software Engineering 💻.",
      images: [
        {
          url: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
          width: 1200,
          height: 630,
          alt: "Hoà T. (Thomas) Nguyen - hoatepdev Cover Image",
        },
      ],
    },
    manifest: "/manifest.json",
    twitter: {
      card: "summary_large_image",
      title: "Hoà T. (Thomas) Nguyen - hoatepdev | Full-stack Developer",
      description:
        "I'm Hoà T. (Thomas) Nguyen, a graduate with a Bachelor's degree from Post and Telecommunication Institute of Technology (PTIT) 🐿️, driven by a sincere passion for Software Engineering 💻.",
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
    firstName: "Hoà T.",
    lastName: "Nguyen",
    middleName: "",
    preferredName: "Thomas",
    additionalName: "Thomas",
    pronouns: "He/Him",
    githubUsername: "hoatepdev",
    introduction: `
Hi, I'm a Full Stack Developer with 4 years of professional experience and a strong focus on frontend development 🎯. I specialize in building fast, user-friendly, and visually polished interfaces—while also managing backend logic to deliver complete, scalable web applications.

I hold a degree in Information Technology from the Posts and Telecommunications Institute of Technology (PTIT) 🎓, where I built a solid foundation in software engineering and full-stack development principles.

Over the years, I’ve worked on a wide range of projects—from small business websites to complex web platforms—using modern tools and frameworks across the stack 🛠️. I enjoy turning ideas into real-world solutions and writing clean, maintainable code that delivers long-term value 🚀.

In my spare time, I love developing personal projects, exploring new tech stacks, and writing tech content ✍🏻 to share what I learn. I also make time to work out 💪🏻—because a healthy body helps fuel a productive mind.
    `,
    lifestyles: [
      {
        icon: LuGithub,
        title: "Build Personal Projects",
        text: "I love building personal projects to explore new tech stacks and share what I learn.",
      },
      {
        icon: LuPencil,
        title: "Write Tech Content",
        text: "Love to share my knowledge and experience with others.",
      },
      {
        icon: GoalIcon,
        title: "Workouts",
        text: "Home gym is my favorite place to work out, I do weight training and resistance training.",
      },
      {
        icon: TbPhotoSquareRounded,
        title: "Hangout",
        text: "Hangout with friends and family is my favorite thing to do.",
      },
    ],
    techStacks: {
      programmingLanguages: [
        { name: "Node.js", icon: TbBrandNodejs },
        { name: "TypeScript", icon: TbBrandTypescript },
        { name: "JavaScript", icon: RiJavascriptLine },
        { name: "Markdown", icon: TbMarkdown },
        { name: "Java", icon: RiJavaLine },
        { name: "Golang", icon: TbBrandGolang },
      ],
      frameworks: [
        { name: "React", icon: FaReact },
        { name: "Next.js", icon: TbBrandNextjs },
        { name: "Nest.js", icon: SiNestjs },
        { name: "Express", icon: SiExpress },
        { name: "Docker", icon: TbBrandDocker },
        { name: "Postman", icon: SiPostman },
        { name: "Git", icon: FaGitAlt },
        { name: "Npm", icon: FaNpm },
        { name: "MySQL", icon: TbBrandMysql },
        { name: "PostgreSQL", icon: BiLogoPostgresql },
        { name: "MongoDB", icon: SiMongodb },
        { name: "Linux Terminal", icon: VscTerminalLinux },
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
