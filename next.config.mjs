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
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  async redirects() {
    return [
      {
        source: "/how-stanley-systems-works",
        destination: "/#hero",
        permanent: true,
      },
      {
        source: "/how-stanley-systems-works/:path*",
        destination: "/#hero",
        permanent: true,
      },
      {
        source: "/ai-office-map",
        destination: "/ai-profit-map",
        statusCode: 301,
      },
      {
        source: "/ai-office-map/:path*",
        destination: "/ai-profit-map/:path*",
        statusCode: 301,
      },
      {
        source: "/ai-office-map.md",
        destination: "/ai-profit-map.md",
        statusCode: 301,
      },
      {
        source: "/workflow-audit",
        destination: "/ai-profit-map",
        statusCode: 301,
      },
      {
        source: "/workflow-audit/:path*",
        destination: "/ai-profit-map/:path*",
        statusCode: 301,
      },
      {
        source: "/how-the-assessment-works",
        destination: "/ai-profit-map",
        statusCode: 301,
      },
      {
        source: "/how-the-assessment-works/:path*",
        destination: "/ai-profit-map/:path*",
        statusCode: 301,
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
