import Anthropic from "@anthropic-ai/sdk";
import { env } from "@/config/env";
import type {
  AIGateway,
  CompletionRequest,
  CompletionResponse,
  EmbeddingRequest,
  EmbeddingResponse,
  StreamChunk,
} from "../types";

// Model name mapping — abstract tier → concrete Anthropic model ID
const MODEL_MAP: Record<string, string> = {
  "claude-sonnet": "claude-sonnet-4-5",
  "claude-opus": "claude-opus-4-5",
};

function resolveModel(model: string): string {
  const resolved = MODEL_MAP[model];
  if (!resolved) {
    throw new Error(`Unknown AI model tier: ${model}`);
  }
  return resolved;
}

export class AnthropicProvider implements AIGateway {
  private readonly client: Anthropic;

  constructor() {
    this.client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  }

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    try {
      const response = await this.client.messages.create({
        model: resolveModel(request.model),
        max_tokens: request.maxTokens ?? 1024,
        system: request.systemPrompt,
        messages: request.messages,
      });

      const firstBlock = response.content[0];
      const text = firstBlock?.type === "text" ? firstBlock.text : "";

      return {
        text,
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
        model: response.model,
        stopReason: response.stop_reason === "max_tokens" ? "max_tokens" : "end_turn",
      };
    } catch (error) {
      throw new AIProviderError("Anthropic completion failed", { cause: error });
    }
  }

  async stream(
    request: CompletionRequest,
    onChunk: (chunk: StreamChunk) => void
  ): Promise<CompletionResponse> {
    try {
      let fullText = "";
      let inputTokens = 0;
      let outputTokens = 0;
      let finalModel = resolveModel(request.model);

      const stream = this.client.messages.stream({
        model: resolveModel(request.model),
        max_tokens: request.maxTokens ?? 1024,
        system: request.systemPrompt,
        messages: request.messages,
      });

      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          const delta = event.delta.text;
          fullText += delta;
          onChunk({ delta, done: false });
        }
      }

      const finalMessage = await stream.finalMessage();
      inputTokens = finalMessage.usage.input_tokens;
      outputTokens = finalMessage.usage.output_tokens;
      finalModel = finalMessage.model;

      onChunk({ delta: "", done: true });

      return {
        text: fullText,
        inputTokens,
        outputTokens,
        model: finalModel,
        stopReason:
          finalMessage.stop_reason === "max_tokens" ? "max_tokens" : "end_turn",
      };
    } catch (error) {
      throw new AIProviderError("Anthropic streaming failed", { cause: error });
    }
  }

  // Anthropic does not provide an embeddings API — use OpenAI or a future provider.
  // This stub keeps the interface contract; will be replaced in V1 with real RAG.
  // eslint-disable-next-line @typescript-eslint/require-await
  async embed(_request: EmbeddingRequest): Promise<EmbeddingResponse> {
    throw new AIProviderError(
      "Embeddings not supported by Anthropic provider. Configure an embeddings provider."
    );
  }
}

export class AIProviderError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "AIProviderError";
  }
}
