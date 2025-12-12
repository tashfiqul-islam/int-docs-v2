import { openapi } from "@/lib/openapi";

// Runtime proxy for playground/API calls (not available in static export)
export const revalidate = false;
export const dynamic = "force-dynamic";

const isDevelopment = process.env.NODE_ENV === "development";

const allowedOrigins = [
  "http://192.168.68.55:3000",
  "http://localhost:3000",
  "https://api-sandbox.fndev.net",
];

const handlers = openapi.createProxy({
  allowedOrigins,
  overrides: {
    request: (request: Request) => {
      const authHeader = request.headers.get("authorization");

      if (isDevelopment && authHeader) {
        console.log(
          `[Proxy Override] Authorization header: "${authHeader.substring(0, 30)}${
            authHeader.length > 30 ? "..." : ""
          }"`
        );
      }

      if (
        authHeader &&
        !authHeader.startsWith("Bearer ") &&
        !authHeader.startsWith("Basic ")
      ) {
        if (isDevelopment) {
          console.log(
            `[Proxy Override] Fixing Bearer token: "${authHeader.substring(
              0,
              20
            )}..." -> "Bearer ${authHeader.substring(0, 20)}..."`
          );
        }

        const headers = new Headers(request.headers);
        headers.set("authorization", `Bearer ${authHeader}`);

        return new Request(request.url, {
          method: request.method,
          headers,
          body: request.body,
          cache: request.cache,
          credentials: request.credentials,
          integrity: request.integrity,
          keepalive: request.keepalive,
          mode: request.mode,
          redirect: request.redirect,
          referrer: request.referrer,
          referrerPolicy: request.referrerPolicy,
          signal: request.signal,
        });
      }

      return request;
    },
  },
});

function getRequestOrigin(request: Request): string {
  return request.headers.get("origin") || "*";
}

function createCorsHeaders(response: Response, requestOrigin: string): Headers {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", requestOrigin);
  headers.set("Access-Control-Allow-Credentials", "true");
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS"
  );
  headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  const contentType = response.headers.get("content-type");
  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  headers.delete("content-encoding");
  headers.delete("transfer-encoding");

  return headers;
}

function wrapHandler(
  handler: (req: Request) => Promise<Response>,
  method: string
) {
  return async (request: Request): Promise<Response> => {
    if (isDevelopment) {
      console.log(`[Proxy ${method}]`, request.url);
    }

    try {
      const response = await handler(request);
      const requestOrigin = getRequestOrigin(request);
      const corsHeaders = createCorsHeaders(response, requestOrigin);

      if (isDevelopment && response.status >= 400) {
        const cloned = response.clone();
        const body = await cloned.text().catch(() => "");
        console.error(
          `[Proxy ${method}] Error ${response.status}:`,
          body.slice(0, 200)
        );
      }

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: corsHeaders,
      });
    } catch (error) {
      console.error(`[Proxy ${method}] Error:`, error);
      const requestOrigin = getRequestOrigin(request);
      const errorMessage =
        error instanceof Error ? error.message : "Internal proxy error";

      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        statusText: "Internal Server Error",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": requestOrigin,
          "Access-Control-Allow-Credentials": "true",
        },
      });
    }
  };
}

export const POST = wrapHandler(handlers.POST, "POST");
export const GET = wrapHandler(handlers.GET, "GET");
export const HEAD = wrapHandler(handlers.HEAD, "HEAD");
export const PUT = wrapHandler(handlers.PUT, "PUT");
export const PATCH = wrapHandler(handlers.PATCH, "PATCH");
export const DELETE = wrapHandler(handlers.DELETE, "DELETE");

export function OPTIONS(request: Request): Response {
  const requestOrigin = getRequestOrigin(request);
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": requestOrigin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods":
        "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Max-Age": "86400",
    },
  });
}
