// AI Provider Gateway — single export point for all AI calls (TAD §7.6, ADR-006)
// Feature code MUST import from here. Never import provider SDKs directly.

import { AnthropicProvider } from "./providers/anthropic";
import type { AIGateway } from "./types";

// Singleton — one gateway instance for the process lifetime
export const aiGateway: AIGateway = new AnthropicProvider();

// Re-export types so callers only need one import
export type { AIGateway, CompletionRequest, CompletionResponse, StreamChunk } from "./types";
