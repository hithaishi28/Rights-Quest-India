import React from "react";
import { getEmbedUrl } from "../utils/youtube.js";

export function VideoCard({ video, onOpen }) {
  const embedUrl = getEmbedUrl(video.url);
  return (
    <article className="video-card video-card-button" onClick={() => onOpen({ title: video.title, embedUrl })}>
      <div className="video-thumb"><span>▶</span></div>
      <h3>{video.title}</h3>
    </article>
  );
}
