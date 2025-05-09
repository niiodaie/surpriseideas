import { useState } from "react";
import IdeasForm from "@/components/ideas-form";
import Results from "@/components/results";
import Notification from "@/components/notification";
import { Idea } from "@shared/schema";

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [notification, setNotification] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({
    visible: false,
    message: "",
    type: "success",
  });

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({
      visible: true,
      message,
      type,
    });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 5000);
  };

  const resetForm = () => {
    setIdeas([]);
    setUserPrompt("");
  };

  const handleEmailSent = () => {
    showNotification("Ideas sent to your email!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Surprise Ideas Generator
            </h1>
            <span className="text-sm text-gray-500">Powered by AI</span>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            {ideas.length === 0 ? (
              <IdeasForm 
                onIdeasGenerated={(generatedIdeas, prompt) => {
                  setIdeas(generatedIdeas);
                  setUserPrompt(prompt);
                }} 
                onError={(message) => showNotification(message, "error")}
              />
            ) : (
              <Results 
                ideas={ideas} 
                prompt={userPrompt} 
                onStartOver={resetForm}
                onEmailSent={handleEmailSent}
                onError={(message) => showNotification(message, "error")}
              />
            )}
          </div>
          
          <Notification
            visible={notification.visible}
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification((prev) => ({ ...prev, visible: false }))}
          />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Surprise Ideas Generator. Powered by OpenAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
