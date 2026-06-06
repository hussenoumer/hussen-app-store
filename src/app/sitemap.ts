import { MetadataRoute } from "next";
import { apps, categories } from "@/data/apps";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hussenappstore.com";

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/?category=${cat.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const appRoutes: MetadataRoute.Sitemap = apps.map((app) => ({
    url: `${baseUrl}/?app=${app.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...categoryRoutes, ...appRoutes];
}
