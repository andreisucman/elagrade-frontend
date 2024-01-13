import { getDocuments } from "outstatic/server";

function generateSiteMap(posts: any) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_FRONTEND_URL}/contact</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_FRONTEND_URL}</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-in</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_FRONTEND_URL}/pricing</loc>
     </url>
     ${posts
       .map(({ slug }: { slug: string }) => {
         return `
       <url>
           <loc>${`${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {}

export async function getServerSideProps({ res }: { res: any }) {
  const posts = getDocuments("posts", [
    "title",
    "content",
    "author",
    "coverImage",
    "description",
    "slug",
  ]);

  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
