import { IndustryPage, generateIndustryMetadata } from "@/components/industry-page"

export const metadata = generateIndustryMetadata("landscaping", "/industries")

export default function Page() {
  return <IndustryPage slug="landscaping" />
}
