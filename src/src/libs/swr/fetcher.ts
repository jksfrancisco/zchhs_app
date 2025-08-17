import { toast } from "react-toastify";

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

interface FetchError extends Error {
  info?: ErrorResponse | null;
  status?: number;
}

export const fetcher = async (
  url: string,
  _opts?: { credentials?: string }
): Promise<unknown> => {
  const res = await fetch(`http://localhost:8000${url}`, {
    credentials: "include",
  });

  if (!res.ok) {
    let data: ErrorResponse | null = null;

    try {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = (await res.json()) as ErrorResponse;
      } else {
        data = { message: await res.text() };
      }
    } catch {
      data = null;
    }
    throw res.statusText;
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
};
