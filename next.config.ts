import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack 루트 디렉토리 설정 (경고 제거)
  turbopack: {
    root: process.cwd(),
  },

  // 이미지 최적화 설정
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // 프로덕션 빌드 최적화
  reactStrictMode: true,
  poweredByHeader: false,

  // 번들 최적화
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
