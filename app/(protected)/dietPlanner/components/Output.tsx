"use client";

interface OutputProps {
  completion: string;
}

export function Output({ completion }: OutputProps) {
  if (!completion) return null;
  
  return (
    <div className="p-4 h-full">
      <pre className="whitespace-pre-wrap h-full">{completion}</pre>
    </div>
  );
} 