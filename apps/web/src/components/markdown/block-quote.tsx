import React from "react";

interface BlockQuoteProps {
  children: React.ReactNode;
}

/**
 * A functional component that renders a blockquote element with specific styling.
 *
 * @param children - The content to be rendered inside the blockquote element.
 * @prop {React.ReactNode} children - The content to be rendered inside the blockquote element.
 * @returns A blockquote element with specific styling.
 */
function BlockQuote({ children }: BlockQuoteProps) {
  return (
    <blockquote className="text-white-2 border-l-4 border-gray-300 pl-4 font-serif text-xl italic">
      {children}
    </blockquote>
  );
}

export default BlockQuote;
