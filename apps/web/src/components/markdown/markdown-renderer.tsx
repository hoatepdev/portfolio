import React from "react";
import ReactMarkdown from "react-markdown";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import Anchor from "@/components/markdown/anchor";
import AnchorHeader from "@/components/markdown/anchor-header";
import BlockQuote from "@/components/markdown/block-quote";
import CodeBlock from "@/components/markdown/code-block";
import MarkdownImage from "@/components/markdown/markdown-image";
import Paragraph from "@/components/markdown/paragraph";
import "@/styles/markdown-alert.css";

interface MarkdownRendererProps {
  content: string;
}

function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeGithubAlerts]}
      components={{
        p: ({ node, children, ...props }) => (
          <Paragraph node={node} children={children} {...props} />
        ),
        a: (props) => <Anchor {...props} />,
        sup: "sup",
        sub: "sub",
        img: (props) => (
          <MarkdownImage
            src={typeof props.src === "string" ? props.src : ""}
            alt={props.alt}
          />
        ),
        ul: (props) => <ul {...props} style={{ paddingLeft: "1.0rem" }} />,
        ol: (props) => (
          <ol
            {...props}
            className="list-decimal"
            style={{
              paddingLeft: "1.0rem",
            }}
          />
        ),
        li: (props) => (
          <li
            {...props}
            className="list-disc"
            style={{
              marginBottom: "0.15rem",
            }}
          />
        ),
        h1: ({ children, ...props }) => (
          <AnchorHeader level={1} {...props}>
            {children}
          </AnchorHeader>
        ),
        h2: ({ children, ...props }) => (
          <AnchorHeader level={2} {...props}>
            {children}
          </AnchorHeader>
        ),
        h3: ({ children, ...props }) => (
          <AnchorHeader level={3} {...props}>
            {children}
          </AnchorHeader>
        ),
        blockquote: (props) => (
          <BlockQuote {...props}>{props.children}</BlockQuote>
        ),
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <CodeBlock language={match[1]}>{children}</CodeBlock>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;
