import { MetadataRoute } from "next";

export function GET(): Response {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://wyecv.uk/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
