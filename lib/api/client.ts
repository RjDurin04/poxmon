export const POKEAPI_BASE = "https://pokeapi.co/api/v2";

// --- Rate Limiting ---
const MAX_CONCURRENT = 4;
let activeRequests = 0;
const queue: (() => void)[] = [];

async function acquireSlot() {
    if (activeRequests < MAX_CONCURRENT) {
        activeRequests++;
        return;
    }
    await new Promise<void>(resolve => queue.push(resolve));
    activeRequests++;
}

function releaseSlot() {
    activeRequests--;
    if (queue.length > 0) {
        const next = queue.shift();
        next?.();
    }
}

// --- Generic Fetch Helper ---
type NextFetchOptions = RequestInit & { next?: { revalidate?: number } };

export async function apiFetch<T>(endpoint: string, retries = 3): Promise<T> {
    const url = `${POKEAPI_BASE}${endpoint}`;
    return fetchWithRetry<T>(url, retries);
}

export async function apiFetchUrl<T>(url: string, retries = 3): Promise<T> {
    return fetchWithRetry<T>(url, retries);
}

// Unified fetch with retry & rate limit
async function fetchWithRetry<T>(url: string, retries: number): Promise<T> {
    await acquireSlot();

    try {
        for (let i = 0; i < retries; i++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

                let res: Response;
                try {
                    res = await fetch(url, {
                        next: { revalidate: 3600 },
                        cache: 'force-cache',
                        signal: controller.signal
                    } as NextFetchOptions);
                } finally {
                    clearTimeout(timeoutId);
                }

                if (!res.ok) {
                    if (res.status === 404) throw new Error(`Not Found: ${url}`);
                    // 429 = Too Many Requests -> Backoff hard
                    if (res.status === 429) {
                        throw new Error(`Rate Limited: ${url}`);
                    }
                    throw new Error(`API Error: ${res.status} ${res.statusText}`);
                }

                const text = await res.text();
                // Ensure we handle empty responses gracefully if they are 200 OK
                if (!text) {
                    // Some endpoints might return empty body on purpose, but usually PokeAPI returns JSON.
                    // If we expect JSON but get empty, it is an issue.
                    throw new Error("Empty response body from API");
                }

                try {
                    return JSON.parse(text) as T;
                } catch (jsonError) {
                    throw new Error(`Failed to parse JSON: ${(jsonError as Error).message}`);
                }

            } catch (error: unknown) {
                const isLastRetry = i === retries - 1;
                const errorMessage = error instanceof Error ? error.message : String(error);
                const errorCause = error instanceof Error && error.cause ? ` Cause: ${error.cause}` : '';
                const fullError = `${errorMessage}${errorCause}`;

                // Don't log 404s as errors, just throw
                if (errorMessage.startsWith("Not Found")) throw error;

                // Handle Connect Timeout specifically (usually undici error)
                const isTimeout = fullError.includes("ConnectTimeoutError") || fullError.includes("ETIMEDOUT") || fullError.includes("timeout");

                if (isTimeout) {
                    console.warn(`[API WARN] Timeout accessing ${url} (Attempt ${i + 1}/${retries}). Retrying...`);
                } else {
                    console.error(`[API ERROR] Attempt ${i + 1} failed for ${url}: ${errorMessage}${errorCause}`);
                }

                if (isLastRetry) {
                    throw new Error(`Final attempt failed for ${url}: ${fullError}`);
                }

                // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
            }
        }
    } finally {
        releaseSlot();
    }
    throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}
