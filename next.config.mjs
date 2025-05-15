/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "scontent.cdninstagram.com"
      },
      // Add any other image hosts you need
      {
        protocol: 'https',
        hostname: "**.cdninstagram.com" // Wildcard for all subdomains
      }
    ],
  },
  experimental: {
    esmExternals: 'loose', // Required for Framer Motion
    serverComponentsExternalPackages: ['framer-motion'] // Optional but recommended
  },
  // Optional: Enable React Strict Mode
  reactStrictMode: true,
  // Optional: Add webpack configuration if needed
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next',
          name: 'static/media/[name].[hash].[ext]',
        },
      },
    });
    return config;
  }
}

export default nextConfig