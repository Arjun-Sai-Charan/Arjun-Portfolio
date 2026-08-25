"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  size: number;
  rotation: number;
  driftX: number;
  driftY: number;
  lifetime: number;
}

interface BurstParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  symbol: string;
}

const MAX_PARTICLES = 36;
const MIN_SPAWN_DISTANCE = 18;
const PARTICLE_SYMBOLS = ["✦", "✧", "·", "✦", "✨"];

const randomSymbol = () =>
  PARTICLE_SYMBOLS[Math.floor(Math.random() * PARTICLE_SYMBOLS.length)];

export default function SparkCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, {
    stiffness: 320,
    damping: 32,
    mass: 0.6,
  });

  const springY = useSpring(y, {
    stiffness: 320,
    damping: 32,
    mass: 0.6,
  });

  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [burstParticles, setBurstParticles] = useState<BurstParticle[]>([]);

  const particleIdRef = useRef(0);
  const burstIdRef = useRef(0);

  const lastPositionRef = useRef({ x: -100, y: -100 });
  const reducedMotionRef = useRef(false);
  const touchDeviceRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotionPreference = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    touchDeviceRef.current =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      "ontouchstart" in window;

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  const removeParticle = (id: number) => {
    setParticles((current) =>
      current.filter((particle) => particle.id !== id)
    );
  };

  const spawnParticle = (posX: number, posY: number, speed: number) => {
    if (reducedMotionRef.current || touchDeviceRef.current) return;

    setParticles((current) => {
      if (current.length >= MAX_PARTICLES) {
        return current.slice(1);
      }

      const intensity = Math.min(speed / 30, 2);

      const particle: Particle = {
        id: particleIdRef.current++,
        x: posX,
        y: posY,
        symbol: randomSymbol(),
        size: 7 + Math.random() * (7 + intensity * 2),
        rotation: Math.random() * 360,
        driftX: (Math.random() - 0.5) * (18 + intensity * 14),
        driftY: (Math.random() - 0.5) * (18 + intensity * 14),
        lifetime: 500 + Math.random() * 350,
      };

      return [...current, particle];
    });
  };

  const createBurst = (posX: number, posY: number) => {
    if (reducedMotionRef.current || touchDeviceRef.current) return;

    const count = 8;

    const burst: BurstParticle[] = Array.from(
      { length: count },
      (_, index) => ({
        id: burstIdRef.current++,
        x: posX,
        y: posY,
        angle: (index / count) * Math.PI * 2,
        distance: 45 + Math.random() * 35,
        symbol: randomSymbol(),
      })
    );

    setBurstParticles((current) => [...current, ...burst]);

    window.setTimeout(() => {
      setBurstParticles((current) =>
        current.filter(
          (particle) => !burst.some((created) => created.id === particle.id)
        )
      );
    }, 650);
  };

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (touchDeviceRef.current) return;

      const currentX = event.clientX;
      const currentY = event.clientY;

      x.set(currentX);
      y.set(currentY);

      const previous = lastPositionRef.current;

      const dx = currentX - previous.x;
      const dy = currentY - previous.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance >= MIN_SPAWN_DISTANCE) {
        spawnParticle(currentX, currentY, distance);

        lastPositionRef.current = {
          x: currentX,
          y: currentY,
        };
      }
    };

    const handleDown = (event: PointerEvent) => {
      if (touchDeviceRef.current) return;

      document.body.classList.add("cursor-press");

      window.setTimeout(() => {
        document.body.classList.remove("cursor-press");
      }, 180);

      createBurst(event.clientX, event.clientY);
    };

    const handleHover = (event: Event) => {
      setHovering(true);

      const element = event.target as HTMLElement | null;
      const datasetLabel = element?.dataset.cursorLabel;

      setLabel(datasetLabel || "VIEW");
    };

    const handleLeave = () => {
      setHovering(false);
      setLabel("");
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleDown);

    const interactive = document.querySelectorAll(
      "a, button, .project-card, .nav-link, .skill-pill"
    );

    interactive.forEach((element) => {
      element.addEventListener("pointerenter", handleHover);
      element.addEventListener("pointerleave", handleLeave);
    });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);

      interactive.forEach((element) => {
        element.removeEventListener("pointerenter", handleHover);
        element.removeEventListener("pointerleave", handleLeave);
      });
    };
  }, [x, y]);

  return (
    <>
      {/* Magical sparkle trail */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="spark-particle"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
            scale: 0.2,
            rotate: particle.rotation - 30,
          }}
          animate={{
            x: particle.x + particle.driftX,
            y: particle.y + particle.driftY,
            opacity: [0, 1, 0],
            scale: [0.2, 1, 0.15],
            rotate: particle.rotation + 35,
          }}
          transition={{
            duration: particle.lifetime / 1000,
            ease: "easeOut",
            times: [0, 0.2, 1],
          }}
          onAnimationComplete={() => removeParticle(particle.id)}
          style={{
            fontSize: particle.size,
          }}
          aria-hidden="true"
        >
          {particle.symbol}
        </motion.div>
      ))}

      {/* Click sparkle burst */}
      {burstParticles.map((particle) => (
        <motion.div
          key={`burst-${particle.id}`}
          className="spark-burst-particle"
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 1,
            scale: 0.3,
          }}
          animate={{
            x:
              particle.x +
              Math.cos(particle.angle) * particle.distance,
            y:
              particle.y +
              Math.sin(particle.angle) * particle.distance,
            opacity: 0,
            scale: 1.15,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden="true"
        >
          {particle.symbol}
        </motion.div>
      ))}

      {/* Main cursor */}
      <motion.div
        className={`spark-cursor ${hovering ? "is-hovering" : ""}`}
        style={{
          x: springX,
          y: springY,
        }}
        aria-hidden="true"
      >
        <span className="spark-core" />
        <span className="spark-ring" />

        {label ? (
          <span className="spark-label">{label}</span>
        ) : null}
      </motion.div>
    </>
  );
}