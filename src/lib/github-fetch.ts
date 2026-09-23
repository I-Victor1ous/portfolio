import { readFileSync } from "node:fs";
import { request as httpsRequest, Agent } from "node:https";
import { URL } from "node:url";
import { caBundlePath } from "@/src/lib/ensure-ca";

let agent: Agent | undefined;

function getAgent(): Agent | undefined {
  const pem = caBundlePath();
  if (!pem) return undefined;

  if (!agent) {
    agent = new Agent({
      ca: readFileSync(pem, "utf8"),
    });
  }
  return agent;
}

function headersToRecord(headers?: HeadersInit): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) {
    const out: Record<string, string> = {};
    headers.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  }
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }
  return { ...headers };
}

/** GitHub API fetch with Windows CA bundle when `.certs/extra.pem` exists. */
export async function githubFetch(
  url: string,
  init?: RequestInit,
): Promise<Response> {
  const customAgent = getAgent();
  if (!customAgent) {
    return fetch(url, init);
  }

  const parsed = new URL(url);
  const method = init?.method ?? "GET";
  const headers = headersToRecord(init?.headers);
  const body =
    typeof init?.body === "string"
      ? init.body
      : init?.body
        ? String(init.body)
        : undefined;

  return new Promise((resolve, reject) => {
    const req = httpsRequest(
      {
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: `${parsed.pathname}${parsed.search}`,
        method,
        headers,
        agent: customAgent,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          const responseBody = Buffer.concat(chunks);
          const responseHeaders = new Headers();
          for (const [key, value] of Object.entries(res.headers)) {
            if (value === undefined) continue;
            if (Array.isArray(value)) {
              value.forEach((v) => responseHeaders.append(key, v));
            } else {
              responseHeaders.set(key, value);
            }
          }
          resolve(
            new Response(responseBody, {
              status: res.statusCode ?? 500,
              statusText: res.statusMessage,
              headers: responseHeaders,
            }),
          );
        });
      },
    );

    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}
