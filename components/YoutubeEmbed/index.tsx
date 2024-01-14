import React from "react";
import YouTube from "react-youtube";
import styles from "./YoutubeEmbed.module.scss";

type Props = {
  videoId: string;
  title: string;
};

export default function YoutubeEmbed({ videoId, title }: Props) {
  const opts = {
    playerVars: {
      autoplay: 0,
      rel: 0,
      vq: "hd720",
    },
  };

  return (
    <div className={styles.container}>
      <YouTube
        videoId={videoId}
        opts={opts}
        title={title}
        className={styles.player}
      />
    </div>
  );
}
