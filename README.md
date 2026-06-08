# cv-bytebytego

> A one-page application for a part-time teaching role at [ByteByteGo](https://bytebytego.com), built openly with Claude Code so the work itself is the demo.

**Live site:** https://cv-bytebytego.vercel.app
**Author:** Erwin Agüero · [enaguero@gmail.com](mailto:enaguero@gmail.com) · [GitHub](https://github.com/enaguero) · [LinkedIn](https://www.linkedin.com/in/enaguero/)

The site presents a teaching journey (university TA → 4Geeks Academy → Python book → ByteByteGo), three areas I'd love to teach (System Design, Agentic AI Coding, AI Automation), and a small live chat that calls Claude with my CV as system context — the same pattern I'd use in lesson one of the Agentic AI track.

---

## How AI was used to build this — honest version

The site is meant to *demonstrate* agentic AI work, not just describe it, so being honest about the build is part of the deliverable.

- **Pair programming with Claude Code.** Every commit that involved Claude carries a `Co-Authored-By: Claude` line in the message. Skim the [commit history](https://github.com/enaguero/cv-bytebytego/commits/main) for the trail.
- **Iterative editing.** I drove direction (tone, structure, what to keep humble); Claude scaffolded components, suggested CSS approaches, drafted copy I then rewrote.
- **The sample formative review** at [`/sample-review`](https://cv-bytebytego.vercel.app/sample-review) was AI-drafted by Claude reading the student's repository, then reviewed line-by-line by me — correcting misreads, sharpening framing, personalising the message. The page itself ([How this was written](https://cv-bytebytego.vercel.app/sample-review#how-this-was-written)) is explicit about this.
- **The English translation** of that Spanish-language review was also AI-assisted; I reviewed it.
- **The "Ask my CV" chat** is a live Claude endpoint — readers can interrogate the CV directly. It's instructed to admit when it doesn't know.

What AI didn't do: it didn't have opinions about my career, write the teaching journey from imagination, or invent any of the differentiators on the "Why me" section. Those came from me; Claude helped me phrase them.

---

## Stack

- **[Astro 5](https://astro.build)** — server-rendered.
- **[Tailwind CSS 4](https://tailwindcss.com)** — CSS-first config in `src/styles/global.css`.
- **[Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript)** — `claude-sonnet-4-6` for the chat endpoint.
- **Dual adapter:** [`@astrojs/vercel`](https://docs.astro.build/en/guides/integrations-guide/vercel/) for production, [`@astrojs/node`](https://docs.astro.build/en/guides/integrations-guide/node/) for Docker / local dev. `astro.config.mjs` switches automatically on `process.env.VERCEL`.
- **[Vercel Analytics](https://vercel.com/docs/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights)** — official `<Analytics />` / `<SpeedInsights />` Astro components.
- **Docker** — multi-stage Alpine build, non-root user, healthcheck.

## Project layout

```
src/
  pages/
    index.astro             ← composes the home page
    sample-review.astro     ← long-form formative review (translated)
    api/ask.ts              ← POST endpoint, calls Claude with CV as context
  components/
    Hero.astro
    TeachingJourney.astro   ← timeline of teaching arc
    WhyMe.astro             ← differentiators + opening quote
    Tracks.astro            ← the three ByteByteGo tracks
    Evidence.astro          ← teaching artifacts + how-I-teach
    AskMyCV.astro           ← chat widget (vanilla JS, no framework)
    Contact.astro
  data/cv.ts                ← single source of truth — UI + AI grounding
  layouts/Layout.astro      ← shared <html> shell, Analytics, Speed Insights
  styles/global.css         ← Tailwind 4 tokens + prose styles
astro.config.mjs            ← dual adapter (Vercel | Node)
Dockerfile                  ← multi-stage Node 22 / Alpine
docker-compose.yml          ← reads ANTHROPIC_API_KEY from the shell
Makefile                    ← `make up`, `make dev`, etc.
```

Editing `src/data/cv.ts` updates both the visible page and the chat's grounding context.

---

## Run locally

### 1. Set the API key once

The chat endpoint needs an Anthropic API key. The recommended flow is [direnv](https://direnv.net/):

```bash
cp .envrc.example .envrc           # template
$EDITOR .envrc                     # paste your real key from console.anthropic.com
direnv allow                       # auto-exports on cd into the project
```

Without direnv:

```bash
source .envrc
```

The key never enters the Docker image, never lands in git (`.envrc` is gitignored), and `docker-compose.yml` injects it from the shell at run time.

### 2. Start the site

Pick one:

```bash
make up        # docker, foreground, logs visible, Ctrl-C to stop
make up-d      # docker, detached
make dev       # native Astro dev server, hot reload (no Docker)
```

All three serve at <http://localhost:4321>. The Makefile fails fast with a helpful error if `ANTHROPIC_API_KEY` isn't exported.

### Other `make` targets

```
make help     # show this list
make down     # stop & remove containers
make logs     # tail container logs
make ps       # container status
make sh       # shell into the running container
make health   # curl /, print status + title
make clean    # down + remove the image
```

---

## Deploy

### Vercel (production)

1. Import the repo at <https://vercel.com/new>.
2. Astro is auto-detected; defaults are correct.
3. Add `ANTHROPIC_API_KEY` (and optionally `ASK_DAILY_LIMIT`) under Environment Variables.
4. Deploy. Every push to `main` redeploys.
5. Enable **Analytics** and **Speed Insights** on the project tabs — the components are already wired up.

The Vercel adapter takes over because Vercel sets `VERCEL=1` during its build.

### Any Docker host (Fly, Railway, Render, Cloud Run, etc.)

The `Dockerfile` produces a minimal Node-server image. The Node adapter takes over when `VERCEL` isn't set.

```bash
# Fly example
fly launch
fly secrets set ANTHROPIC_API_KEY=sk-ant-...
fly deploy
```

---

## Environment variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | yes (for chat) | — | Key from console.anthropic.com |
| `ASK_DAILY_LIMIT` | no | `100` | Per-IP daily cap on chat requests |
| `PORT` | no | `4321` | Server listen port (Node adapter only) |
| `HOST` | no | `0.0.0.0` | Bind interface (Node adapter only) |

The static page renders without the key; only the chat returns a 503 with a clear message.

---

## License

MIT — feel free to fork as a template for your own application page.
