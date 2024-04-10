/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        X_RAPIDAPI_KEY: process.env.X_RAPIDAPI_KEY,
        X_RAPIDAPI_HOST: process.env.X_RAPIDAPI_HOST,
        STRIPE_API_KEY: process.env.STRIPE_API_KEY
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
            pathname: '**',
          },
        ],
      }
};

export default nextConfig;