import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

import Signup from "./Auth/Signup";
import Login from "./Auth/Login";

import Sidebar from "./Components/Sidebar/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/Tasks";
import Focus from "./Pages/FocusPages";
import AiAssistant from "./Pages/AI_AssistantPages";
import Analytics from "./Pages/AnalyticsPages";
import Forest from "./Pages/ForestPages";
import Achievement from "./Pages/AchievementPages";
import Settings from "./Pages/SettingsPages";

function App() {
  const [theme, setTheme] = useState("purple");
  const [userName, setUserName] = useState("");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [focusSessions, setFocusSessions] = useState(() => {
    const savedSessions = localStorage.getItem("focusSessions");
    return savedSessions ? JSON.parse(savedSessions) : [];
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("focusSessions", JSON.stringify(focusSessions));
  }, [focusSessions]);

  const [xp, setXp] = useState(() => {
    return Number(localStorage.getItem("xp")) || 0;
  });

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("streak")) || 0;
  });

  const [lastActiveDate, setLastActiveDate] = useState(() => {
    return localStorage.getItem("lastActiveDate") || "";
  });

  useEffect(() => {
    localStorage.setItem("xp", xp);
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("lastActiveDate", lastActiveDate);
  }, [lastActiveDate]);

  const updateStreak = () => {
    const today = new Date().toDateString();

    // Already updated today
    if (lastActiveDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActiveDate === yesterday.toDateString()) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(1);
    }

    setLastActiveDate(today);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className={`app ${theme}`}>
      <Sidebar theme={theme} setTheme={setTheme} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                tasks={tasks}
                userName={userName}
                xp={xp}
                streak={streak}
              />
            }
          />
          <Route
            path="/tasks"
            element={
              <Tasks
                tasks={tasks}
                setTasks={setTasks}
                setXp={setXp}
                updateStreak={updateStreak}
                user={user}
              />
            }
          />
          <Route
            path="/focus"
            element={
              <Focus
                tasks={tasks}
                focusSessions={focusSessions}
                setFocusSessions={setFocusSessions}
                setXp={setXp}
                updateStreak={updateStreak}
              />
            }
          />
          <Route
            path="/ai-assistant"
            element={
              <AiAssistant tasks={tasks} focusSessions={focusSessions} />
            }
          />
          <Route
            path="/analytics"
            element={<Analytics tasks={tasks} focusSessions={focusSessions} />}
          />
          <Route
            path="/forest"
            element={
              <Forest focusSessions={focusSessions} xp={xp} streak={streak} />
            }
          />
          <Route
            path="/achivements"
            element={
              <Achievement
                tasks={tasks}
                focusSessions={focusSessions}
                xp={xp}
                streak={streak}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                tasks={tasks}
                setTasks={setTasks}
                focusSessions={focusSessions}
                setFocusSessions={setFocusSessions}
                theme={theme}
                xp={xp}
                streak={streak}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
