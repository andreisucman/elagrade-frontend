import React, { useState, useRef } from "react";
import Head from "next/head";
import { getDocuments } from "outstatic/server";
import BlogCard from "@/components/BlogCard";
import styles from "./Blog.module.scss";

type Props = {
  posts: any;
};

export default function Index({ posts }: Props) {
  const [showUntil, setShowUntil] = useState(8);
  const hasMoreRef = useRef(false);
  hasMoreRef.current = posts.length > showUntil;
  return (
    <>
      <Head>
        <title>Blog | Main</title>
        <meta
          name="description"
          content={
            "Blog - Elagrade - Automated AI Essay Grading Tool For Teachers"
          }
        />
      </Head>
      <div className={styles.container}>
        <h2>Blog</h2>
        <div className={styles.content}>
          {posts.map((post: any, index: number) => {
            if (index > showUntil) return;
            return (
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
            );
          })}
        </div>
        {hasMoreRef.current && (
          <button
            className={styles.more}
            onClick={() => setShowUntil((prev) => (prev += 4))}
          >
            Load more posts
          </button>
        )}
      </div>
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
