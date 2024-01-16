import React from "react";
import YouTube from "react-youtube";
import styles from "./YoutubeEmbed.module.scss";

type Props = {
  videoId: string;
  title: string;
};

export default function YoutubeEmbed({ videoId, title }: Props) {
  return (
    <div className={styles.container}>
      <YouTube
        videoId={`${videoId}?enablejsapi=1`}
        opts={{
          playerVars: {
            autoplay: 0,
            rel: 0,
            vq: "hd720",
          },
        }}
        title={title}
        className={styles.player}
      />
    </div>
  );
}
