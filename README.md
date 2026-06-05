# cv-bytebytego

A one-page CV / portfolio targeted at the ByteByteGo part-time instructor role,
built as live evidence for the AI tracks I want to teach.

The site is an Astro app served by a small Node server, packaged as a Docker
image. The "Ask my CV" chat is a server endpoint that calls the Claude API with
the CV as system context — so the page itself is a production AI integration,
not just a description of one.

---

## Stack

- **Astro 5** — server-rendered with `@astrojs/node` (standalone)
- **Tailwind CSS 4** — CSS-first config in `src/styles/global.css`
- **Anthropic SDK** — `claude-sonnet-4-6` for the Ask-my-CV endpoint
- **Docker** — multi-stage build → minimal Alpine runtime, non-root, healthcheck
- **GitHub** — source of truth; deploy targets are anywhere that runs containers
  (Fly.io, Railway, Render, Cloud Run, Vercel Container, your own VPS)

## Project layout

```
src/
  pages/
    index.astro          ← main page (composes the components)
    api/ask.ts           ← POST endpoint, calls Claude with CV as context
  components/
    Hero.astro
    Tracks.astro
    Evidence.astro
    AskMyCV.astro        ← chat widget (vanilla JS, no framework)
    Contact.astro
  data/cv.ts             ← single source of truth for all CV content
  layouts/Layout.astro
  styles/global.css      ← Tailwind 4 + design tokens
public/favicon.svg
Dockerfile               ← multi-stage build
docker-compose.yml       ← one-command local run
.dockerignore
```

To change the CV content, edit `src/data/cv.ts` and rebuild the image.

## Quickstart — see it on localhost in one command

```bash
make up        # builds the image, starts the container, streams logs
               # → http://localhost:4321
```

Ctrl-C to stop. First run creates `.env` from `.env.example` automatically;
you only need to drop in a real `ANTHROPIC_API_KEY` for the chat to work.

### All `make` targets

```bash
make            # show help (this list)
make up         # build + start, foreground, Ctrl-C to stop
make up-d       # build + start, detached, returns your prompt
make down       # stop and remove the container
make restart    # down + up-d
make logs       # tail container logs
make ps         # show container status
make sh         # shell into the running container
make health     # curl the site and print HTTP status + page title
make clean      # down + remove the image
make dev        # native Astro dev server (no Docker, hot reload)
```

### Without make (plain docker compose)

```bash
cp .env.example .env       # fill in ANTHROPIC_API_KEY
docker compose up --build  # http://localhost:4321
```

### Without docker (plain Node)

```bash
npm install
cp .env.example .env       # fill in ANTHROPIC_API_KEY
npm run dev                # http://localhost:4321 with hot reload
```

The chat returns a 503 with a clear message if `ANTHROPIC_API_KEY` is missing.
The static page works without it.

### What's in the image

- Base: `node:22-alpine`
- 4 stages: `deps` → `builder` → `prod-deps` → `runtime`
- Runs as non-root user `app`
- Built-in `HEALTHCHECK` hits `/` every 30s
- Final size: ~580MB (most of it is Node + Astro + Anthropic SDK)

## Deploy targets

Pick one — they all take the same image:

### Fly.io (recommended for a quick public URL)
```bash
fly launch              # uses the Dockerfile, asks a few questions
fly secrets set ANTHROPIC_API_KEY=sk-ant-...
fly deploy
```

### Railway
1. New Project → Deploy from GitHub repo
2. Railway detects the Dockerfile automatically
3. Variables tab → add `ANTHROPIC_API_KEY`
4. Push to `main` → auto-deploy

### Render
1. New → Web Service → connect repo
2. Runtime: **Docker** (auto-detected)
3. Environment → add `ANTHROPIC_API_KEY`

### Google Cloud Run
```bash
gcloud run deploy cv-bytebytego \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars ANTHROPIC_API_KEY=sk-ant-...
```

### Push to a registry
```bash
docker tag cv-bytebytego:local ghcr.io/enaguero/cv-bytebytego:latest
docker push ghcr.io/enaguero/cv-bytebytego:latest
```

## Environment variables

| Var | Required | Default | Purpose |
| --- | --- | --- | --- |
| `ANTHROPIC_API_KEY` | yes (for chat) | — | Key from console.anthropic.com |
| `ASK_DAILY_LIMIT` | no | `100` | Per-IP daily cap on chat requests |
| `PORT` | no | `4321` | Server listen port |
| `HOST` | no | `0.0.0.0` | Bind interface |

## Notes on the chat endpoint

- Rate-limited per IP per day, in-memory. Resets when the container restarts.
  Fine for a CV demo — for real production use Redis + a sliding-window limiter.
- System prompt + CV are injected from `src/data/cv.ts` so there's a single
  source of truth between the visible page and the AI grounding.
- Conversation history is trimmed to the last 10 messages.
- Model: `claude-sonnet-4-6`. Switch in `src/pages/api/ask.ts` if you want
  Opus for higher quality (≈10× cost) or Haiku for lower cost.

## What this demonstrates for ByteByteGo

| Track | Evidence on this page |
| --- | --- |
| System Design | Static frontend → containerized Node server → external LLM API. Multi-stage Docker build, non-root runtime, healthcheck, env-driven config, rate limiting, single source of truth between UI and AI grounding. |
| Agentic AI Coding | The entire repo was built collaboratively with Claude Code. `git log` shows the agent-driven build. |
| AI Automation | Build → ship → run as one `docker compose up`. The pipeline IS a Day-1 automation lesson. |

## License

MIT — feel free to fork as a template for your own CV.
