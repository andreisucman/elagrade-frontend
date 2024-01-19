import Head from "next/head";
import React, { useState, useRef } from "react";
import { getDocuments } from "outstatic/server";
import { VscEmptyWindow } from "react-icons/vsc";
import BlogAnnouncement from "@/components/BlogAnnouncement";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
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
          content={"AI grading tool that saves ELA teachers time"}
        />
      </Head>
      <BlogAnnouncement />
      <div className={styles.container}>
        <h2>Blog</h2>
        {posts.length > 0 ? (
          <div className={styles.content}>
            {posts.map((post: any, index: number) => {
              if (index > showUntil) return;

              return (
                <React.Fragment key={index}>
                  <BlogCard
                    title={post.title}
                    imageUrl={post.coverImage}
                    description={post.description}
                    date={post.publishedAt}
                    author={post.author}
                    slug={post.slug}
                  />
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <EmptyPlaceholder
            icon={<VscEmptyWindow style={{ width: "2rem", height: "2rem" }} />}
            message="No content"
            customStyle={{ backgroundColor: "white" }}
          />
        )}
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
  let posts: any[] = [];
  try {
    posts = getDocuments("posts", [
      "title",
      "content",
      "author",
      "coverImage",
      "description",
      "slug",
    ]);
  } catch (err) {
    console.log("Error:", err);
  }
  return {
    props: { posts },
  };
};
