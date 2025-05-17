import { useState } from "react";

export default function App() {
  const [ideas] = useState([
    "Surprise picnic",
    "Custom gift box",
    "Adventure day",
  ]);
  const [email, setEmail] = useState("");

  const handleSendEmail = () => {
    // Basic placeholder – logic goes here
    alert(`Ideas will be sent to: ${email}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-md space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Surprise Ideas Generator
        </h1>

        <ul className="text-left list-disc list-inside text-gray-700 space-y-1">
          {ideas.map((idea, index) => (
            <li key={index}>{idea}</li>
          ))}
        </ul>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleSendEmail}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Send to Email
          </button>
        </div>
      </div>
    </main>
  );
}
