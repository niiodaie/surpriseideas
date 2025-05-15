
import { useState } from "react";
import axios from "axios";
import { type Idea } from "@shared/schema";

interface Props {
  ideas: Idea[];
  prompt: string;
}

export default function SendEmailButton({ ideas, prompt }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSend = async () => {
    try {
      setStatus("Sending...");
      const res = await axios.post("/api/email", {
        email,
        ideas,
        prompt
      });
      if (res.status === 200) {
        setStatus("Email sent successfully!");
      } else {
        setStatus("Failed to send email.");
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred while sending the email.");
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <button
        onClick={handleSend}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Send to Email
      </button>
      {status && <p className="text-sm text-gray-600">{status}</p>}
    </div>
  );
}
