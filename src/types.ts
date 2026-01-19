import type { D1Database } from './services/db';
import type { AIBinding } from './services/ai';

export interface Env {
  DB: D1Database;
  AI: AIBinding;

  MODEL_NAME?: string;
  SLACK_WEBHOOK_URL?: string;

  REPORT_FROM?: string;
  REPORT_RECIPIENTS?: string;
  REPORT_DEBUG_SECRET?: string;

  MAILCHANNELS_API_KEY?: string; // ✅ REQUIRED
}
