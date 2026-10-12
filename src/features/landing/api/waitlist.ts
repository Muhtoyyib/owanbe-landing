/**
 * Client for the Owambe Space waitlist API.
 *
 * Contract (from /api/docs-json): every response — success or failure — uses the
 * envelope `{ success, statusCode, data?, message }`. `message` is a plain string
 * for most errors but an ARRAY of field messages for 400 validation failures, so
 * it always has to be normalized before being shown to a user.
 */

import {siteConfig} from "@/lib/site-config";
import type {UntrustedValue} from "@/lib/untrusted";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? siteConfig.urls.waitlistApi;

/**
 * The API rejects unrecognized properties outright (400 "property x should not
 * exist"), so the payload must contain only these three keys — and `whoYouAre`
 * must be one of the snake_case enum values, not the kebab-case chip ids.
 */
export type WhoYouAre = "venue_owner" | "event_planner" | "individual" | "couple" | "corporate" | "others";

export interface WaitlistSignup {
  email: string;
  whoYouAre?: WhoYouAre;
  firstName?: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  whoYouAre: WhoYouAre | null;
  firstName: string | null;
  createdAt: string;
}

/** Thrown for any non-2xx response, with the message already flattened. */
export class WaitlistApiError extends Error {
  readonly statusCode: number;
  /** True when this email is already registered (409) — not really a failure. */
  readonly alreadyJoined: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "WaitlistApiError";
    this.statusCode = statusCode;
    this.alreadyJoined = statusCode === 409;
  }
}

/** Collapses the string-or-array `message` field into one displayable line. */
function flattenMessage(message: UntrustedValue, fallback: string): string {
  if (typeof message === "string" && message.length > 0) return message;
  if (Array.isArray(message)) {
    const parts = message.filter((part): part is string => typeof part === "string");
    if (parts.length > 0) return parts.join(". ");
  }
  return fallback;
}

/**
 * The backend runs on a free Render instance that spins down when idle, so the
 * first request after a lull can hang for ~30s before the container wakes. We
 * allow a generous window rather than failing fast, but still cap it so the form
 * cannot spin forever.
 */
const REQUEST_TIMEOUT_MS = 45_000;

async function postJson<T>(path: string, body: UntrustedValue): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    // Network failure, CORS rejection, or the timeout above — indistinguishable
    // from the browser, and all mean "we never got an answer".
    throw new WaitlistApiError("We couldn't reach the server. Please check your connection and try again.", 0);
  }

  // A body is expected on every documented status, but a proxy or cold-start
  // error page can still return non-JSON, so parsing must not throw.
  const payload: UntrustedValue = await response.json().catch(() => null);
  const message = payload && typeof payload === "object" && "message" in payload ? payload.message : undefined;

  if (!response.ok) {
    throw new WaitlistApiError(flattenMessage(message, "Something went wrong. Please try again."), response.status);
  }

  return payload as T;
}

/** Joins the waitlist. Only `email` is required by the API. */
export async function joinWaitlist(signup: WaitlistSignup): Promise<{entry: WaitlistEntry; message: string}> {
  const payload = await postJson<{
    data: WaitlistEntry;
    message: string;
  }>("/api/waitlist", signup);

  return {
    entry: payload.data,
    message: flattenMessage(payload.message, "You're on the list! We'll be in touch soon."),
  };
}

/**
 * Current signup total. Returns null instead of throwing — this only feeds a
 * decorative social-proof line, which falls back to its static copy.
 */
export async function fetchWaitlistCount(): Promise<number | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/waitlist/count`, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) return null;

    const payload: UntrustedValue = await response.json();
    const total = (payload as {data?: {total?: UntrustedValue}} | null)?.data?.total;
    return typeof total === "number" ? total : null;
  } catch {
    return null;
  }
}
