import { cn } from "@workspace/ui/lib/utils";

import CodingStats from "@/components/about/coding-stats";
import { LatestArticles } from "@/components/about/latest-articles";
import LifeStyles from "@/components/about/life-styles";
import AnimatedSection from "@/components/animated-section";
import PageHeader from "@/components/page-header";
import config from "@/config";
import { getAllPosts } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import "@/styles/markdown-styles.css";

const { about } = config;
const {
  firstName,
  lastName,
  preferredName,
  introduction,
  lifestyles,
  techStacks,
  githubUsername,
} = about;

async function About() {
  const allPosts = getAllPosts();

  const header = preferredName
    ? `About ${preferredName} 👨🏻‍💻`
    : `About ${firstName} ${lastName} 👨🏻‍💻`;

  const content = await markdownToHtml(introduction || "");

  return (
    <article>
      <AnimatedSection id="about">
        <PageHeader header={header} />
      </AnimatedSection>
      <AnimatedSection>
        <div
          className={cn("markdown")}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </AnimatedSection>
      {allPosts.length > 0 && <LatestArticles posts={allPosts} />}
      <CodingStats techStacks={techStacks} githubUsername={githubUsername} />
      <LifeStyles lifestyles={lifestyles} />
    </article>
  );
}

export default About;
