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
}

export default nextConfig
