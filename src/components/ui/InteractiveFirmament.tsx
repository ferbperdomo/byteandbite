"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  color: string;
  twinkleSpeed: number;
}

interface InteractiveFirmamentProps {
  children: React.ReactNode;
  className?: string;
}

export default function InteractiveFirmament({
  children,
  className = "",
}: InteractiveFirmamentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate stars
  useEffect(() => {
    if (!isMounted) return;

    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 150;

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          brightness: Math.random() * 0.8 + 0.2,
          color: Math.random() > 0.7 ? "#b65c25" : "#ffffff",
          twinkleSpeed: Math.random() * 2 + 1,
        });
      }

      setStars(newStars);
    };

    generateStars();
  }, [isMounted]);

  // Mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-black ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Milky Way stars - high density band */}
      {isMounted &&
        [...Array(600)].map((_, i) => {
          // Create a diagonal band
          const bandCenter = 50;
          const bandWidth = 10;
          const y = 5 + Math.random() * 90; // Extend to cover more of the height
          // Create diagonal effect by offsetting x based on y position
          const diagonalOffset = (y - 50) * 0.4; // Increase angle to reach more extremes
          const x =
            bandCenter + (Math.random() - 0.5) * bandWidth + diagonalOffset;

          // Vary star sizes more dramatically
          const size =
            Math.random() < 0.1
              ? Math.random() * 4 + 3 // 10% large stars
              : Math.random() < 0.3
              ? Math.random() * 2 + 2 // 30% medium stars
              : Math.random() * 1.5 + 0.5; // 60% small stars

          // Vary star colors
          const colors = [
            "#ffffff",
            "#f0f0f0",
            "#e0e0e0",
            "#b65c25",
            "#ffd700",
            "#87ceeb",
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];

          const brightness = Math.random() * 0.6 + 0.4;

          return (
            <motion.div
              key={`milky-way-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 2}px ${color}`,
              }}
              animate={{
                opacity: [brightness * 0.5, brightness, brightness * 0.5],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

      {/* Interactive stars */}
      {isMounted &&
        stars.map((star) => {
          // Calculate distance from mouse to star
          const distance = Math.sqrt(
            Math.pow(star.x - mousePosition.x, 2) +
              Math.pow(star.y - mousePosition.y, 2)
          );
          const isNearMouse = distance < 25; // Within 25% of mouse position

          return (
            <motion.div
              key={star.id}
              className="absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: star.color,
                boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              }}
              animate={{
                opacity:
                  isHovered && isNearMouse
                    ? [
                        star.brightness * 1.2,
                        star.brightness * 2.0,
                        star.brightness * 1.2,
                      ]
                    : [
                        star.brightness * 0.3,
                        star.brightness,
                        star.brightness * 0.3,
                      ],
                scale:
                  isHovered && isNearMouse ? [1.5, 2.5, 1.5] : [0.8, 1.2, 0.8],
                boxShadow:
                  isHovered && isNearMouse
                    ? [
                        `0 0 ${star.size * 6}px ${star.color}`,
                        `0 0 ${star.size * 15}px ${star.color}`,
                        `0 0 ${star.size * 6}px ${star.color}`,
                      ]
                    : [
                        `0 0 ${star.size * 2}px ${star.color}`,
                        `0 0 ${star.size * 4}px ${star.color}`,
                        `0 0 ${star.size * 2}px ${star.color}`,
                      ],
              }}
              transition={{
                duration:
                  isHovered && isNearMouse
                    ? star.twinkleSpeed * 0.5
                    : star.twinkleSpeed,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

      {/* Additional stars that appear near mouse */}
      {isMounted &&
        isHovered &&
        [...Array(25)].map((_, i) => {
          const angle = (i / 25) * Math.PI * 2;
          const radius = 5 + Math.random() * 15;
          const x = mousePosition.x + Math.cos(angle) * radius;
          const y = mousePosition.y + Math.sin(angle) * radius;
          const size = Math.random() * 2 + 1.5;

          // Vary colors for mouse stars too
          const colors = ["#b65c25", "#ffffff", "#ffd700", "#87ceeb"];
          const color = colors[Math.floor(Math.random() * colors.length)];

          return (
            <motion.div
              key={`mouse-star-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                boxShadow: `0 0 ${size * 3}px ${color}`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1.5, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
          );
        })}

      {/* Shooting stars */}
      {isMounted && isHovered && (
        <>
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`shooting-${i}`}
              className="absolute w-1 h-1 bg-[#b65c25] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: [0, 150, 300],
                y: [0, 75, 150],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.8,
                repeat: Infinity,
                repeatDelay: 4,
              }}
            />
          ))}
        </>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
