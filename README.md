# cv-bytebytego

A one-page CV / portfolio targeted at the ByteByteGo part-time instructor role,
built as live evidence for the AI tracks I want to teach.

The site is a deployed Astro app. The "Ask my CV" chat is a Vercel serverless
function that calls the Claude API with my CV as system context. That makes the
page itself a production AI integration, not just a description of one.

---

## Stack

- **Astro 5** — static-first with server endpoints for the chat API
- **Tailwind CSS 4** — CSS-first config in `src/styles/global.css`
- **Anthropic SDK** — `claude-sonnet-4-6` for the Ask-my-CV endpoint
- **Vercel** — hosting + serverless functions
- **GitHub** — source of truth; pushes to `main` auto-deploy

## Project layout

```
src/
  pages/
    index.astro        ← main page (composes the components)
    api/ask.ts         ← POST endpoint, calls Claude with CV as context
  components/
    Hero.astro
    Tracks.astro
    Evidence.astro
    AskMyCV.astro      ← chat widget (vanilla JS, no framework)
    Contact.astro
  data/
    cv.ts              ← single source of truth for all CV content
  layouts/Layout.astro
  styles/global.css    ← Tailwind 4 + design tokens
public/favicon.svg
```

To change the CV content, edit `src/data/cv.ts` and redeploy.

## Local development

```bash
npm install
cp .env.example .env       # then fill in ANTHROPIC_API_KEY
npm run dev                # http://localhost:4321
```

The chat will return a 503 with a clear message if `ANTHROPIC_API_KEY` is
missing. The static page works without it.

## Deploy to Vercel

### One-time setup

1. Push this repo to GitHub:
   ```bash
   gh repo create cv-bytebytego --public --source=. --push
   ```
2. Import the repo at https://vercel.com/new
3. Add an environment variable in Vercel project settings:
   - `ANTHROPIC_API_KEY` = your key from https://console.anthropic.com/
4. Optional: `ASK_DAILY_LIMIT` (default `100`) to cap daily requests
5. Deploy. Subsequent `git push origin main` auto-deploys.

### Notes on the chat endpoint

- Rate-limited per IP per day in-memory. Resets when the serverless instance
  recycles — fine for a CV demo, not for real production.
- System prompt + CV are injected from `src/data/cv.ts` so there's a single
  source of truth between the visible page and the AI grounding.
- Conversation history is trimmed to the last 10 messages before sending.
- Model: `claude-sonnet-4-6`. Switch in `src/pages/api/ask.ts` if you want
  Opus for higher quality (≈10× cost) or Haiku for lower cost.

## What this demonstrates for ByteByteGo

| Track | Evidence on this page |
| --- | --- |
| System Design | Architecture of the page itself: static frontend → serverless API → external LLM, with rate limiting, error handling, and a single source of truth. |
| Agentic AI Coding | The entire repo was built collaboratively with Claude Code. `git log` shows the agent-driven build. |
| AI Automation | GitHub → Vercel CI/CD. Push to main → live in ~30s. The pipeline IS a Day-1 automation lesson. |

## License

MIT — feel free to fork as a template for your own CV.
