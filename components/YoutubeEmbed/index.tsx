import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import styles from "./YoutubeEmbed.module.scss";

type Props = {
  videoId: string;
  title: string;
};

export default function YoutubeEmbed({ videoId, title }: Props) {
  const [showPlay, setShowPlay] = useState(true);
  return (
    <div
      className={styles.container}
      onClick={() => setShowPlay((prev) => !prev)}
    >
      <LiteYouTubeEmbed
        playerClass={styles.player}
        id={videoId} // Default none, id of the video or playlist
        adNetwork={true} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
        params="" // any params you want to pass to the URL, assume we already had '&' and pass your parameters string
        playlist={false} // Use true when your ID be from a playlist
        poster="hqdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
        title={title} // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
        noCookie={true} // Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com
      />
      {showPlay && (
        <div className={styles.play_wrapper}>
          <FaPlay className={styles.play} />
        </div>
      )}
    </div>
  );
}
