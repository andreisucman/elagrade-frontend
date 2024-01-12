import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./BlogCard.module.scss";

type Props = {
  title: string;
  imageUrl: string;
  date: string;
  slug: string;
  description: string;
  author: { [key: string]: string };
};

const BlogCard = ({
  title,
  imageUrl,
  description,
  date,
  author,
  slug,
}: Props) => {
  const router = useRouter();
  return (
    <div className={styles.container} onClick={() => router.push(`/blog/${slug}`)}>
      <div className={styles.wrapper}>
        <div className={styles.image_wrapper}>
          <Image
            src={imageUrl}
            width={200}
            height={200}
            className={styles.image}
            alt={title}
          />
        </div>
        <h3>{title}</h3>
        <p>
          {description} <span>{date}</span>
        </p>
        <div className={styles.author}>
          <p>{author.name}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
