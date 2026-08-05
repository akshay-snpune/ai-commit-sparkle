import * as vscode from 'vscode';

export async function generateWithOllama(
  diff: string,
  customInstructions: string
): Promise<string> {
  const config = vscode.workspace.getConfiguration('aiCommitSparkle');
  const endpoint = config.get<string>('ollama.endpoint', 'http://localhost:11434');
  const model = config.get<string>('ollama.model', 'mistral:latest');

  const prompt = `${customInstructions}

Analyze the following git diff and generate a short, concise conventional commit message.
Only output the commit message, nothing else.

Git diff:
${diff}

Commit message:`;

  try {
    const response = await fetch(`${endpoint}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = (await response.json()) as { response: string };
    let message = data.response.trim();

    // Remove any leading/trailing quotes if present
    if (message.startsWith('"') && message.endsWith('"')) {
      message = message.slice(1, -1);
    }

    if (!message) {
      throw new Error('Ollama returned empty response. Check your model and endpoint.');
    }

    return message;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Ollama error: ${errorMsg}. Make sure Ollama is running at ${endpoint} with model ${model}`
    );
  }
}
