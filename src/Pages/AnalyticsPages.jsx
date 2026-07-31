import React from "react";
import "./Analytics.css";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Analytics = ({ tasks, focusSessions }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weeklyData = days.map((day) => ({
    day,
    focus: 0,
  }));

  focusSessions.forEach((session) => {
  if (!session.date) return;

  const sessionDate = new Date(session.date);

  const dayName = days[sessionDate.getDay()];

  const day = weeklyData.find((d) => d.day === dayName);

  if (day) {
    day.focus += session.duration;
  }
});

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = totalTasks - completedTasks;

  const totalFocusSessions = focusSessions.length;

  const totalFocusMinutes = totalFocusSessions * 25;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const pieData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="charts-grid">
      {/* //...................Line Chart................// */}
      <div className="chart-card">
        <h2>Weekly Focus Time</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />

            <XAxis dataKey="day" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="focus"
              stroke="#8b5cf6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* //...................Pie Chart....................// */}

      <div className="chart-card">
        <h2>Task Completion</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* .................Productivity Score................ */}

      <div className="progress-card">
        <div className="progress-header">
          <h2>Productivity Score</h2>
          <span>{completionRate}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${completionRate}%`,
            }}
          ></div>
        </div>

        <p>
          {completionRate >= 80
            ? "🔥 Excellent! Keep it up!"
            : completionRate >= 50
              ? "💪 Good progress. Stay consistent!"
              : "🚀 Let's complete some more tasks!"}
        </p>
      </div>
    </div>
  );
};

export default Analytics;
