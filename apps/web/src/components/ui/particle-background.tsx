"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  delay: string;
  color: string;
  size: number;
}

const colors = ["#f093fb", "#ff6b35", "#8e44ad"];
const numParticles = 30;

const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const generateParticles = (): Particle[] => {
  return Array.from({ length: numParticles }).map((_, index) => ({
    id: index,
    left: `${getRandom(0, 100)}%`,
    delay: `${getRandom(0, 20)}s`,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: getRandom(2, 6), // px
  }));
};

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle animate-particle absolute rounded-full opacity-60"
          style={{
            left: particle.left,
            top: `-${particle.size}px`,
            animationDelay: particle.delay,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
