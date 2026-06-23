import React from "react";
import { ModuleCard } from "./ModuleCard.jsx";
import { VideoCard } from "./VideoCard.jsx";

export function Home({ modules, videos, onOpenVideo }) {
  return (
    <main>
      <section className="home-hero">
        <div>
          <p className="level-chip">Children's Rights and Legal Awareness in India</p>
          <h1>Learn rights through stories, quizzes, videos, and rewards 🚀</h1>
          <p className="simple-text">A colorful educational portal for child-friendly legal literacy.</p>
        </div>
      </section>
      <section className="screen">
        <h2>Learning Modules 📚</h2>
        <div className="chapter-grid">{modules.map((module) => <ModuleCard key={module.id} module={module} />)}</div>
      </section>
      <section className="screen">
        <h2>Educational Videos ▶️</h2>
        <div className="video-grid">{videos.map((video) => <VideoCard key={video.url} video={video} onOpen={onOpenVideo} />)}</div>
      </section>
    </main>
  );
}
