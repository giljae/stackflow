#!/bin/bash
# scripts/install.sh
# 
# Installs stackflow into the global Antigravity environment via symlinks.
# This allows you to develop in the workspace while changes immediately reflect globally.

set -e

ANTIGRAVITY_HOME="${HOME}/.gemini/antigravity"
WORKSPACE_DIR="$(pwd)"

echo "🚀 Installing stackflow into Antigravity..."

# Validate we are in the right directory
if [ ! -d "skills" ] || [ ! -d "workflows" ]; then
    echo "❌ Error: Please run this script from the root of the stackflow repository."
    exit 1
fi

echo "🔗 Symlinking Skills..."
for skill_dir in skills/stackflow-*; do
    if [ -d "$skill_dir" ]; then
        skill_name=$(basename "$skill_dir")
        target="${ANTIGRAVITY_HOME}/skills/${skill_name}"
        
        # Remove existing if it exists
        if [ -e "$target" ]; then
            rm -rf "$target"
        fi
        
        ln -s "${WORKSPACE_DIR}/${skill_dir}" "$target"
        echo "   - Linked @${skill_name}"
    fi
done

# The workflows can remain in the workspace or be linked if Antigravity relies on a global workflows repo.
# For now, linking the skills is what binds development to global @ commands.

echo ""
echo "✅ Install complete!"
echo "You can now use @sf-think, @sf-plan, and other stackflow commands from any project."
