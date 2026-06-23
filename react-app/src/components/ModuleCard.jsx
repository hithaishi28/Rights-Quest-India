import React from "react";

export function ModuleCard({ module, completed, onClick }) {
  return (
    <article className={`chapter-card module-${module.color || "blue"}`}>
      <div className="chapter-art"><span className="module-emoji">{module.icon}</span></div>
      <h3>{module.title} {completed ? "✅" : ""}</h3>
      <p>{module.story}</p>
      <p><strong>Badge:</strong> {module.badge}</p>
      {onClick && <button className="pill-button primary" onClick={onClick}>Open Module</button>}
    </article>
  );
}
