import { useState } from "react";
import Loading from "../Loading";
import styles from "./YoutubeEmbed.module.scss";

type Props = {
  videoId: string;
  title: string;
};

export default function YoutubeEmbed({ videoId, title }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {isLoading && (
            <Loading customStyle={{ position: "absolute", margin: "auto" }} />
          )}
          <iframe
            onLoad={() => setIsLoading(false)}
            width={"560"}
            height={"315"}
            src={`https://www.youtube.com/embed/${videoId}?vq=hd720&rel=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className={styles.iframe}
          ></iframe>
        </div>
      </div>
    </>
  );
}
