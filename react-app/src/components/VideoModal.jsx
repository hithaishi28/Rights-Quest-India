import React from "react";

export function VideoModal({ video, onClose }) {
  if (!video) return null;
  return (
    <div className="video-modal" role="dialog" aria-modal="true">
      <div className="video-modal-card">
        <div className="chat-head">
          <span>{video.title}</span>
          <button className="icon-button" onClick={onClose}>Close</button>
        </div>
        <iframe title={video.title} src={video.embedUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      </div>
    </div>
  );
}
