import { apiRequest } from "./queryClient";
import { Idea, IdeasResponse, SendEmailInput } from "@shared/schema";

/**
 * Generates ideas based on the given prompt
 */
export async function generateIdeas(prompt: string, email?: string): Promise<IdeasResponse> {
  const response = await apiRequest("POST", "/api/get-ideas", { prompt, email });
  return response.json();
}

/**
 * Sends generated ideas to the specified email
 */
export async function sendIdeasByEmail(data: SendEmailInput): Promise<{ success: boolean }> {
  const response = await apiRequest("POST", "/api/send-email", data);
  return response.json();
}
