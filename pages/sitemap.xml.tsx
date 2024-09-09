import { getDocuments } from "outstatic/server";
import { getServerSideSitemapLegacy, ISitemapField } from "next-sitemap";

export async function getServerSideProps(ctx: any) {
  const posts = getDocuments("posts", [
    "title",
    "content",
    "author",
    "coverImage",
    "description",
    "slug",
    "publishedAt",
  ]);

  const fields: ISitemapField[] = posts.map((post) => ({
    loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${post.slug}`,
    lastmod: post.publishedAt,
  }));

  const staticPages = [
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog`,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/contact`,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-in`,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/pricing`,
    },
  ];

  fields.push(...staticPages);

  return getServerSideSitemapLegacy(ctx, fields);
}

function SiteMap() {
  return <div>This is a placeholder for the sitemap.</div>;
}

export default SiteMap;
