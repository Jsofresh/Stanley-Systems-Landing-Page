import { IndustryPage, generateIndustryMetadata } from "@/components/industry-page"

export const metadata = generateIndustryMetadata("general-contractors", "/industries")

export default function Page() {
  return <IndustryPage slug="general-contractors" />
}
