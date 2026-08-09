import { IndustryPage, generateIndustryMetadata } from "@/components/industry-page"

export const metadata = generateIndustryMetadata("plumbing", "/industries")

export default function Page() {
  return <IndustryPage slug="plumbing" />
}
