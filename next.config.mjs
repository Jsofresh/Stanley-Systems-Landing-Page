/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

const nextConfig = {
  basePath,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    cpus: 1,
    workerThreads: false,
    webpackBuildWorker: false,
  },
}

export default nextConfig
