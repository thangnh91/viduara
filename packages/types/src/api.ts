// Standard API response envelope used by all apps/api endpoints

export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// Auth
export interface SendMagicLinkRequest {
  email: string;
}

export interface SendMagicLinkResponse {
  message: string;
}

// Chat
export interface SendMessageRequest {
  sessionId: string;
  content: string;
}
