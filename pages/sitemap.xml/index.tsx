import { getDocuments } from "outstatic/server";

function generateSiteMap(posts: any) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     <url>
       <loc>${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
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
           <lastmod>${new Date().toISOString()}</lastmod>
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
