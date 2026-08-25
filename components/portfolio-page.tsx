"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, AtSign, BriefcaseBusiness, Code2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SparkCursor from "@/components/spark-cursor";
import {
  journey,
  navItems,
  projects,
  skillGroups,
  socialLinks,
  stats,
} from "@/data/portfolio";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
};

type AboutFrameLine = {
  text: string;
  emphasis?: boolean;
};

type AboutFrame = {
  kicker: string;
  lines: AboutFrameLine[];
};

const aboutFrames: AboutFrame[] = [
  {
    kicker: "HI, I'M",
    lines: [
      { text: "ARJUN SAI CHARAN KOTTE", emphasis: true },
      { text: "COMPUTER SCIENCE GRADUATE" },
    ],
  },
  {
    kicker: "I BUILD",
    lines: [
      { text: "AI / ML APPLICATIONS" },
      { text: "FULL STACK PROJECTS" },
      { text: "PRACTICAL SOFTWARE" },
    ],
  },
  {
    kicker: "PREVIOUSLY INTERNED",
    lines: [
      { text: "IIT MADRAS", emphasis: true },
      { text: "Artificial Intelligence in Marketing" },
    ],
  },
  {
    kicker: "CURRENT FOCUS",
    lines: [
      { text: "RAG", emphasis: true },
      { text: "LLMs" },
      { text: "AI APPLICATIONS" },
    ],
  },
  {
    kicker: "WHEN I'M NOT CODING",
    lines: [
      { text: "⚽ FOOTBALL , FC Barcelona💙❤️" },
      { text: "♫ MUSIC" },
      { text: "◉ THE MENTALIST" },
    ],
  },
];

const FRAME_DURATION_MS = 4200;

function AboutFrameContent({ frame }: { frame: AboutFrame }) {
  return (
    <div className="about-frame">
      <p className="about-kicker">{frame.kicker}</p>
      <div className="about-lines">
        {frame.lines.map((line) => (
          <p
            key={line.text}
            className={line.emphasis ? "about-line about-line-emphasis" : "about-line"}
          >
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}

function AboutMePanel() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % aboutFrames.length);
    }, FRAME_DURATION_MS);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  const activeIndex = reducedMotion ? 0 : index;
  const frame = useMemo(() => aboutFrames[activeIndex], [activeIndex]);

  return (
    <>
      <div className="signal-header">
        <div className="signal-header-label">
          <span className="signal-dot" />
          <span>About me</span>
        </div>
        <span className="signal-progress">
          {String(activeIndex + 1).padStart(2, "0")} / {String(aboutFrames.length).padStart(2, "0")}
        </span>
      </div>

      <div className="signal-body about-body">
        {reducedMotion ? (
          <AboutFrameContent frame={frame} />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <AboutFrameContent frame={frame} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </>
  );
}

export default function PortfolioPage() {
  return (
    <main className="page-shell">
      <SparkCursor />
      <div className="grain" aria-hidden="true" />

      <header className="site-header">
        <div className="nav-shell">
          <div className="brand-block">
            <span className="brand-mark">A</span>
            <span className="brand-text">Arjun Sai Charan</span>
          </div>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="nav-cta">
            Book a call
          </a>
        </div>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-grid">
          <motion.div {...fadeInUp} className="hero-copy">
            <p className="eyebrow">
              <Sparkles size={12} />
              AI/ML · RAG · full stack development
            </p>

            <h1 className="hero-title">
              <span>ARJUN</span>
              <span>SAI CHARAN</span>
            </h1>

            <div className="hero-subhead">
              <span>computer science graduate</span>
              <span>AI & machine learning</span>
              <span>full stack development</span>
            </div>

            <p className="hero-description">
              I'm a computer science graduate interested in AI, machine learning, RAG, and full-stack development. I enjoy turning ideas into practical applications through code, experimentation, and problem solving.
            </p>

            <div className="hero-actions">
              <a href="#work" className="primary-button" data-cursor-label="VIEW WORK">
                View work
              </a>
              <a href="#contact" className="secondary-button" data-cursor-label="CONTACT">
                Contact
              </a>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.12 }}
            className="hero-panel"
          >
            <AboutMePanel />
            <div className="scan-lines" aria-hidden="true" />
          </motion.div>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-box">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <motion.section
        id="about"
        className="content-section about-section"
        {...fadeInUp}
      >
        <div className="section-kicker">about</div>
        <div className="about-layout">
          <div className="about-copy">
            <h2>
              I build software that <span>solves real problems.</span>
            </h2>
          </div>
          <div className="about-story">
            <p>
              I'm a computer science graduate interested in AI, machine learning, RAG, full-stack development, and the problem-solving side of software. I enjoy taking an idea, figuring out how it should work, and turning it into something that actually runs.
            </p>
            <p>
              My work spans Python, APIs, web applications, machine learning, RAG, and AI-powered applications. I'm constantly learning, building, and improving my ability to create useful software from the ground up.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section id="stack" className="content-section" {...fadeInUp}>
        <div className="section-kicker">stack</div>
        <div className="section-header-row">
          <h2>The tools I use to build, experiment, and solve problems.</h2>
        </div>

        <div className="skill-grid">
          {skillGroups.map((group) => (
            <div key={group.name} className="skill-column">
              <p className="skill-label">{group.name}</p>
              <div className="skill-list">
                {group.items.map((item) => (
                  <span key={item} className="skill-pill" data-cursor-label={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section id="work" className="content-section" {...fadeInUp}>
        <div className="section-kicker">selected work</div>
        <div className="section-header-row">
          <h2>Things I've built while learning, experimenting, and solving problems.</h2>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article key={project.slug} className="project-card" data-cursor-label="VIEW">
              <div className="project-topline">
                <span>{project.category}</span>
                <span>{project.slug}</span>
              </div>

              <div className="project-body">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                <div className="project-tags">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className="project-links">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    Live <ArrowUpRight size={14} />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    GitHub <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section id="journey" className="content-section" {...fadeInUp}>
        <div className="section-kicker">journey</div>
        <div className="section-header-row">
          <h2>My journey through software, AI, and engineering.</h2>
        </div>

        <div className="journey-list">
          {journey.map((item) => (
            <div key={item.year} className="journey-item">
              <div className="journey-year">{item.year}</div>
              <div className="journey-content">
                <h3>{item.title}</h3>
                <p className="journey-place">{item.place}</p>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.footer id="contact" className="contact-section" {...fadeInUp}>
        <div className="contact-frame">
          <p className="section-kicker">contact</p>
          <h2>Let&apos;s build something interesting.</h2>
          <div className="contact-actions">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="social-link"
                data-cursor-label={link.label}
              >
                {link.label === "GitHub" && <Code2 size={16} />}
                {link.label === "LinkedIn" && <BriefcaseBusiness size={16} />}
                {link.label === "Email" && <AtSign size={16} />}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.footer>
    </main>
  );
}