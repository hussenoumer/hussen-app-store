import { NextResponse } from "next/server";
import { apps, categories } from "@/data/apps";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = "https://hussenappstore.com";

  const items = apps
    .map((app) => {
      const cat = categories.find((c) => c.id === app.category);
      const langLabel =
        app.lang === "am" ? "Amharic" : app.lang === "ar" ? "Arabic" : "English";
      return `    <item>
      <title>${escapeXml(app.name)}</title>
      <link>https://play.google.com${app.href}</link>
      <description>${escapeXml(cat?.label || "")} - ${langLabel}</description>
      <guid isPermaLink="false">${app.id}</guid>
      <category>${escapeXml(cat?.label || "")}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hussen App Store - New App Releases</title>
    <description>Stay updated with the latest Islamic Android apps by Dr. Hussen Oumer Amid - Quran recitations, Islamic books, and more</description>
    <link>${baseUrl}</link>
    <language>en</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>hussenoumer85@gmail.com (Dr. Hussen Oumer Amid)</managingEditor>
    <webMaster>hussenoumer85@gmail.com (Dr. Hussen Oumer Amid)</webMaster>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
