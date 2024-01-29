import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import styles from "./YoutubeEmbed.module.scss";

type Props = {
  videoId: string;
  title: string;
};

export default function YoutubeEmbed({ videoId, title }: Props) {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return (
    <div className={styles.container}>
      <YouTube
        videoId={videoId}
        opts={{
          playerVars: {
            enablejsapi: 1,
            autoplay: 0,
            rel: 0,
            vq: "hd720",
            origin,
          },
        }}
        title={title}
        className={styles.player}
      />
    </div>
  );
}
