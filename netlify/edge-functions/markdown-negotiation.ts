import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const accept = request.headers.get("accept") ?? "";

  // Only intercept if client explicitly wants markdown
  if (!accept.includes("text/markdown")) {
    return; // pass through to normal HTML page
  }

  const url = new URL(request.url);
  const mdUrl = new URL(url.pathname + ".md", url.origin);

  // Rewrite to the .md file (same-site, 200 rewrite — URL stays the same)
  const response = await fetch(mdUrl.toString());

  if (!response.ok) {
    return; // .md file doesn't exist, fall through to HTML
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
    },
  });
};

export const config: Config = {
  path: "/docs/*",
};