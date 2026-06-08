// Single source of truth for site content. Used by the page UI AND injected as
// context into the "Ask my CV" Claude API endpoint. Edit here, redeploy, done.

export const profile = {
  name: "Erwin Agüero",
  handle: "enaguero",
  email: "enaguero@gmail.com",
  github: "https://github.com/enaguero",
  linkedin: "https://www.linkedin.com/in/enaguero/",
  location: "Chilean · based in London, UK · GMT",
  headline:
    "Chilean software engineer based in London — with a parallel decade in teaching",
  pitch:
    "I'm a Chilean software engineer based in London. Teaching has been part of my work since university — most consistently over the past six years at 4Geeks Academy Spain, alongside engineering roles at Babylon Health, Zappi, and now Hurdle. I'd love to bring that same patience and structure to ByteByteGo's deeper topics.",
  shortPitch:
    "Chilean engineer in London who has taught alongside building for over a decade. Happiest in a classroom, a review thread, or a small repo with a learner.",
};

// Teaching journey — the actual arc the site is built around.
export const teachingJourney = [
  {
    period: "2008 – 2014",
    where: "Pontificia Universidad Católica · Santiago, Chile",
    role: "Teaching Assistant",
    body:
      "Through my engineering degree I worked as a TA across several courses: Introduction to Programming in Java, Software Engineering (design patterns, agile methodologies), Microeconomics, and Probability & Statistics. This is where I first noticed that helping someone understand a concept I had just learned myself was the part of the week I looked forward to most.",
  },
  {
    period: "May 2019 – Present · ~6 years",
    where: "4Geeks Academy Spain · Remote",
    role: "Full-Stack Bootcamp Instructor (part-time)",
    body:
      "I've taught successive cohorts of the full-stack bootcamp — HTML, CSS, JavaScript, React, Python, Flask/FastAPI, SQL, JWT auth, Git. The academy provides the foundation material; on top of that I've built a more structured, comprehensive companion repo for my latest cohort (129) so students leave with a deeper understanding of what they're actually doing — not just a recipe that works.",
    link: {
      href: "https://github.com/enaguero/4geeks_academy_spain_fs_pt_129/blob/main/README.en.md",
      label: "Cohort 129 companion repo",
    },
  },
  {
    period: "2026 · in progress",
    where: "enaguero.github.io/python-book",
    role: "Personal initiative",
    body:
      "A fundamentals-first Python handbook I just started writing. Two parts (Foundations and Beyond the Basics), short chapters, exercises, and in-browser execution on key topics via Pyodide. It's an experiment — I'll see how it goes — but it's already helping me clarify the pieces I think are worth teaching incrementally.",
    link: {
      href: "https://enaguero.github.io/python-book/",
      label: "Read the work-in-progress",
    },
  },
  {
    period: "Next chapter",
    where: "ByteByteGo · part-time instructor",
    role: "The role I'm applying for",
    body:
      "ByteByteGo would let me keep teaching while moving into deeper material than a bootcamp — System Design, Agentic AI Coding, AI Automation. The bi-weekly cadence also fits better with my current senior engineering role at Hurdle, and lets me commit to a long-term relationship with the platform.",
  },
];

// Engineering background — kept brief; the chat assistant has access to fuller CV detail.
export const engineeringRoles = [
  {
    period: "Jan 2026 – Present",
    title: "Senior Software Engineer",
    company: "Hurdle · London",
    summary:
      "Core infrastructure for diagnostic protocols and workflow orchestration across labs, logistics, and clinical systems.",
  },
  {
    period: "Dec 2023 – Dec 2025",
    title: "Senior Software Engineer",
    company: "Zappi · London",
    summary:
      "Purchase Ops team — pricing, discounting, checkout, accounting. Architectural decisions across microservices; mentoring junior engineers.",
  },
  {
    period: "Mar 2020 – Nov 2023",
    title: "Software Engineer → Senior",
    company: "Babylon Health · London",
    summary:
      "Cross-domain feature work in Babylon's core service, with earlier work in the Partner tribe delivering client-facing integrations.",
  },
  {
    period: "May 2017 – May 2019",
    title: "Ruby on Rails Developer · Technical PM",
    company: "LenioLabs · Santiago",
    summary:
      "Ruby on Rails APIs, AWS deployments, D3 visualisations — including work for Anglo American.",
  },
];

