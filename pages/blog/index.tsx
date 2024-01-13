export const runtime = "edge";
import { getDocuments } from "outstatic/server";
import React from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import styles from "./Blog.module.scss";

type Props = {
  posts: any;
};

export default function Index({ posts }: Props) {
  return (
    <>
      <Head>
        <title>{"Blog | Elagrade"}</title>
        <meta
          name="description"
          content={"Automated AI Essay Grading Tool For Teachers"}
        />
      </Head>
      <Header />
      <div className={styles.container}>
        <h2>Blog</h2>
        <div className={styles.content}>
          {posts.map((post: any, index: number) => (
            <React.Fragment key={index}>
              <BlogCard
                title={post.title}
                imageUrl={post.coverImage}
                description={post.description}
                date={post.date}
                author={post.author}
                slug={post.slug}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getDocuments("posts", [
    "title",
    "content",
    "author",
    "coverImage",
    "description",
    "slug",
  ]);
  return {
    props: { posts },
  };
};
