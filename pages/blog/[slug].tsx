export const runtime = "edge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDocumentBySlug, getDocumentPaths } from "outstatic/server";
import markdownToHtml from "../../functions/markdownToHtml";
import styles from "./BlogPost.module.scss";

type Props = {
  post: any;
};

type Params = {
  params: any;
};

export default function Index({ post }: Props) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      <Footer />
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
