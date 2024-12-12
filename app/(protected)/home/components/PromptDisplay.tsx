"use client";

interface PromptDisplayProps {
  prompt: string;
}

export function PromptDisplay({ prompt }: PromptDisplayProps) {
  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <h3 className="mb-2 font-medium">Prompt:</h3>
      <pre className="whitespace-pre-wrap text-sm text-gray-600">{prompt}</pre>
    </div>
  );
} 