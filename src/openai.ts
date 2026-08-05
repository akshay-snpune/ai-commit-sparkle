import * as vscode from 'vscode';

export async function generateWithOpenAI(
  diff: string,
  customInstructions: string
): Promise<string> {
  const config = vscode.workspace.getConfiguration('aiCommitSparkle');
  let apiKey = config.get<string>('openai.apiKey', '');

  // Fall back to environment variable if not set in config
  if (!apiKey) {
    apiKey = process.env.OPENAI_API_KEY || '';
  }

  if (!apiKey) {
    throw new Error(
      'OpenAI API key not configured. Set it in settings or OPENAI_API_KEY environment variable.'
    );
  }

  const model = config.get<string>('openai.model', 'gpt-4o-mini');

  const prompt = `${customInstructions}

Analyze the following git diff and generate a short, concise conventional commit message.
Only output the commit message, nothing else.

Git diff:
${diff}

Commit message:`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const error = await response.json() as { error?: { message?: string } };
      throw new Error(error?.error?.message || `OpenAI API error: ${response.statusText}`);
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };

    if (!data.choices || !data.choices[0]) {
      throw new Error('OpenAI returned no response');
    }

    let message = data.choices[0].message.content.trim();

    // Remove any leading/trailing quotes if present
    if (message.startsWith('"') && message.endsWith('"')) {
      message = message.slice(1, -1);
    }

    if (!message) {
      throw new Error('OpenAI returned empty response.');
    }

    return message;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    throw new Error(`OpenAI error: ${errorMsg}`);
  }
}
