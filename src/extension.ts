import * as vscode from 'vscode';
import { execSync } from 'child_process';
import { generateWithOllama } from './ollama';
import { generateWithOpenAI } from './openai';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'ai-commit-sparkle.generateCommitMessage',
    async () => {
      try {
        await generateCommitMessage();
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`AI Commit Sparkle: ${message}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

async function generateCommitMessage(): Promise<void> {
  // Get git diff
  let diff: string;
  try {
    diff = execSync('git diff --cached', { encoding: 'utf-8' });
  } catch {
    throw new Error('No staged changes found. Stage changes with `git add` first.');
  }

  if (!diff.trim()) {
    throw new Error('No staged changes to commit.');
  }

  // Show progress
  vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Window,
      title: 'Generating commit message...',
    },
    async () => {
      const config = vscode.workspace.getConfiguration('aiCommitSparkle');
      const provider = config.get<string>('provider', 'ollama');
      const customInstructions = config.get<string>(
        'customInstructions',
        'Use Conventional Commits format.'
      );

      let commitMessage: string;

      if (provider === 'openai') {
        commitMessage = await generateWithOpenAI(diff, customInstructions);
      } else {
        commitMessage = await generateWithOllama(diff, customInstructions);
      }

      // Set the SCM input box value
      const scm = vscode.scm;
      if (scm.inputBox) {
        scm.inputBox.value = commitMessage;
      }

      // Show notification if enabled
      if (config.get<boolean>('showNotification', true)) {
        vscode.window.showInformationMessage('Commit message generated!');
      }
    }
  );
}

export function deactivate() { }
