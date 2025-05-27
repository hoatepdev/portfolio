import type React from "react";

import "@/styles/gradient-card.css";

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
}

function GradientCard({ children, className = "" }: GradientCardProps) {
  return (
    <div
      className={`gradient-card bg-border-gradient-onyx shadow-shadow-2 group relative rounded-2xl duration-300 before:absolute before:rounded-2xl before:content-[''] hover:scale-105 ${className}`}
    >
      {children}
    </div>
  );
}

export default GradientCard;
