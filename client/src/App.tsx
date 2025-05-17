 import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [ideas, setIdeas] = useState(["Surprise picnic", "Custom gift box", "Adventure day"]);
  const [message, setMessage] = useState("");

  const handleSendEmail = async () => {
    try {
      await axios.post("/api/send-email", {
        email,
        ideas,
      });
      setMessage("✅ Surprise ideas sent!");
      setEmail("");
    } catch (error) {
      setMessage("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          🎉 Surprise Ideas Generator
        </h1>

        <ul className="list-disc pl-5 text-gray-700 mb-6">
          {ideas.map((idea, index) => (
            <li key={index}>{idea}</li>
          ))}
        </ul>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSendEmail}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition"
        >
          Send to Email
        </button>

        {message && (
          <p className="mt-4 text-sm text-center text-green-600 font-medium">
            {message}
          </p>
        )}
      </div>

      <footer className="mt-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} Visnec AI Tools
      </footer>
    </div>
  );
};

export default App;
