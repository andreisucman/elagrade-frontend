const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elagrade.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.elagrade.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
