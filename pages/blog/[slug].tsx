import { getDocumentBySlug, getDocumentPaths } from "outstatic/server";
import Head from "next/head";
import markdownToHtml from "../../functions/markdownToHtml";
import SideComponent from "@/components/SideComponent";
import BlogAnnouncement from "@/components/BlogAnnouncement";
import styles from "./BlogPost.module.scss";

type Props = {
  post: any;
};

type Params = {
  params: any;
};

export default function BlogPost({ post }: Props) {
  const rawDate = new Date(post.publishedAt);
  const formattedDate = rawDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <Head>
        <title>{`Blog | ${post.title}`}</title>
        <meta name="description" content={post.description} />
      </Head>
      <BlogAnnouncement />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>{post.title}</h2>
          <div className={styles.meta}>
          <p>{post.author.name}</p>
          <p>{formattedDate}</p>
          </div>
          <div className={styles.block}>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <SideComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async ({ params }: Params) => {
  const post = getDocumentBySlug("posts", params.slug, [
    "title",
    "publishedAt",
    "slug",
    "author",
    "content",
    "description",
    "coverImage",
  ]);
  const content = await markdownToHtml(post?.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: getDocumentPaths("posts"),
    fallback: false,
  };
}
