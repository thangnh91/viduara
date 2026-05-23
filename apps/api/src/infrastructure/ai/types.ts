// AI Provider Gateway — type contracts (TAD §7.6)
// Domain layer depends only on these types, never on provider SDKs directly.

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface CompletionRequest {
  model: AIModel;
  systemPrompt: string;
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
}

export interface CompletionResponse {
  text: string;
  inputTokens: number;
  outputTokens: number;
  model: string;
  stopReason: "end_turn" | "max_tokens" | "stop_sequence";
}

export interface StreamChunk {
  delta: string;
  done: boolean;
}

export interface EmbeddingRequest {
  input: string | string[];
  model?: string;
}

export interface EmbeddingResponse {
  embeddings: number[][];
  inputTokens: number;
}

// Model tiers — abstract names map to concrete provider models inside gateway
export type AIModel =
  | "claude-sonnet" // persona conversations (cost-quality balance)
  | "claude-opus"; // final report generation (quality-critical)

export interface AIGateway {
  complete(request: CompletionRequest): Promise<CompletionResponse>;
  stream(
    request: CompletionRequest,
    onChunk: (chunk: StreamChunk) => void
  ): Promise<CompletionResponse>;
  embed(request: EmbeddingRequest): Promise<EmbeddingResponse>;
}
