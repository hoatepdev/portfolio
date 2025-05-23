import type React from "react";

import "@/styles/gradient-card.css";

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
}

function GradientCard({ children, className = "" }: GradientCardProps) {
  return (
    <div
      className={`gradient-card bg-border-gradient-onyx group relative shadow-shadow-2 rounded-2xl before:absolute before:content-[''] before:rounded-2xl hover:scale-105 duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default GradientCard;
