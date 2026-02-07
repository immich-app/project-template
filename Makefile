DOCKER_COMPOSE_FILE := docker/docker-compose.yml

.PHONY: dev dev-down open-api open-api-dart open-api-typescript \
        build-server build-web test-server test-medium test-e2e \
        lint-server lint-web format

dev:
	@trap 'make dev-down' EXIT; COMPOSE_BAKE=true docker compose -f ./docker/docker-compose.dev.yml up --remove-orphans

dev-down:
	docker compose -f ./docker/docker-compose.dev.yml down --remove-orphans

dev-update:
	@trap 'make dev-down' EXIT; COMPOSE_BAKE=true docker compose -f ./docker/docker-compose.dev.yml up --build -V --remove-orphans

# OpenAPI SDK generation
open-api:
	cd open-api && ./bin/generate-open-api.sh

# Build targets
build-server:
	pnpm --filter immich build

build-web:
	pnpm --filter web build

# Test targets
test-server:
	pnpm --filter immich test

test-medium:
	pnpm --filter immich test:medium

test-e2e:
	pnpm --filter immich-e2e test

# Lint & format
lint-server:
	pnpm --filter immich lint

lint-web:
	pnpm --filter web lint

format:
	pnpm format

# Install dependencies
install:
	pnpm install

# Clean everything
clean:
	docker compose -f $(DOCKER_COMPOSE_FILE) down -v --remove-orphans
	rm -rf node_modules server/node_modules web/node_modules e2e/node_modules
