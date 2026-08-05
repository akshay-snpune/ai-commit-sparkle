# Publishing Guide: AI Commit Sparkle

## Overview

Your extension is complete and ready to publish. Follow these steps to:

1. Push to GitHub
2. Publish to VS Code Marketplace
3. (Optional) Publish to Open VSX Registry

---

## Step 1: Create a GitHub Repository

### 1a. Create the repo on GitHub

1. Go to https://github.com/new
2. **Repository name**: `ai-commit-sparkle`
3. **Description**: `Generate conventional commit messages using AI (Ollama or OpenAI) with a sparkle button in VS Code's Source Control panel.`
4. **Public** (for open-source)
5. **Initialize with**: Nothing (we already have code)
6. Click **Create repository**

### 1b. Push your local code to GitHub

```bash
cd ~/Documents/Projects/ai-commit-sparkle

# Add the GitHub remote
git remote add origin https://github.com/akshay-snpune/ai-commit-sparkle.git

# Create main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

Verify at: https://github.com/akshay-snpune/ai-commit-sparkle

---

## Step 2: Create a VS Code Marketplace Publisher Account

### 2a. Create a Microsoft/GitHub account (if you don't have one)

1. Go to https://marketplace.visualstudio.com
2. Click **Publish extensions**
3. Sign in with Microsoft account OR GitHub account
   - (Recommended: use GitHub - click "Sign in with GitHub")
   - Authorize the app

### 2b. Create a Publisher profile

1. After sign-in, go to https://marketplace.visualstudio.com/manage
2. Click **Create Publisher**
3. **Publisher ID**: `akshay-snpune` (matches your GitHub username)
4. **Publisher name**: Your display name (can be "Akshay Jadhav" or your brand)
5. Click **Create**

### 2c. Generate a Personal Access Token (PAT)

1. Go to https://dev.azure.com/_usersSettings/tokens
2. Click **+ New Token**
3. **Name**: `vscode-marketplace`
4. **Organization**: Select "All accessible organizations"
5. **Expiration**: 1 year (or custom)
6. **Scopes**: Scroll down and select:
   - ✅ `Marketplace (manage)`
7. Click **Create**
8. **Copy the token immediately** (you won't see it again!)

**Save this token safely** — you'll need it for publishing.

---

## Step 3: Publish to VS Code Marketplace

### 3a. Install vsce (VS Code Extension CLI)

```bash
npm install -g @vscode/vsce
```

### 3b. Create a release tag

```bash
cd ~/Documents/Projects/ai-commit-sparkle

# Tag version 0.1.0
git tag v0.1.0
git push origin v0.1.0
```

### 3c. Publish to marketplace

```bash
cd ~/Documents/Projects/ai-commit-sparkle

# Login (interactive - paste your PAT when prompted)
vsce login akshay-snpune

# Publish
vsce publish

# Or publish in one command with your PAT:
vsce publish --pat <YOUR_PAT_HERE>
```

**Expected output**:

```
✓ Packaged: /path/to/ai-commit-sparkle-0.1.0.vsix (X.Xkb)
✓ Published akshay-snpune.ai-commit-sparkle@0.1.0
Your extension will be available on the Marketplace in a few minutes.
```

### 3d. Verify publication

1. Go to https://marketplace.visualstudio.com/manage
2. Look for **ai-commit-sparkle** in your publishers
3. Click it to view the public listing
4. Also search on marketplace: https://marketplace.visualstudio.com/search?term=ai-commit-sparkle

---

## Step 4: (Optional) Publish to Open VSX Registry

Open VSX is an open-source alternative marketplace (good for VS Code alternatives like Gitpod).

### 4a. Create Open VSX account

1. Go to https://open-vsx.org/auth/github
2. Sign in with GitHub (authorize)

### 4b. Generate Open VSX Token

1. Go to https://open-vsx.org/user/settings/tokens
2. Click **Generate Token**
3. Copy the token

### 4c. Publish to Open VSX

```bash
npm install -g ovsx

cd ~/Documents/Projects/ai-commit-sparkle

# Publish
ovsx publish --pat <YOUR_OPEN_VSX_TOKEN>
```

---

## Step 5: Set Up CI/CD (Automated Publishing)

Now that you have your PAT, set it up for automated publishing on GitHub:

### 5a. Add GitHub Secrets

1. Go to https://github.com/akshay-snpune/ai-commit-sparkle/settings/secrets/actions
2. Click **New repository secret**
3. **Name**: `VSCODE_MARKETPLACE_TOKEN`
4. **Value**: Paste your PAT from Step 2c
5. Click **Add secret**

(Optional for Open VSX): 6. Click **New repository secret** again 7. **Name**: `OPEN_VSX_TOKEN` 8. **Value**: Paste your Open VSX token from Step 4b 9. Click **Add secret**

### 5b. Workflow Setup

The workflow file (`.github/workflows/publish.yml`) is already set up. It will:

- Trigger on any `v*` tag push
- Install dependencies
- Build the extension
- Publish to VS Code Marketplace
- (Optionally) publish to Open VSX

### 5c. Future Publishing

From now on, to publish a new version:

```bash
cd ~/Documents/Projects/ai-commit-sparkle

# Update version in package.json (e.g., 0.2.0)
npm version minor  # or patch/major

# Push with tag
git push origin main --tags

# GitHub Actions will automatically publish!
```

---

## Troubleshooting

### "Authentication failed"

→ Verify your PAT is correct and has `Marketplace (manage)` scope

### "Publisher not found"

→ Ensure publisher ID matches: `akshay-snpune`

### "Package too large"

→ Check .vscodeignore is filtering `node_modules`, `src`, `dist` etc.

### "Icon not found"

→ Optional: Add a 128x128 PNG icon at `media/icon.png` and rebuild

---

## Summary

**Your extension is now live!** 🎉

Users can find it by searching "AI Commit Sparkle" on:

- https://marketplace.visualstudio.com
- (And https://open-vsx.org if you published there)

They can install with:

```
code --install-extension akshay-snpune.ai-commit-sparkle
```

---

## Next Steps (Optional)

- **Add an icon**: Create `media/icon.png` (128x128)
- **Add repository topics**: Go to GitHub repo settings → Topics, add: `vscode-extension`, `ai`, `git`, `ollama`, `openai`
- **Add GitHub badges**: Add to README.md:
  ```markdown
  [![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/akshay-snpune.ai-commit-sparkle)](https://marketplace.visualstudio.com/items?itemName=akshay-snpune.ai-commit-sparkle)
  [![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/akshay-snpune.ai-commit-sparkle)](https://marketplace.visualstudio.com/items?itemName=akshay-snpune.ai-commit-sparkle)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ```

---

**Questions?** Check VS Code's official publishing guide:  
https://code.visualstudio.com/api/working-with-extensions/publishing-extension
