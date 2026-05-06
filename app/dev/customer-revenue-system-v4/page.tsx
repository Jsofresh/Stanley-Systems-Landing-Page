import { CustomerRevenueSystemV4 } from '@/components/sections/customer-revenue-system-v4'

export const metadata = {
  title: 'Repeat Revenue System v4 Preview | Stanley Systems',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CustomerRevenueSystemV4PreviewPage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea]">
      <CustomerRevenueSystemV4 />
    </main>
  )
}
