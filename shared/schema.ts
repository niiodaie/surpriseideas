import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Create prompt schema for idea generation
export const generateIdeasSchema = z.object({
  prompt: z.string().min(3, {
    message: "Prompt must be at least 3 characters",
  }),
  email: z.string().email().optional(),
});

export type GenerateIdeasInput = z.infer<typeof generateIdeasSchema>;

// Schema for generated idea
export const ideaSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type Idea = z.infer<typeof ideaSchema>;

// Schema for generated ideas response
export const ideasResponseSchema = z.object({
  ideas: z.array(ideaSchema),
  prompt: z.string(),
});

export type IdeasResponse = z.infer<typeof ideasResponseSchema>;

// Schema for sending email
export const sendEmailSchema = z.object({
  email: z.string().email(),
  ideas: z.array(ideaSchema),
  prompt: z.string(),
});

export type SendEmailInput = z.infer<typeof sendEmailSchema>;
