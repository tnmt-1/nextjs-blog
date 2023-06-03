/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true
    },
    experimental: {
        serverComponentsExternalPackages: ["@remark-embedder", "remark-prism"],
    },
    output: "export",
};

module.exports = nextConfig;
