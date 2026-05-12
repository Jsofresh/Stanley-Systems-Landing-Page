import { IndustryPage, generateIndustryMetadata } from "@/components/industry-page"

export const metadata = generateIndustryMetadata("hvac", "/industries")

export default function Page() {
  return <IndustryPage slug="hvac" />
}
