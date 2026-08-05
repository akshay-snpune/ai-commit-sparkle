#!/bin/bash

# AI Commit Sparkle - Quick Publishing Script
# This script automates publishing your extension to GitHub and VS Code Marketplace

set -e

PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$PROJECT_DIR"

echo "🚀 AI Commit Sparkle - Publishing Setup"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: GitHub
echo -e "${YELLOW}Step 1: GitHub Setup${NC}"
echo "Before continuing, ensure:"
echo "1. You've created a GitHub repo at: https://github.com/akshay-snpune/ai-commit-sparkle"
echo "2. Repository is PUBLIC (for open-source)"
echo ""
read -p "Press Enter to continue..."

echo ""
echo "Pushing local code to GitHub..."
git remote add origin https://github.com/akshay-snpune/ai-commit-sparkle.git 2>/dev/null || echo "Remote already exists"
git branch -M main
git push -u origin main

echo -e "${GREEN}✓ Code pushed to GitHub${NC}"
echo ""

# Step 2: Marketplace Account
echo -e "${YELLOW}Step 2: VS Code Marketplace Publisher${NC}"
echo "You need to:"
echo "1. Go to: https://marketplace.visualstudio.com/manage"
echo "2. Create a Publisher with ID: akshay-snpune"
echo "3. Generate a Personal Access Token (PAT) with 'Marketplace (manage)' scope"
echo "4. Save the PAT - you'll need it next"
echo ""
read -p "Press Enter after you have your PAT ready..."

echo ""
read -sp "Paste your VS Code Marketplace PAT: " VSCODE_PAT
echo ""

if [ -z "$VSCODE_PAT" ]; then
  echo -e "${RED}✗ No token provided. Aborting.${NC}"
  exit 1
fi

# Step 3: Setup GitHub Secrets
echo ""
echo -e "${YELLOW}Step 3: GitHub Secrets (for CI/CD)${NC}"
echo "Add this secret to GitHub automatically: Settings → Secrets → Actions"
echo ""
echo "Secret Name: VSCODE_MARKETPLACE_TOKEN"
echo "Secret Value: (your PAT above)"
echo ""
echo "Manual setup: https://github.com/akshay-snpune/ai-commit-sparkle/settings/secrets/actions"
read -p "Press Enter after adding the secret to GitHub..."

# Step 4: Publish
echo ""
echo -e "${YELLOW}Step 4: Publishing to VS Code Marketplace${NC}"

# Install vsce if needed
if ! command -v vsce &> /dev/null; then
  echo "Installing @vscode/vsce..."
  npm install -g @vscode/vsce
fi

echo ""
echo "Building extension..."
npm run build

echo ""
echo "Publishing to VS Code Marketplace..."
vsce publish --pat "$VSCODE_PAT"

echo ""
echo -e "${GREEN}✓ Extension published!${NC}"
echo ""
echo "Your extension is now live on the VS Code Marketplace!"
echo "It will be searchable within 15 minutes."
echo ""
echo "View your listing:"
echo "→ https://marketplace.visualstudio.com/items?itemName=akshay-snpune.ai-commit-sparkle"
echo ""

# Step 5: Future updates
echo -e "${YELLOW}Future Updates${NC}"
echo "To publish a new version:"
echo ""
echo "  npm version patch  # or minor/major"
echo "  git push origin main --tags"
echo ""
echo "GitHub Actions will automatically publish the new version!"
echo ""

echo -e "${GREEN}Setup Complete!${NC}"
echo ""
echo "Optional next steps:"
echo "• Add an icon: media/icon.png (128x128 PNG)"
echo "• Add badges to README.md"
echo "• Set up Open VSX publishing (for Gitpod, etc.)"
echo ""
echo "For more details, see: PUBLISHING.md"
