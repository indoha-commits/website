import { ENV } from "./env";

export interface LeadPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message?: string;
  country?: string;
  volume?: string;
  source_page?: string;
  pricing_tier?: 'starter' | 'growth' | 'custom';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export type LeadError = { message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(payload: LeadPayload): string | null {
  if (!payload.name?.trim()) return "Please enter your name.";
  if (!payload.company?.trim()) return "Please enter your company.";
  if (!payload.email?.trim()) return "Please enter your email.";
  if (!EMAIL_RE.test(payload.email.trim())) return "Please enter a valid email address.";
  return null;
}

/**
 * POST a walkthrough request lead to the InDataFlow Worker.
 * Returns `{ ok: true }` only when the backend confirms success; otherwise a
 * human-readable error message suitable for display next to the form.
 */
export async function submitLead(payload: LeadPayload): Promise<
  | { ok: true }
  | { ok: false; error: string }
> {
  const baseUrl = ENV.MT_WORKER_BASE_URL || ENV.API_BASE_URL;
  if (!baseUrl) {
    return { ok: false, error: "Lead submission is not configured yet. Please email hello@indataflow.com instead." };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(`${baseUrl}/public/lead`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      let serverError = "";
      try {
        const data = (await res.json()) as { error?: string; detail?: string };
        serverError = data.error || data.detail || "";
      } catch {
        // ignore unparseable error body
      }
      if (res.status === 429) {
        return { ok: false, error: "Too many attempts. Please wait a moment and try again." };
      }
      if (res.status >= 500) {
        return { ok: false, error: "Something went wrong on our side. Please try again in a moment." };
      }
      return {
        ok: false,
        error: serverError || `We couldn't submit the form (${res.status}). Please try again.`,
      };
    }

    const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
    if (!data?.ok) {
      return { ok: false, error: "We couldn't confirm your submission. Please try again." };
    }

    return { ok: true };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return { ok: false, error: "The request timed out. Please check your connection and try again." };
    }
    return { ok: false, error: "Network error. Please check your connection and try again." };
  } finally {
    clearTimeout(timeout);
  }
}
