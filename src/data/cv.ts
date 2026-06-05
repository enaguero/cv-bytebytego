// Single source of truth for CV content. Used by the page UI AND injected as
// context into the "Ask my CV" Claude API endpoint. Edit here, redeploy, done.

export const profile = {
  name: "Erwin Aguero",
  handle: "enaguero",
  email: "enaguero@gmail.com",
  github: "https://github.com/enaguero",
  location: "Spain",
  headline:
    "Hands-on engineer & bootcamp instructor — applying to teach at ByteByteGo",
  pitch:
    "I teach a 29-day, cohort-based full-stack bootcamp at 4Geeks Academy Spain (cohort 129). I want to bring that same hands-on, ship-it teaching style to ByteByteGo's System Design, Agentic AI Coding, and AI Automation tracks.",
};

export const tracks = [
  {
    id: "system-design",
    title: "System Design",
    tagline: "From components to production-scale systems.",
    summary:
      "I already teach the building blocks — REST APIs, databases, auth, caching, frontends consuming APIs — across 29 days of cohort-based curriculum. I'm actively going deeper into distributed systems, scaling, and trade-off reasoning (yes, partly to ace senior interviews — which makes me a better explainer for learners walking the same path).",
    bullets: [
      "Curriculum design — break complex topics into progressive, runnable exercises",
      "Whiteboard fluency — trade-offs between consistency, availability, latency, cost",
      "Real artifacts — frontend + backend + DB + auth stack from my 4Geeks repo",
    ],
    proof:
      "github.com/enaguero/4geeks_academy_spain_fs_pt_129 — 7★, 8 forks, 29 days of full-stack lessons",
  },
  {
    id: "agentic-ai-coding",
    title: "Agentic AI Coding",
    tagline: "I built this CV site with an agent. Read the commits.",
    summary:
      "This site is the proof: scaffolded, designed, written, and deployed in collaboration with Claude Code. The chat widget you're using right now is a serverless Claude endpoint. I can teach the loop — prompting, tool use, context management, recovering from agent mistakes — because I do it daily.",
    bullets: [
      "Practical agent workflows — Claude Code, Cursor, MCP tooling",
      "Prompt + context engineering — what to put in the window, what to leave out",
      "Failure modes — when agents go off-rails and how to catch it before it ships",
    ],
    proof:
      "This site's repo: every commit shows the agentic build process end-to-end",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    tagline: "Ship the boring 80% so humans do the interesting 20%.",
    summary:
      "I treat automation as a teaching subject the same way I treat web development: start with a real problem, build the smallest working pipeline, then layer in reliability. The CI/CD that auto-deploys this site on every push is the simplest example — and a great Day 1 lesson.",
    bullets: [
      "Workflow design — identify the leverage point, not the shiniest tool",
      "Serverless + API glue — Vercel functions, webhooks, scheduled jobs",
      "Observability & cost — rate limits, retries, knowing what a run actually costs",
    ],
    proof:
      "GitHub → Vercel pipeline for this site: push to main → live in ~30s",
  },
];

export const teachingEvidence = [
  {
    title: "4Geeks Academy Spain · Full Stack Cohort 129",
    role: "Lead Instructor (part-time)",
    description:
      "29-day cohort-based bootcamp. Frontend (HTML, CSS, Bootstrap, JavaScript, React with hooks + routing), backend (Python, Flask/FastAPI, SQL, SQLAlchemy, JWT), and DevOps fundamentals (Git, GitHub, testing with Jest). Progressive exercises, real projects (Star Wars API, contact manager, todo apps), code-readability focus.",
    metrics: ["7★ on GitHub", "8 forks", "29 days of lessons", "Cohort 129"],
    link: "https://github.com/enaguero/4geeks_academy_spain_fs_pt_129",
  },
];

export const openSource = {
  publicRepos: 211,
  highlights: [
    "Arctic Code Vault Contributor",
    "Pull Shark ×2",
    "Quickdraw",
    "Pair Extraordinaire",
  ],
};

export const teachingPhilosophy = [
  "Show the runnable artifact first; explain the theory after they've seen it work.",
  "Progressive complexity — a 3-step Instagram card before a full photo feed.",
  "Read code with learners the way you read text: out loud, line by line, with questions.",
  "If a concept can be demonstrated with a deployed live URL, deploy it.",
];

/** Compact CV blob fed to Claude as system context. Keep under ~2000 tokens. */
export function asAssistantContext(): string {
  return [
    `Name: ${profile.name}`,
    `Email: ${profile.email}`,
    `GitHub: ${profile.github}`,
    `Location: ${profile.location}`,
    ``,
    `Pitch: ${profile.pitch}`,
    ``,
    `Tracks I want to teach at ByteByteGo:`,
    ...tracks.map(
      (t) =>
        `- ${t.title}: ${t.tagline} | ${t.summary} | Proof: ${t.proof}`,
    ),
    ``,
    `Teaching evidence:`,
    ...teachingEvidence.map(
      (e) =>
        `- ${e.title} (${e.role}): ${e.description} | Metrics: ${e.metrics.join(", ")} | ${e.link}`,
    ),
    ``,
    `Open source footprint: ${openSource.publicRepos} public repos. Badges: ${openSource.highlights.join(", ")}.`,
    ``,
    `Teaching philosophy:`,
    ...teachingPhilosophy.map((p) => `- ${p}`),
  ].join("\n");
}
