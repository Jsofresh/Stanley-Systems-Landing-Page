import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stanley-systems.com"

  const routes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/field-service-automation",
    "/how-stanley-systems-works",
    "/marine-service-automation",
    "/missed-estimate-follow-up-for-service-businesses",
    "/office-handoff-problems-in-field-service-businesses",
    "/privacy-policy",
    "/safety",
    "/speed-up-invoicing-for-service-businesses",
    "/stanley-systems-case-study",
    "/who-stanley-systems-helps",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
