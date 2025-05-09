import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateIdeasSchema, type Idea } from "@shared/schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateIdeas } from "@/lib/api";

interface IdeasFormProps {
  onIdeasGenerated: (ideas: Idea[], prompt: string) => void;
  onError: (message: string) => void;
}

export default function IdeasForm({ onIdeasGenerated, onError }: IdeasFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(generateIdeasSchema),
    defaultValues: {
      prompt: "",
      email: "",
    },
  });

  const onSubmit = async (data: { prompt: string; email?: string }) => {
    try {
      setLoading(true);
      
      const response = await generateIdeas(data.prompt, data.email);
      onIdeasGenerated(response.ideas, response.prompt);
    } catch (error) {
      console.error("Error generating ideas:", error);
      onError("Error generating ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-700">What are you looking for?</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., surprise for my best friend" 
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription>
                  Be specific about the occasion or person to get better ideas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-gray-700">Email address (optional)</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    {...field} 
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription>
                  We'll send the ideas to this email address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-indigo-600 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={loading}
            >
              Generate Ideas
            </Button>
          </div>
        </form>
      </Form>

      {loading && (
        <div className="mt-8 text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating creative surprise ideas...</p>
          <p className="text-sm text-gray-500 mt-2">This might take a few seconds</p>
        </div>
      )}
    </>
  );
}
