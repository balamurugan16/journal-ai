/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{
      source: "/login",
      destination: "/signin",
      permanent: true
    }]
  }
};

export default nextConfig;
