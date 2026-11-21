// Shared HTTP helpers. Every request is bounded: a stalled API must never hang the CLI
// (or the AI agent that shells out to it).
const USER_AGENT = "vibefather-cli";
export const REQUEST_TIMEOUT_MS = 15_000;

function isTimeout(err: unknown): boolean {
  const name = (err as { name?: string } | null | undefined)?.name;
  return name === "TimeoutError" || name === "AbortError";
}

async function request(url: string, timeoutMs: number): Promise<Response> {
  try {
    return await fetch(url, {
      headers: { "user-agent": USER_AGENT },
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (err) {
    if (isTimeout(err)) throw new Error(`Request timed out after ${timeoutMs / 1000}s: ${url}`);
    throw err;
  }
}

export async function getJson<T>(url: string, timeoutMs = REQUEST_TIMEOUT_MS): Promise<T> {
  const res = await request(url, timeoutMs);
  if (res.status === 404) throw new Error("Template not found. Try: npx vibefather search <query>");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

export async function getText(url: string, timeoutMs = REQUEST_TIMEOUT_MS): Promise<string> {
  const res = await request(url, timeoutMs);
  if (res.status === 404) throw new Error("Template not found. Try: npx vibefather search <query>");
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.text();
}
