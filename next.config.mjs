/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.archijea.com"
          }
        ],
        destination: "https://archijea.com/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
