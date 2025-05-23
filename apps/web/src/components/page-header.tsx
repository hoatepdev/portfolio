import React from "react";

interface PageHeaderProps {
  header: string;
}

function PageHeader({ header }: PageHeaderProps) {
  return (
    <header>
      <h2 className="h2 article-title">{header}</h2>
    </header>
  );
}

export default PageHeader;
