import { getDocumentBySlug, getDocumentPaths } from "outstatic/server";
import Head from "next/head";
import markdownToHtml from "../../functions/markdownToHtml";
import BlogAnnouncement from "@/components/BlogAnnouncement";
import styles from "./BlogPost.module.scss";

type Props = {
  post: any;
};

type Params = {
  params: any;
};

export default function BlogPost({ post }: Props) {
  return (
    <>
      <Head>
        <title>Blog | {post.title}</title>
        <meta name="description" content={post.description} />
      </Head>
      <BlogAnnouncement />
      <div className={styles.container}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
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
