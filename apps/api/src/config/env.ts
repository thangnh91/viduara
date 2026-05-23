import { z } from "zod";

const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3001),

  // Database
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid Neon connection string"),

  // AI
  ANTHROPIC_API_KEY: z.string().min(1, "ANTHROPIC_API_KEY is required"),

  // Email
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  EMAIL_FROM: z.string().email().default("noreply@lumina.app"),

  // Auth
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),
  MAGIC_LINK_EXPIRY_MINUTES: z.coerce.number().default(15),

  // App URLs
  WEB_URL: z.string().url().default("http://localhost:3000"),
  API_URL: z.string().url().default("http://localhost:3001"),

  // Cost controls
  MAX_TOKENS_PER_SESSION: z.coerce.number().default(50000),
  MAX_AI_SPEND_USD: z.coerce.number().default(500),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
