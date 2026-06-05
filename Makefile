# cv-bytebytego — Makefile wrapping docker compose for a one-command local run.
#
# Usage:
#   make            # same as `make help`
#   make up         # build + start, foreground (you see logs, Ctrl-C to stop)
#   make up-d       # build + start, detached (returns prompt)
#   make down       # stop and remove containers
#   make logs       # tail container logs
#   make sh         # shell into the running container
#   make clean      # remove the image and any dangling state

SHELL := /bin/bash
COMPOSE ?= docker compose
SERVICE ?= web
IMAGE ?= cv-bytebytego:local
URL ?= http://localhost:4321

# Default goal — show help when running `make` with no target.
.DEFAULT_GOAL := help

# ---------------------------------------------------------------------------
# Self-documenting help: any target with a `## description` comment shows up.
# ---------------------------------------------------------------------------
.PHONY: help
help: ## Show this help
	@echo ""
	@echo "  cv-bytebytego — local commands"
	@echo "  ------------------------------"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36mmake %-10s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ""
	@echo "  Default URL: $(URL)"
	@echo ""

# ---------------------------------------------------------------------------
# .env bootstrap — never let the chat 503 just because of a missing file.
# Creates .env from .env.example on first run and warns about the API key.
# ---------------------------------------------------------------------------
.env:
	@if [ ! -f .env ]; then \
		echo "→ Creating .env from .env.example"; \
		cp .env.example .env; \
		echo ""; \
		echo "  ⚠  Edit .env and set ANTHROPIC_API_KEY before the chat will work."; \
		echo "     Get a key at https://console.anthropic.com/"; \
		echo ""; \
	fi

# ---------------------------------------------------------------------------
# Primary targets
# ---------------------------------------------------------------------------
.PHONY: build
build: .env ## Build the Docker image
	$(COMPOSE) build

.PHONY: up
up: .env ## Build + start in the foreground (logs visible, Ctrl-C to stop)
	@echo "→ Starting at $(URL)"
	$(COMPOSE) up --build

.PHONY: up-d
up-d: .env ## Build + start detached (returns your prompt)
	$(COMPOSE) up --build -d
	@echo ""
	@echo "  ✓ Running at $(URL)"
	@echo "  $$ make logs   # to tail logs"
	@echo "  $$ make down   # to stop"
	@echo ""

.PHONY: down
down: ## Stop and remove containers
	$(COMPOSE) down

.PHONY: restart
restart: down up-d ## Restart the container (detached)

.PHONY: logs
logs: ## Tail container logs
	$(COMPOSE) logs -f $(SERVICE)

.PHONY: ps
ps: ## Show container status
	$(COMPOSE) ps

.PHONY: sh
sh: ## Open a shell inside the running container
	$(COMPOSE) exec $(SERVICE) sh

.PHONY: health
health: ## Curl the running site and print HTTP status + title
	@echo "→ $(URL)"
	@curl -sI $(URL) | head -1
	@curl -s $(URL) | grep -oE '<title>[^<]*</title>' || echo "(no title found)"

.PHONY: clean
clean: down ## Stop containers AND remove the image
	-docker rmi $(IMAGE) 2>/dev/null || true
	@echo "✓ Image removed"

# ---------------------------------------------------------------------------
# Native (no Docker) — useful for fast iteration without rebuilds
# ---------------------------------------------------------------------------
.PHONY: dev
dev: .env ## Run Astro dev server locally (no Docker, hot reload)
	npm install
	npm run dev
