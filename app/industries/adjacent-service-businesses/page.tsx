import { IndustryPage, generateIndustryMetadata } from "@/components/industry-page"

export const metadata = generateIndustryMetadata("adjacent-service-businesses", "/industries")

export default function Page() {
  return <IndustryPage slug="adjacent-service-businesses" />
}
