#!/bin/bash
# scripts/sync-upstream.sh
# 
# A script to sync official guidelines and markdown references
# from both Gstack and Superpowers upstream repositories into our references directory.

set -e

WORKSPACE_DIR="$(pwd)"
UPSTREAMS_DIR="${WORKSPACE_DIR}/.upstreams"
REFS_DIR="${WORKSPACE_DIR}/references"

echo "🔄 Initiating sync from upstream true sources..."

mkdir -p "$UPSTREAMS_DIR"
mkdir -p "$REFS_DIR/gstack"
mkdir -p "$REFS_DIR/superpowers"

# 1. Sync Gstack
if [ -d "$UPSTREAMS_DIR/gstack" ]; then
    echo "Updating garrytan/gstack..."
    cd "$UPSTREAMS_DIR/gstack" && git pull --quiet
    cd "$WORKSPACE_DIR"
else
    echo "Cloning garrytan/gstack..."
    git clone --quiet https://github.com/garrytan/gstack.git "$UPSTREAMS_DIR/gstack"
fi

# 2. Sync Superpowers
if [ -d "$UPSTREAMS_DIR/superpowers" ]; then
    echo "Updating obra/superpowers..."
    cd "$UPSTREAMS_DIR/superpowers" && git pull --quiet
    cd "$WORKSPACE_DIR"
else
    echo "Cloning obra/superpowers..."
    git clone --quiet https://github.com/obra/superpowers.git "$UPSTREAMS_DIR/superpowers"
fi

echo "📦 Aggregating SKILL and Agent definition references..."

# Copy Gstack agent profiles
# Gstack holds its prompts likely in markdown files or agents directory. 
# We copy all .md and .agent.md safely.
find "$UPSTREAMS_DIR/gstack" -type f \( -name "*.md" -o -name "*.agent.md" \) -exec cp {} "$REFS_DIR/gstack/" \; 2>/dev/null || true

# Copy Superpowers
find "$UPSTREAMS_DIR/superpowers" -type f -name "SKILL.md" | while read -r skill_file; do
    skill_name=$(basename "$(dirname "$skill_file")")
    cp "$skill_file" "$REFS_DIR/superpowers/${skill_name}.md" 2>/dev/null || true
done

echo "✅ Sync complete. Original prompts are now cached in ./references"
echo "Stackflow SKILLS can now read the true source of these methodologies."
