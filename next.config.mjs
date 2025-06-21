/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*', // or only the routes you actually iframe
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              'frame-ancestors ' +
                [
                  "'self'", // allow same-origin
                  'https://*.vercel.app', // any Vercel subdomain
                  'https://*.e2b.app', // any E2B subdomain
                  'http://localhost:3000', // local dev
                ].join(' '),
            ].join('; '),
          },
          // (make sure you do NOT send an X-Frame-Options header that conflicts)
        ],
      },
    ]
  },
}

export default nextConfig