// The three ByteByteGo tracks — reframed as areas to grow into, not areas already mastered.
export const tracks = [
  {
    id: "system-design",
    title: "System Design",
    tagline: "Teaching what I teach now, learning the parts I haven't taught yet.",
    summary:
      "At 4Geeks I already teach the building blocks: REST APIs, relational databases, auth, caching, a frontend consuming an API. ByteByteGo's depth — distributed systems, scaling, consistency-vs-availability trade-offs — is material I'm actively studying. I'd love to teach the foundations confidently while learning the deeper layers alongside more advanced learners.",
    bullets: [
      "Comfortable with: HTTP, REST, relational modeling, JWT, simple caching",
      "Currently studying: consensus, replication, partitioning, queue patterns",
      "What I'd bring: pacing, runnable examples, honest 'I don't know yet'",
    ],
  },
  {
    id: "agentic-ai-coding",
    title: "Agentic AI Coding",
    tagline: "I use Claude Code daily and have notes from the failures.",
    summary:
      "I've been working with Claude Code as a day-to-day collaborator for several months across personal projects and work tasks. This site was scaffolded that way — the commits at github.com/enaguero/cv-bytebytego are honest about what I prompted, what I had to redo, and where the agent went off the rails. I'd teach from that same place: practical workflows, real failure modes, and the parts I'm still figuring out.",
    bullets: [
      "Day-to-day use across personal and work projects",
      "Familiar with Claude Code, MCP tooling, structured prompts and plans",
      "Comfortable being explicit about what I still get wrong",
    ],
    repo: "https://github.com/enaguero/cv-bytebytego",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    tagline: "Start with one repetitive thing. Automate the smallest version of it first.",
    summary:
      "Most teams I've worked at have a handful of repetitive tasks sitting between engineers and the work they want to do. I enjoy walking learners through how to spot one of those, build the smallest pipeline that solves it, then layer in reliability and observability one step at a time. The CI/CD that publishes this site on every push to main is a fine starting example.",
    bullets: [
      "Identify the leverage point before reaching for tools",
      "Serverless + API glue — Vercel functions, webhooks, scheduled jobs",
      "Observability and cost as part of the lesson, not an afterthought",
    ],
  },
];

// Teaching artifacts — concrete things to look at.
export const teachingArtifacts = [
  {
    title: "4Geeks Academy · Cohort 129 companion repo",
    role: "Lead instructor (Spain, part-time)",
    description:
      "A bilingual (Spanish/English) companion repo I built on top of the academy's foundation material, organised day-by-day across 29 sessions. It covers HTML/CSS/JS, React with hooks and routing, Python with Flask/FastAPI, SQL with SQLAlchemy, JWT auth, and Git workflow — with progressive exercises and small projects (Star Wars API client, contact manager, todo apps).",
    metrics: ["29 structured days", "Bilingual (ES/EN)", "Multiple consumption formats"],
    link: "https://github.com/enaguero/4geeks_academy_spain_fs_pt_129/blob/main/README.en.md",
    quote:
      "I prefer the incremental approach in teaching, focusing on the fundamentals as well — so the structure builds one layer at a time, not all at once.",
  },
  {
    title: "Formative review of a student's final project",
    role: "Agentic AI + my pedagogy, worked example",
    description:
      "A long-form review for a bootcamp student's capstone (ShadowMap). Claude read the student's repo and produced a first-draft review; I then went line-by-line — correcting misreads, sharpening the framing, and personalising the message — before sending it. It opens by celebrating what's working, separates urgent fixes from polish from excellence, and grades across 11 dimensions with code citations.",
    metrics: ["11 dimensions", "Prioritised action plan", "AI-drafted, human-refined"],
    link: "/sample-review",
    quote:
      "This document is a review of your project designed so you learn, not so you get discouraged.",
  },
  {
    title: "Python from the fundamentals (work in progress)",
    role: "Personal teaching initiative · 2026",
    description:
      "A Python handbook I'm writing in the open. Two parts: Foundations (computer basics, variables, control flow, functions, OOP, testing) and Beyond the Basics (collections, async, typing). Short chapters, exercises, in-browser execution on key topics. I'll see how it goes — but it's already a useful place to test how I'd structure a longer course.",
    metrics: ["~12 modules", "In-browser exercises", "Search-first reading"],
    link: "https://enaguero.github.io/python-book/",
    quote: "Fundamentals first, with examples you can actually run.",
  },
];

