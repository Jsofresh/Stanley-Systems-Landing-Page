import { CustomerRevenueSystemV3 } from '@/components/sections/customer-revenue-system-v3'

export const metadata = {
  title: 'Repeat Revenue System v3 Preview | Stanley Systems',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CustomerRevenueSystemV3PreviewPage() {
  return (
    <main className="min-h-screen bg-white">
      <CustomerRevenueSystemV3 />
    </main>
  )
}
