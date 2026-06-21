/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
const distDir = process.env.STANLEY_NEXT_DIST_DIR || ".next"

const nextConfig = {
  basePath,
  distDir,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/workflow-audit",
        destination: "/ai-office-map",
        permanent: true,
      },
      {
        source: "/workflow-audit/:path*",
        destination: "/ai-office-map/:path*",
        permanent: true,
      },
      {
        source: "/how-the-assessment-works",
        destination: "/ai-office-map",
        permanent: true,
      },
      {
        source: "/how-the-assessment-works/:path*",
        destination: "/ai-office-map/:path*",
        permanent: true,
      },
      {
        source: "/car-dealerships",
        destination: "/who-stanley-systems-helps",
        permanent: true,
      },
      {
        source: "/systems",
        destination: "/systems-installation-sprint",
        permanent: true,
      },
      {
        source: "/systems/cashflow-control",
        destination: "/systems-installation-sprint",
        permanent: true,
      },
      {
        source: "/systems/repeat-revenue",
        destination: "/systems-installation-sprint",
        permanent: true,
      },
      {
        source: "/systems/both-systems",
        destination: "/systems-installation-sprint",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