// Soft "how I teach" — replaces the previously prescriptive 'philosophy'.
export const howITeach = [
  {
    title: "Start with something that runs.",
    body:
      "Theory after the artifact, not before. A working example earns the right to be explained.",
  },
  {
    title: "Read code together, out loud.",
    body:
      "Line by line, with questions. The pace tells me where the real gap is.",
  },
  {
    title: "Layer complexity slowly.",
    body:
      "A 3-step Instagram card before a full photo feed. A single endpoint before a service.",
  },
  {
    title: "Be honest about what I don't know yet.",
    body:
      "Especially in advanced material. Saying 'let's figure this out together' is more useful than pretending.",
  },
];

/** Compact CV blob fed to Claude as system context. Keep under ~2500 tokens. */
export function asAssistantContext(): string {
  return [
    `Name: ${profile.name}`,
    `Email: ${profile.email}`,
    `GitHub: ${profile.github}`,
    `LinkedIn: ${profile.linkedin}`,
    `Location: ${profile.location}`,
    ``,
    `Headline: ${profile.headline}`,
    `Pitch: ${profile.pitch}`,
    ``,
    `Teaching journey:`,
    ...teachingJourney.map(
      (t) => `- ${t.period} · ${t.where} · ${t.role}: ${t.body}`,
    ),
    ``,
    `Recent engineering roles:`,
    ...engineeringRoles.map(
      (r) => `- ${r.period} · ${r.title} at ${r.company}: ${r.summary}`,
    ),
    ``,
    `Tracks at ByteByteGo:`,
    ...tracks.map(
      (t) => `- ${t.title} (${t.tagline}) — ${t.summary}`,
    ),
    ``,
    `Teaching artifacts to look at:`,
    ...teachingArtifacts.map(
      (a) => `- ${a.title}: ${a.description} | Link: ${a.link}`,
    ),
    ``,
    `How Erwin teaches:`,
    ...howITeach.map((h) => `- ${h.title} ${h.body}`),
    ``,
    `Why Erwin and not another bootcamp teacher:`,
    `- He genuinely loves teaching — finds helping people understand new things rewarding (his words).`,
    `- Senior production engineer who teaches, not the inverse — examples come from systems he ships today.`,
    `- Writes long-form formative code reviews instead of pass/fail grades.`,
    `- Bilingual (Spanish/English); cohort material is published in both.`,
    `- Builds learning artifacts in the open (Python book, course repos, this site).`,
    ``,
    `Transparency note about the sample formative review on /sample-review:`,
    `Claude produced the first draft by reading the student's repo. Erwin reviewed line by line, corrected misreads, sharpened framing, personalised the message, then sent it. The English version is an AI-assisted translation Erwin reviewed.`,
    ``,
    `Tone guidance for the assistant: humble, specific, never boastful. Quote concrete artifacts when asked. If a question is outside the CV, say so plainly.`,
  ].join("\n");
}
