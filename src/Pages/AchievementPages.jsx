import React from "react";
import "./Achievements.css";

const Achievements = ({ tasks, focusSessions }) => {
  const completedTasks = tasks.filter((task) => task.completed).length;

  const totalFocusMinutes = focusSessions.reduce(
    (sum, session) => sum + session.duration,
    0,
  );

  const achievements = [
    {
      title: "🥇 First Focus",
      description: "Complete your first focus session.",
      current: focusSessions.length,
      target: 1,
    },

    {
      title: "🌳 Forest Starter",
      description: "Grow 10 trees.",
      current: focusSessions.length,
      target: 10,
    },

    {
      title: "🔥 Productivity Master",
      description: "Complete 25 tasks.",
      current: completedTasks,
      target: 25,
    },

    {
      title: "⏰ Focus Warrior",
      description: "Focus for 10 hours.",
      current: totalFocusMinutes,
      target: 600,
    },
  ];

  return (
    <div className="achievements-page">
      <h1>Achievements</h1>

      <div className="achievement-list">
        {achievements.map((achievement, index) => {
          const progress = Math.min(
            (achievement.current / achievement.target) * 100,
            100,
          );

          return (
            <div className="achievement-card" key={index}>
              <h2>{achievement.title}</h2>

              <p>{achievement.description}</p>

              <p>
                {achievement.current}/{achievement.target}
              </p>

              <div className="achievement-bar">
                <div
                  className="achievement-fill"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
