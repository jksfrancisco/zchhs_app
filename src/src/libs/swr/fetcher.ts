// src/libs/swr/fetcher.ts

interface FetchError extends Error {
  info?: unknown;
  status?: number;
}

export const fetcher = async (url: string): Promise<unknown> => {
  const res = await fetch(`http://localhost:8000${url}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const error: FetchError = new Error("An error occurred while fetching the data.");
    try {
      error.info = await res.json();
    } catch {
      error.info = null;
    }
    error.status = res.status;
    throw error;
  }

  return res.json();
};
