import React, { useState } from "react";
import { ModuleCard } from "./ModuleCard.jsx";
import { QuizCard } from "./QuizCard.jsx";
import { VideoCard } from "./VideoCard.jsx";

export function Dashboard({ user, modules, videos, selectedModule, onSelectModule, onCompleteModule, onOpenVideo, onLogout }) {
  const [quizOpen, setQuizOpen] = useState(false);
  const progress = Math.round((user.completedChapters.length / modules.length) * 100);

  return (
    <>
      <header className="topbar">
        <div className="brand"><span className="brand-mark">RQ</span><span>Rights Quest India 🌟</span></div>
        <button className="icon-button primary" onClick={onLogout}>Logout</button>
      </header>
      <main className="screen">
        <section className="screen-title">
          <div>
            <p className="level-chip">Welcome, {user.name} 👋</p>
            <h1>Your learning dashboard 🎮</h1>
            <p>Age {user.age}</p>
          </div>
        </section>
        <section className="dashboard-grid">
          <article className="panel">
            <h2>Learning Progress</h2>
            <div className="progress-label"><span>{progress}% complete</span><span>{user.points} points</span></div>
            <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          </article>
          <article className="panel">
            <h2>Badges / Rewards 🏅</h2>
            <p>{user.badges.length ? user.badges.join(", ") : "Complete a chapter to earn your first badge."}</p>
          </article>
        </section>
        <section className="chapter-grid">
          {modules.map((module) => <ModuleCard key={module.id} module={module} completed={user.completedChapters.includes(module.id)} onClick={() => onSelectModule(module.id)} />)}
        </section>
        <section className="lesson-stage dashboard-lesson">
          <h2>{selectedModule.icon} {selectedModule.title}</h2>
          <p>{selectedModule.story}</p>
          <button className="pill-button primary" onClick={() => onCompleteModule(selectedModule)}>Complete Chapter</button>
          <button className="pill-button ghost" onClick={() => setQuizOpen(true)}>Start Quiz</button>
        </section>
        {quizOpen && <QuizCard module={selectedModule} />}
        <section className="video-grid">
          {videos.map((video) => <VideoCard key={video.url} video={video} onOpen={onOpenVideo} />)}
        </section>
      </main>
    </>
  );
}
