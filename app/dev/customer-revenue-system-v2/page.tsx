import { CustomerRevenueSystemV2 } from '@/components/sections/customer-revenue-system-v2'

export const metadata = {
  title: 'Repeat Revenue System v2 Preview | Stanley Systems',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CustomerRevenueSystemV2PreviewPage() {
  return (
    <main className="min-h-screen bg-white">
      <CustomerRevenueSystemV2 />
    </main>
  )
}
