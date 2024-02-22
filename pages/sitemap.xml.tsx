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
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/how-to-grade-essays-with-chatgpt`,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/how-to-start-grading-essays-with-ai`,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/the-best-online-essay-grader-for-english-teachers`,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/how-accurate-and-reliable-is-an-ai-paper-grader`,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/what-ai-essay-grader-for-teachers-is-easy-to-use-and-provides-feedback`,
    },
    {
      loc: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/how-ela-teachers-can-embrace-ai-essay-grading`,
    },
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

  // fields.push(...staticPages);

  return getServerSideSitemapLegacy(ctx, staticPages);
}

function SiteMap() {
  return <div>This is a placeholder for the sitemap.</div>;
}

export default SiteMap;
