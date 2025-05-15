
import { useState } from "react";
import { Idea } from "@shared/schema";
import { Button } from "@/components/ui/button";
import SendEmailButton from "@/components/send-email-button";

interface ResultsProps {
  ideas: Idea[];
  prompt: string;
  onStartOver: () => void;
  onEmailSent: () => void;
  onError: (message: string) => void;
}

export default function Results({ ideas, prompt, onStartOver }: ResultsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Your Surprise Ideas</h2>
        {ideas.map((idea, index) => (
          <div key={index} className="border p-4 rounded shadow-sm my-2">
            <h3 className="text-lg font-semibold">{idea.title}</h3>
            <p>{idea.description}</p>
          </div>
        ))}
      </div>

      <SendEmailButton ideas={ideas} prompt={prompt} />

      <Button onClick={onStartOver} className="mt-4">
        Start Over
      </Button>
    </div>
  );
}
