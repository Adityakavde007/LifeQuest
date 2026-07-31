import React from "react";
import "./Forest.css";

const Forest = ({ focusSessions }) => {
  const totalTrees = focusSessions.length;

  const forestTrees = focusSessions.map((session) => ({
  id: session.id,
  taskName: session.taskName,
  completedAt: session.completedAt,

  left: `${Math.random() * 80 + 5}%`,
  top: `${Math.random() * 55 + 15}%`,

  type:
    focusSessions.length < 5
      ? "🌱"
      : focusSessions.length < 10
      ? "🌿"
      : focusSessions.length < 20
      ? "🌳"
      : "🌲",
}));

  return (
    <div className="forest-page">
      <div className="forest-header">
        <h1>🌳 My Forest</h1>
        <p>Every completed focus session plants a new tree.</p>
      </div>

      <div className="forest-container">
        <div className="sun"></div>

        <div className="cloud cloud1"></div>

        <div className="cloud cloud2"></div>

        {forestTrees.map((tree) => (
          <div
            key={tree.id}
            className="forest-tree grow-tree"
            style={{
              left: tree.left,
              top: tree.top,
            }}
          >
            <span>{tree.type}</span>

            <div className="tree-tooltip">
              <strong>{tree.taskName}</strong>

              <p>{tree.completedAt}</p>
            </div>
          </div>
        ))}

        <div className="grass"></div>
      </div>

      <div className="forest-stats">
        <div className="forest-stat-card">
          <h2>{focusSessions.length}</h2>
          <p>Trees</p>
        </div>

        <div className="forest-stat-card">
          <h2>{focusSessions.length}</h2>
          <p>Sessions</p>
        </div>

        <div className="forest-stat-card">
          <h2>{focusSessions.length * 25}</h2>
          <p>Minutes Focused</p>
        </div>
      </div>
    </div>
  );
};

export default Forest;
