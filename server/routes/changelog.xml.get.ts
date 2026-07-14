import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const siteUrl = (config.public.siteUrl as string | undefined) || "";

  const entries = await queryCollection(event, "changelog").order("date", "DESC").limit(50).all();

  setResponseHeader(event, "content-type", "application/rss+xml; charset=utf-8");
  return generateRss(entries, siteUrl);
});

function generateRss(
  entries: Array<{
    slug: string;
    title: string;
    summary: string;
    date: string;
    category: string;
  }>,
  siteUrl: string
): string {
  const feedUrl = `${siteUrl}/changelog.xml`;
  const pageUrl = `${siteUrl}/changelog`;

  const items = entries
    .map((entry) => {
      const link = `${siteUrl}/changelog/${entry.slug}`;
      const pubDate = new Date(entry.date).toUTCString();
      return `  <item>
    <title>${escapeXml(entry.title)}</title>
    <link>${escapeXml(link)}</link>
    <guid isPermaLink="true">${escapeXml(link)}</guid>
    <pubDate>${pubDate}</pubDate>
    <category>${escapeXml(entry.category)}</category>
    <description>${escapeXml(entry.summary)}</description>
  </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2000/Atom">
<channel>
  <title>UI Thing Changelog</title>
  <link>${escapeXml(pageUrl)}</link>
  <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
  <description>See what has changed recently in UI Thing.</description>
${items}
</channel>
</rss>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
