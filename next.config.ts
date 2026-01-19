import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const securityHeaders: { key: string; value: string }[] = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  // Only send HSTS in production over HTTPS
  ...(isProd
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }]
    : []),
];

const nextConfig: NextConfig = {
  // Enable React Compiler (React 19)
  reactCompiler: true,

  // Optimize barrel imports for faster builds and smaller bundles
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Remove the X-Powered-By header in production
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        // The Google S2 favicon endpoint path (queries are allowed)
        pathname: '/s2/favicons',
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
