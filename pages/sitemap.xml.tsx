import { getDocuments } from "outstatic/server";
import { getServerSideSitemapLegacy, ISitemapField } from "next-sitemap";

export async function getServerSideProps(ctx: any) {
  // const posts = getDocuments("posts", [
  //   "title",
  //   "content",
  //   "author",
  //   "coverImage",
  //   "description",
  //   "slug",
  // ]);

  // const fields: ISitemapField[] = posts.map((post) => ({
  //   loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${post.slug}`,
  //   lastmod: new Date().toISOString(),
  // }));

  const staticPages = [
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/what-ai-essay-grader-for-teachers-is-easy-to-use-and-provides-feedback`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/how-ela-teachers-can-embrace-ai-essay-grading`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/contact`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-in`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/pricing`,
      lastmod: new Date().toISOString(),
    },
  ];

  // fields.push(...staticPages);

  return getServerSideSitemapLegacy(ctx, staticPages);
}

function SiteMap() {
  return <div>This is a placeholder for the sitemap.</div>;
}

export default SiteMap;
