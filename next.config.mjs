/** @type {import('next').NextConfig} */
const nextConfig = {
    skipMiddlewareUrlNormalize: true,
    images: {
        domains: ['res.cloudinary.com'],
    },
};

export default nextConfig;
