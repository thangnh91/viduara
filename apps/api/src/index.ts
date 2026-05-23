import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "@/config/env";
import { health } from "@/application/routes/health";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: env.WEB_URL,
    credentials: true,
  })
);

// Routes
app.route("/health", health);

// 404 fallback
app.notFound((c) => c.json({ error: { code: "NOT_FOUND", message: "Route not found" } }, 404));

// Start server
serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.warn(`LUMINA API running on http://localhost:${String(info.port)}`);
  }
);

export type AppType = typeof app;
