#!/bin/bash
set -e

cd /usr/src/app

echo "Installing dependencies..."
pnpm install

exec "$@"
