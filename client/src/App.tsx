import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [ideas] = useState([
    "Surprise picnic",
    "Custom gift box",
    "Adventure day",
  ]);

  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-4 py-8 bg-white text-black">
      <main className="w-full max-w-xl flex flex-col items-center gap-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Surprise Ideas Generator
        </h1>

        <ul className="text-left text-lg list-disc pl-5 space-y-1">
          {ideas.map((idea, index) => (
            <li key={index}>{idea}</li>
          ))}
        </ul>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
          Send to Email
        </button>
      </main>

      <Footer />
    </div>
  );
}

export default App;
