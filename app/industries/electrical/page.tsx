import { IndustryPage, generateIndustryMetadata } from "@/components/industry-page"

export const metadata = generateIndustryMetadata("electrical", "/industries")

export default function Page() {
  return <IndustryPage slug="electrical" />
}
