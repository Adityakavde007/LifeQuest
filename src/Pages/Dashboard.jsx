import React from "react";
import "./Dashboard.css";
import { ListTodo, CircleCheckBig, Clock3, Flame } from "lucide-react";
import StatCard from "../Components/Dashbosrd/StatCard";
import TaskItem from "../Components/Dashbosrd/TaskItem";
import { useNavigate } from "react-router-dom";

//tasks array
// const tasks = [
//   {
//     id: 1,
//     title: "Complete React Project",
//     category: "Development",
//   },
//   {
//     id: 2,
//     title: "Study DSA",
//     category: "Learning",
//   },
//   {
//     id: 3,
//     title: "Workout",
//     category: "Fitness",
//   },
// ];

const Dashboard = ({ tasks, userName, xp, streak }) => {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = totalTasks - completedTasks;

  // Stats array
  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ListTodo,
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CircleCheckBig,
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: Clock3,
    },
  ];

  const upcomingTasks = tasks
    .filter((task) => task.dueDate && !task.completed)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const navigate = useNavigate();

  const level = Math.floor(xp / 100) + 1;

  const currentXP = xp % 100;

  const progress = currentXP;

  return (
    <div className="dashboard">
      <div className="welcome-card">
        <h1>
          👋 {getGreeting()}, {userName}
        </h1>
        <p>Stay focused and complete today's quests.</p>
      </div>

      <section className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </section>


            <div className="xp-card">
        <h2>⭐ Level {level}</h2>

        <p>{xp} XP</p>

        <div className="xp-bar">
          <div
            className="xp-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>

        <small>{currentXP}/100 XP to next level</small>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Today's Tasks</h2>
        </div>

        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.slice(0, 5).map((task) => (
            <div className="dashboard-task" key={task.id}>
              <input type="checkbox" checked={task.completed} readOnly />

              <span>{task.title}</span>
            </div>
          ))
        )}
      </div>

      {/* ..................High Priority................ */}
      <div className="dashboard-section">
        <h2>High Priority</h2>

        {tasks
          .filter((task) => task.priority === "High")
          .slice(0, 3)
          .map((task) => (
            <p key={task.id}> {task.title}</p>
          ))}
      </div>

      <div className="dashboard-section">
        <h2>Upcoming Deadlines</h2>

        {upcomingTasks.length === 0 ? (
          <p>No upcoming deadlines 🎉</p>
        ) : (
          upcomingTasks.map((task) => (
            <div className="deadline-item" key={task.id}>
              <div>
                <h4>{task.title}</h4>

                <p>{formatDate(task.dueDate)}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="dashboard-section">
        <h2>Quick Actions</h2>

        <div className="quick-actions">
          <button className="action-btn" onClick={() => navigate("/tasks")}>
            + Add Task
          </button>

          <button className="action-btn" onClick={() => navigate("/focus")}>
            🎯 Start Focus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
