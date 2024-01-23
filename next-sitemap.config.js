module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/grading" },
      { userAgent: "*", disallow: "/account" },
      { userAgent: "*", disallow: "/results" },
      { userAgent: "*", disallow: "/gpt-auth" },
    ],
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_FRONTEND_URL}/server-sitemap.xml`],
  },
};
