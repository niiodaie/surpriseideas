import { useState } from "react";
import { Idea } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { sendIdeasByEmail } from "@/lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ResultsProps {
  ideas: Idea[];
  prompt: string;
  onStartOver: () => void;
  onEmailSent: () => void;
  onError: (message: string) => void;
}

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function Results({ ideas, prompt, onStartOver, onEmailSent, onError }: ResultsProps) {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSendEmail = async (data: { email: string }) => {
    try {
      setSendingEmail(true);
      await sendIdeasByEmail({
        email: data.email,
        ideas,
        prompt,
      });
      onEmailSent();
      setShowEmailForm(false);
    } catch (error) {
      console.error("Error sending email:", error);
      onError("Failed to send email. Please try again.");
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="space-y-8 mt-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Surprise Ideas</h2>
        <p className="text-gray-600">
          Based on your prompt: <span className="font-medium">{prompt}</span>
        </p>
      </div>

      {ideas.map((idea, index) => (
        <div 
          key={index} 
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-150"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                {index + 1}
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">{idea.title}</h3>
              <p className="text-gray-600">{idea.description}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          variant="outline"
          className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          onClick={onStartOver}
        >
          Generate New Ideas
        </Button>
        
        {!showEmailForm ? (
          <Button 
            className="flex-1 bg-accent hover:bg-purple-600 text-white"
            onClick={() => setShowEmailForm(true)}
          >
            Send to Email
          </Button>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSendEmail)} className="flex-1 flex gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        {...field} 
                        disabled={sendingEmail}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="bg-accent hover:bg-purple-600 text-white"
                disabled={sendingEmail}
              >
                {sendingEmail ? "Sending..." : "Send"}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
