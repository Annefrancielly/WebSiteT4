import "server-only";
import type { CourseDetailDto, SurfTripDto } from "@/types/public-api";

class PublicApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public url?: string,
  ) {
    super(message);
    this.name = "PublicApiError";
  }
}

function getApiBaseUrl(): string {
  const base =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:3333";

  return base.replace(/\/+$/, "");
}

function getApiTimeoutMs(): number {
  const raw =
    process.env.API_TIMEOUT_MS ||
    process.env.NEXT_PUBLIC_API_TIMEOUT_MS ||
    "8000";

  const parsed = Number(raw);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 8000;
  }

  return parsed;
}

async function apiGet<T>(path: string, revalidateSeconds: number): Promise<T> {
  const base = getApiBaseUrl();
  const url = `${base}${path}`;
  const timeoutMs = getApiTimeoutMs();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      next: { revalidate: revalidateSeconds },
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new PublicApiError(
        `API GET ${path} failed: ${res.status} ${res.statusText}`,
        res.status,
        url,
      );
    }

    const contentType = res.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      throw new PublicApiError(
        `API GET ${path} returned unexpected content-type: ${
          contentType || "unknown"
        }`,
        res.status,
        url,
      );
    }

    return (await res.json()) as T;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new PublicApiError(
        `API GET ${path} timed out after ${timeoutMs}ms`,
        504,
        url,
      );
    }

    if (error instanceof PublicApiError) {
      throw error;
    }

    throw new PublicApiError(
      `API GET ${path} failed due to an unexpected error`,
      undefined,
      url,
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getCourses(): Promise<CourseDetailDto[]> {
  return apiGet<CourseDetailDto[]>("/public/courses", 300);
}

export async function getCourseBySlug(
  slug: string,
): Promise<CourseDetailDto | null> {
  try {
    return await apiGet<CourseDetailDto>(
      `/public/courses/${encodeURIComponent(slug)}`,
      300,
    );
  } catch (error) {
    if (error instanceof PublicApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function getSurfTrips(): Promise<SurfTripDto[]> {
  return apiGet<SurfTripDto[]>("/public/surf-trips", 60);
}

export async function getSurfTripBySlug(
  slug: string,
): Promise<SurfTripDto | null> {
  try {
    return await apiGet<SurfTripDto>(
      `/public/surf-trips/${encodeURIComponent(slug)}`,
      60,
    );
  } catch (error) {
    if (error instanceof PublicApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}