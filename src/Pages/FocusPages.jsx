import React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import "./Focus.css";

const Focus = ({ focusSessions, setFocusSessions, tasks , setXp , updateStreak }) => {
  const defaultFocusTime = Number(localStorage.getItem("focusTime")) || 25;

  const [timeLeft, setTimeLeft] = useState(defaultFocusTime * 60);

  const [isRunning, setIsRunning] = useState(false);

  const [selectedTask, setSelectedTask] = useState("");

  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (isRunning && timeLeft === 0) {
      setIsRunning(false);

      saveSession();

      setShowCompleteModal(true);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (!selectedTask) {
      alert("Please select a task first!");
      return;
    }

    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    const focusTime = Number(localStorage.getItem("focusTime")) || 25;

    setTimeLeft(focusTime * 60);
    setIsRunning(false);
  };

  const selectedTaskData = tasks.find(
    (task) => task.id === Number(selectedTask),
  );

  const saveSession = () => {
    const newSession = {
      id: Date.now(),

      taskName: selectedTaskData?.title || "Unknown Task",

      completedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      date: new Date().toISOString(),

      duration: 25,

      left: `${Math.random() * 80 + 5}%`,
      top: `${Math.random() * 55 + 15}%`,
    };

    setFocusSessions((prev) => {
      const updated = [...prev, newSession];
      return updated.slice(-10);
    });
  };

  // console.log("isRunning:", isRunning);
  // console.log("timeLeft:", timeLeft);

  return (
    <div className="focus-page">
      <h1>Focus </h1>

      <h2 className={`timer ${isRunning ? "running" : ""}`}>{formatTime()}</h2>
      <div className="task-selector">
        <label>Current Task</label>

        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          disabled={isRunning}
        >
          <option value="">Select a task</option>

          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
        </select>
      </div>

      <div className="timer-controls">
        {isRunning ? (
          <button className="pause-btn" onClick={handlePause}>
            <Pause size={20} />
            Pause
          </button>
        ) : (
          <button className="start-btn" onClick={handleStart}>
            <Play size={20} />
            Start Focus
          </button>
        )}

        <button className="reset-btn" onClick={handleReset}>
          <RotateCcw size={20} />
          Reset
        </button>
      </div>

      <div className="session-history">
        <h3>Today's Sessions</h3>
        <div className="session-list">
          {focusSessions.length === 0 ? (
            <p>No sessions yet.</p>
          ) : (
            focusSessions.map((session) => (
              <div className="session-item" key={session.id}>
                <div>
                  <h4>{session.taskName}</h4>

                  <p>{session.completedAt}</p>
                </div>

                <span>{session.duration} min</span>
              </div>
            ))
          )}
        </div>
      </div>

      {showCompleteModal && (
        <div className="modal-overlay">
          <div className="completion-modal">
            <h2>🎉 Great Job!</h2>

            <p>You completed a focus session.</p>

            <h3>+25 XP</h3>

            <button
              onClick={() => {
                setShowCompleteModal(false);
                handleReset();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Focus;
