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
    ],
  },
};

module.exports = nextConfig;
