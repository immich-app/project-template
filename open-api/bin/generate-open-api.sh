#!/usr/bin/env bash
set -euo pipefail

function typescript {
  pnpm dlx oazapfts --optimistic --argumentStyle=object --useEnumType --allSchemas server-openapi-specs.json typescript-sdk/src/fetch-client.ts
  pnpm --filter @server/sdk install --frozen-lockfile
  pnpm --filter @server/sdk build
}

# Generate OpenAPI spec from server
(
  cd ..
  pnpm --filter immich build
  pnpm --filter immich sync:open-api
  cp server/server-openapi-specs.json open-api/server-openapi-specs.json
)

typescript
