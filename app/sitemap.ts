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
    "/invoicing-delay-cash-flow-calculator",
    "/marine-service-automation",
    "/missed-estimate-follow-up-for-service-businesses",
    "/office-handoff-problems-in-field-service-businesses",
    "/privacy-policy",
    "/pricing",
    "/safety",
    "/speed-up-invoicing-for-service-businesses",
    "/stanley-systems-case-study",
    "/systems",
    "/systems/cashflow-control",
    "/systems/repeat-revenue",
    "/systems-installation-sprint",
    "/who-stanley-systems-helps",
    "/workflow-audit",
    "/llms.txt",
    "/llms-full.txt",
    "/workflow-audit.md",
    "/pricing.md",
    "/systems/cashflow-control.md",
    "/systems/repeat-revenue.md",
    "/systems-installation-sprint.md",
    "/contact.md",
    "/about.md",
    "/services.md",
    "/systems.md",
    "/who-stanley-systems-helps.md",
    "/faq.md",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
