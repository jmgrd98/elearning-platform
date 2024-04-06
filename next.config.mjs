/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
        DATABASE_URL: process.env.DATABASE_URL
    }
};

export default nextConfig;