import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Briefcase,
  Award,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import {
  HERO_STATS,
  PRINCIPLES,
  PROFILE,
  PROJECTS,
  RECORD_TIMELINE,
  SKILL_GROUPS,
  STACK_ITEMS,
  WORK_STATS,
} from "@/data/resume";

export default function PortfolioView() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#09090b] text-zinc-100 pb-24">
      {/* Top Minimal Nav */}
      <header className="sticky top-0 z-40 border-b border-zinc-900/90 bg-[#09090b]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a
            href="#hero"
            data-build="type"
            className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-200 transition hover:text-[#ff3b2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
          >
            Srinath L
          </a>
          <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-7">
            {[
              { href: "#work", label: "Work" },
              { href: "#stack", label: "Stack" },
              { href: "#record", label: "Record" },
              { href: "#about", label: "About" },
              { href: "#contact", label: "Contact" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-build="pop"
                className="font-mono text-xs text-zinc-400 transition hover:text-white active:text-[#ff3b2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              data-build="pop"
              aria-label="GitHub Profile"
              className="flex items-center gap-1.5 font-mono text-xs text-zinc-400 transition hover:text-white active:text-[#ff3b2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
            >
              <Github className="h-3.5 w-3.5 text-[#ff3b2f]" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      {/* HERO (Full Screen) */}
      <section
        id="hero"
        className="relative flex min-h-[calc(100vh-53px)] w-full flex-col justify-end overflow-hidden border-b border-zinc-900 px-5 pt-8 pb-12 sm:px-8 lg:justify-center lg:py-16"
      >
        {/* Giant PORTFOLIO Wordmark Behind Headshot */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-6 z-0 flex justify-center overflow-hidden select-none sm:top-4 lg:top-8"
        >
          <span
            data-build="wipe"
            className="portfolio-wordmark block whitespace-nowrap text-center text-[21vw] leading-[0.86] tracking-[-0.02em] sm:text-[18.5vw] lg:text-[16.5vw]"
          >
            PORTFOLIO
          </span>
        </div>

        {/* Soft Red Radial Glow + Centered B&W Contrast Headshot */}
        <div className="pointer-events-none relative mx-auto mt-10 flex w-full max-w-md items-end justify-center lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:max-w-lg">
          <div
            aria-hidden="true"
            className="absolute bottom-4 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full sm:h-[420px] sm:w-[420px]"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, rgba(255,59,47,0.36) 0%, rgba(255,59,47,0.14) 40%, transparent 72%)",
            }}
          />
          <img
            src="/images/headshot.png"
            alt="Portrait of Srinath L"
            data-build="pop"
            className="headshot-fade relative z-10 h-auto w-[76%] max-w-[380px] object-contain grayscale contrast-125 sm:w-[82%] lg:max-h-[78vh] lg:w-auto"
          />
        </div>

        {/* Foreground Hero Grid: Left Intro & Right 3 Stats */}
        <div className="relative z-20 mx-auto mt-4 grid w-full max-w-7xl grid-cols-1 items-end gap-10 lg:mt-0 lg:grid-cols-12 lg:items-center">
          {/* Left Column */}
          <div className="space-y-4 lg:col-span-5">
            <p
              data-build="type"
              className="font-[family-name:var(--font-caveat-brush)] text-3xl text-zinc-300 sm:text-4xl"
            >
              Hello, I&apos;m
            </p>
            <h1
              data-build="wipe"
              className="font-[family-name:var(--font-anton)] text-6xl uppercase leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              {PROFILE.name}
            </h1>
            <p
              data-build="type"
              className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-[#ff3b2f]"
            >
              {PROFILE.role}
            </p>
            <p
              data-build="type"
              className="max-w-md text-sm leading-relaxed text-zinc-300 line-clamp-2 sm:text-base"
            >
              {PROFILE.heroBio}
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <a
                href="#work"
                data-build="pop"
                className="inline-flex items-center gap-2 rounded-md bg-[#ff3b2f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e5352a] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]"
              >
                <span>View work</span>
                <ArrowDownRight className="h-4 w-4" />
              </a>
              <span
                data-build="type"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400"
              >
                <MapPin className="h-3.5 w-3.5 text-[#ff3b2f]" />
                Based in {PROFILE.location}
              </span>
            </div>
          </div>

          {/* Center Spacer on Desktop */}
          <div className="hidden lg:col-span-3 lg:block" />

          {/* Right Column: 3 Real Stats */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1 lg:gap-4">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                data-build="pop"
                className="border border-zinc-800 bg-zinc-950/95 p-4"
              >
                <div className="font-[family-name:var(--font-anton)] text-3xl tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium text-zinc-200">
                  {stat.label}
                </div>
                <div className="mt-1 font-mono text-[11px] text-zinc-500">
                  {stat.source}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: WORK */}
      <section
        id="work"
        className="mx-auto max-w-7xl border-b border-zinc-900 px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p
              data-build="type"
              className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff3b2f]"
            >
              01 // Selected Systems
            </p>
            <h2
              data-build="wipe"
              className="mt-2 font-[family-name:var(--font-anton)] text-5xl uppercase tracking-tight text-white sm:text-6xl"
            >
              Work that ships
            </h2>
            <p
              data-build="type"
              className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base"
            >
              Applied AI/ML models, IoT sensor pipelines, and full stack web applications built across internships and independent engineering projects.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:col-span-5">
            {WORK_STATS.map((stat) => (
              <div
                key={stat.label}
                data-build="pop"
                className="border border-zinc-800 bg-zinc-950 p-4"
              >
                <div className="font-[family-name:var(--font-anton)] text-3xl text-[#ff3b2f]">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-[11px] leading-snug text-zinc-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              data-build="pop"
              className="flex flex-col justify-between border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-700 sm:p-7"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#ff3b2f]">
                    {project.role}
                  </span>
                  {project.period && (
                    <span className="font-mono text-[11px] text-zinc-500">
                      {project.period}
                    </span>
                  )}
                </div>

                <h3 className="mt-2 font-[family-name:var(--font-anton)] text-3xl uppercase tracking-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-zinc-300">
                  {project.subtitle}
                </p>

                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-zinc-400">
                  {project.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#ff3b2f]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-zinc-900 pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((chip) => (
                    <span
                      key={chip}
                      className="border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(
                      `Live Demo Request: ${project.title}`
                    )}`}
                    className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-900 px-3.5 py-2 font-mono text-xs text-zinc-100 transition hover:border-[#ff3b2f] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-[#ff3b2f]" />
                    <span>Request Live</span>
                  </a>
                  {project.codeUrl ? (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-900 px-3.5 py-2 font-mono text-xs text-zinc-100 transition hover:border-[#ff3b2f] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
                    >
                      <Github className="h-3.5 w-3.5 text-[#ff3b2f]" />
                      <span>View Code</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      title="Source code available upon request"
                      className="inline-flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-950 px-3.5 py-2 font-mono text-xs text-zinc-500 transition hover:border-zinc-700 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      <span>Code · Private</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 2: STACK */}
      <section
        id="stack"
        className="border-b border-zinc-900 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p
            data-build="type"
            className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff3b2f]"
          >
            02 // Tools &amp; Technologies
          </p>
          <h2
            data-build="wipe"
            className="mt-2 font-[family-name:var(--font-anton)] text-4xl uppercase tracking-tight text-white sm:text-5xl"
          >
            Full Technical Stack
          </h2>
        </div>

        <div
          data-build="pop"
          className="marquee-mask mt-10 w-full overflow-hidden border-y border-zinc-900 bg-zinc-950 py-5"
        >
          <div className="marquee-track">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-4 pr-4">
                {STACK_ITEMS.map((item, idx) => (
                  <span
                    key={`${dup}-${idx}`}
                    className="inline-flex items-center gap-3 border border-zinc-800 bg-zinc-900/70 px-4 py-2 font-mono text-xs text-zinc-200 whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b2f]" />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: RECORD */}
      <section
        id="record"
        className="mx-auto max-w-7xl border-b border-zinc-900 px-5 py-20 sm:px-8 lg:py-28"
      >
        <p
          data-build="type"
          className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff3b2f]"
        >
          03 // Experience, Education &amp; Credentials
        </p>
        <h2
          data-build="wipe"
          className="mt-2 font-[family-name:var(--font-anton)] text-5xl uppercase tracking-tight text-white sm:text-6xl"
        >
          Record
        </h2>

        <div className="relative mt-12 border-l border-zinc-800 pl-6 sm:pl-9">
          <div className="space-y-8">
            {RECORD_TIMELINE.map((entry) => (
              <div
                key={entry.id}
                data-build="pop"
                className="relative border border-zinc-800 bg-zinc-950 p-5 sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] top-7 flex h-3 w-3 items-center justify-center rounded-full border border-[#ff3b2f] bg-[#09090b] sm:-left-[43px]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b2f]" />
                </span>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#ff3b2f]">
                    {entry.category === "Experience" && <Briefcase className="h-3.5 w-3.5" />}
                    {entry.category === "Education" && <GraduationCap className="h-3.5 w-3.5" />}
                    {entry.category === "Certifications" && <Award className="h-3.5 w-3.5" />}
                    {entry.category}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    {entry.period}
                  </span>
                </div>

                <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                  {entry.title}
                </h3>
                <p className="font-mono text-xs text-zinc-400">
                  {entry.organization}
                </p>

                <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                  {entry.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 bg-zinc-500"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-7xl border-b border-zinc-900 px-5 py-20 sm:px-8 lg:py-28"
      >
        <p
          data-build="type"
          className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff3b2f]"
        >
          04 // Profile &amp; Engineering Principles
        </p>
        <h2
          data-build="wipe"
          className="mt-2 font-[family-name:var(--font-anton)] text-5xl uppercase tracking-tight text-white sm:text-6xl"
        >
          About
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* 2 Short Paragraphs */}
          <div className="space-y-5 lg:col-span-5">
            {PROFILE.aboutParagraphs.map((para, i) => (
              <p
                key={i}
                data-build="type"
                className="text-sm leading-relaxed text-zinc-300 sm:text-base"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.label}
                data-build="pop"
                className="border border-zinc-800 bg-zinc-950 p-5"
              >
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#ff3b2f]">
                  {group.label}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Principles */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <div
              key={p.number}
              data-build="pop"
              className="border border-zinc-800 bg-zinc-950 p-5"
            >
              <span className="font-mono text-xs text-[#ff3b2f]">{p.number}</span>
              <h3 className="mt-2 text-base font-semibold text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8 lg:pt-28"
      >
        <div
          data-build="pop"
          className="border border-zinc-800 bg-zinc-950 p-8 sm:p-12"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff3b2f]">
            05 // Get In Touch
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-anton)] text-4xl uppercase tracking-tight text-white sm:text-6xl">
            Let&apos;s build something measurable.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Open to Cybersecurity, AI/ML, and Full Stack engineering opportunities, applied research collaborations, and security product builds.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-[#ff3b2f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e5352a] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <Mail className="h-4 w-4" />
              <span>{PROFILE.email}</span>
            </a>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-5 py-3 font-mono text-xs text-zinc-100 transition hover:border-[#ff3b2f] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
            >
              <Github className="h-4 w-4 text-[#ff3b2f]" />
              <span>{PROFILE.githubLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-5 py-3 font-mono text-xs text-zinc-100 transition hover:border-[#ff3b2f] hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3b2f]"
            >
              <Linkedin className="h-4 w-4 text-[#ff3b2f]" />
              <span>{PROFILE.linkedinLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
            </a>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-zinc-900 pt-6 font-mono text-xs text-zinc-500 sm:flex-row sm:items-center">
          <span>
            &copy; {new Date().getFullYear()} {PROFILE.name} &middot; {PROFILE.location}
          </span>
          <span>Built with Next.js 15, TypeScript &amp; Tailwind CSS v4</span>
        </footer>
      </section>
    </main>
  );
}
