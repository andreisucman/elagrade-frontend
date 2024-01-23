module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/grading" },
      { userAgent: "*", disallow: "/account" },
      { userAgent: "*", disallow: "/results" },
      { userAgent: "*", disallow: "/gpt-auth" },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sitemap.xml`,
    ],
  },
};
