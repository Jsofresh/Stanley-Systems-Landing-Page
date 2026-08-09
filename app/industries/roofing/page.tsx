import { IndustryPage, generateIndustryMetadata } from "@/components/industry-page"

export const metadata = generateIndustryMetadata("roofing", "/industries")

export default function Page() {
  return <IndustryPage slug="roofing" />
}
