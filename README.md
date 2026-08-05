# AI Commit Sparkle

Generate conventional commit messages instantly with AI. Click the sparkle button in VS Code's Source Control panel to auto-generate commit messages from your staged changes.

## Features

✨ **One-Click Commit Messages** — Sparkle button in the SCM panel  
🤖 **Dual AI Support** — Use Ollama (local) or OpenAI (cloud)  
📝 **Conventional Commits** — Automatically formatted messages  
⚙️ **Fully Configurable** — Model, endpoint, instructions  
🚀 **Lightweight** — Minimal dependencies, fast execution

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "AI Commit Sparkle"
4. Click Install

Or install directly:

```bash
code --install-extension akshay-snpune.ai-commit-sparkle
```

## Quick Start

### Using Ollama (Recommended for Local Development)

1. **Install Ollama**: https://ollama.ai
2. **Pull a model**:
   ```bash
   ollama pull mistral:latest
   ```
3. **Start Ollama**:
   ```bash
   ollama serve
   ```
4. **In VS Code**, stage your changes:
   ```bash
   git add .
   ```
5. **Click the sparkle button** (✨) in the Source Control panel title bar

### Using OpenAI

1. **Get API Key**: https://platform.openai.com/api-keys
2. **Set your API key** in VS Code settings:
   ```json
   {
     "aiCommitSparkle.provider": "openai",
     "aiCommitSparkle.openai.apiKey": "sk-...",
     "aiCommitSparkle.openai.model": "gpt-4o-mini"
   }
   ```
3. **Stage changes** and click the sparkle button

## Configuration

Open VS Code Settings (Cmd/Ctrl + ,) and search for "AI Commit Sparkle":

### Ollama Settings

- `aiCommitSparkle.provider` — Set to `ollama` (default)
- `aiCommitSparkle.ollama.endpoint` — Ollama API URL (default: `http://localhost:11434`)
- `aiCommitSparkle.ollama.model` — Model name (default: `mistral:latest`)

**Available models**:

- `mistral:latest` — Fast, balanced (recommended)
- `neural-chat:latest` — Optimized for chat
- `codellama:latest` — Code-optimized
- `orca-mini:latest` — Lightweight

### OpenAI Settings

- `aiCommitSparkle.provider` — Set to `openai`
- `aiCommitSparkle.openai.apiKey` — Your API key (or use `OPENAI_API_KEY` env var)
- `aiCommitSparkle.openai.model` — Model (default: `gpt-4o-mini`)

### General Settings

- `aiCommitSparkle.customInstructions` — Custom prompt instructions
- `aiCommitSparkle.showNotification` — Show success notification (default: true)

## Usage

1. Make changes to your code
2. Stage with `git add` (or click the + icon in VS Code)
3. Click the sparkle button (✨) in the Source Control panel
4. The commit message appears in the message box
5. Review and commit with `Ctrl+Enter` / `Cmd+Enter`

## Troubleshooting

### "No staged changes found"

→ Stage your changes first with `git add`

### Ollama connection error

→ Make sure Ollama is running: `ollama serve`  
→ Verify endpoint in settings (default: `http://localhost:11434`)

### OpenAI API error

→ Check your API key is valid and has credits  
→ Verify model name exists (try `gpt-4o-mini` or `gpt-4-turbo`)

### Empty or poor quality messages

→ Try a different model  
→ Customize `customInstructions` in settings  
→ Ensure your diff is meaningful (use `git diff --cached` to preview)

## Settings Examples

**settings.json** with Ollama:

```json
{
  "aiCommitSparkle.provider": "ollama",
  "aiCommitSparkle.ollama.endpoint": "http://localhost:11434",
  "aiCommitSparkle.ollama.model": "mistral:latest",
  "aiCommitSparkle.customInstructions": "Use Conventional Commits. Be concise."
}
```

**settings.json** with OpenAI:

```json
{
  "aiCommitSparkle.provider": "openai",
  "aiCommitSparkle.openai.apiKey": "sk-...",
  "aiCommitSparkle.openai.model": "gpt-4o-mini",
  "aiCommitSparkle.customInstructions": "Generate professional commit messages."
}
```

## How It Works

1. Captures staged Git diff with `git diff --cached`
2. Sends diff + instructions to configured AI provider
3. Receives formatted commit message
4. Populates VS Code's SCM input box
5. You review and commit

## Privacy & Security

- **Ollama (local)**: All processing happens on your machine. No data sent anywhere.
- **OpenAI**: Your code diff is sent to OpenAI's servers. Review their [privacy policy](https://openai.com/privacy).

## Contributing

Found a bug or have a feature request?  
→ Open an issue: https://github.com/akshay-snpune/ai-commit-sparkle/issues

Pull requests welcome!

## License

MIT — See [LICENSE](./LICENSE) file

## Acknowledgments

- Built with VS Code Extension API
- Powered by [Ollama](https://ollama.ai) and [OpenAI](https://openai.com)
- Inspired by GitLens AI and GitHub Copilot

---

**Happy committing!** 🚀
