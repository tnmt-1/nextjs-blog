/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true
    },
    experimental: {
        serverComponentsExternalPackages: ["@remark-embedder", "remark-prism"],
        experimental: { runtime: 'edge' }
    },
};

module.exports = nextConfig;
