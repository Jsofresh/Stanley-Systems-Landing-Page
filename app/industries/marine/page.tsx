import { IndustryPage, generateIndustryMetadata } from "@/components/industry-page"

export const metadata = generateIndustryMetadata("marine", "/industries")

export default function Page() {
  return <IndustryPage slug="marine" />
}
