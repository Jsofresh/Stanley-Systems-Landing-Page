import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://stanley-systems.com"

  const routes = [
    "",
    "/about",
    "/ai-office-blueprint",
    "/ai-profit-map",
    "/blog",
    "/contact",
    "/field-service-automation",
    "/invoicing-delay-cash-flow-calculator",
    "/marine-service-automation",
    "/missed-estimate-follow-up-for-service-businesses",
    "/office-handoff-problems-in-field-service-businesses",
    "/privacy-policy",
    "/pricing",
    "/safety",
    "/speed-up-invoicing-for-service-businesses",
    "/stanley-systems-case-study",
    "/systems-installation-sprint",
    "/who-stanley-systems-helps",
    "/llms.txt",
    "/llms-full.txt",
    "/ai-office-blueprint.md",
    "/ai-profit-map.md",
    "/pricing.md",
    "/systems-installation-sprint.md",
    "/contact.md",
    "/about.md",
    "/who-stanley-systems-helps.md",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
