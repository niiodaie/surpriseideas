import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [ideas, setIdeas] = useState([
    "Surprise picnic",
    "Custom gift box",
    "Adventure day",
  ]);

  const sendEmail = async () => {
    if (!email) return alert("Please enter an email address.");
    try {
      await axios.post("/api/send-email", { email, ideas });
      alert("Surprise ideas sent!");
    } catch (error) {
      alert("Failed to send email.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 px-4 py-10">
      <main className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Surprise Ideas Generator</h1>
        <ul className="text-left text-lg space-y-2 mb-6">
          {ideas.map((idea, index) => (
            <li key={index} className="list-disc list-inside">
              {idea}
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-96 border border-gray-300 px-4 py-2 rounded-md"
          />
          <button
            onClick={sendEmail}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send to Email
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-16">
        <p>
          Built with 💡 by{" "}
          <a
            href="https://visnec.ai"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visnec
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/niiodaie/surpriseideas"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
