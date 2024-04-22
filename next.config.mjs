/** @type {import('next').NextConfig} */
const nextConfig = {
  skipMiddlewareUrlNormalize: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: '',
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        port: '',
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
