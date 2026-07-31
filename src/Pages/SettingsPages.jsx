import { useState } from "react";
import "./Settings.css";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Settings = ({
  tasks,
  setTasks,
  focusSessions,
  setFocusSessions,
  theme,
}) => {
  const [name, setName] = useState(localStorage.getItem("username") || "");

  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const [bio, setBio] = useState(localStorage.getItem("bio") || "");

  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || "",
  );

  const handleSave = () => {
    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    localStorage.setItem("bio", bio);
    localStorage.setItem("profileImage", profileImage);

    alert("Profile Saved Successfully!");
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Productivity Settings

  const [focusTime, setFocusTime] = useState(
    Number(localStorage.getItem("focusTime")) || 25,
  );

  const [breakTime, setBreakTime] = useState(
    Number(localStorage.getItem("breakTime")) || 5,
  );

  const [dailyGoal, setDailyGoal] = useState(
    Number(localStorage.getItem("dailyGoal")) || 5,
  );

  const saveProductivity = () => {
    localStorage.setItem("focusTime", focusTime);
    localStorage.setItem("breakTime", breakTime);
    localStorage.setItem("dailyGoal", dailyGoal);

    alert("Productivity settings saved!");
  };

  const handleExport = () => {
    const backup = {
      tasks,
      focusSessions,
      exportedAt: new Date().toLocaleString(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "LifeQuest_Backup.json";

    a.click();

    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        if (data.tasks) {
          setTasks(data.tasks);
        }

        if (data.focusSessions) {
          setFocusSessions(data.focusSessions);
        }

        alert("Backup restored successfully!");
      } catch {
        alert("Invalid backup file.");
      }
    };

    reader.readAsText(file);
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure?\n\nThis will permanently delete all tasks and focus sessions.",
    );

    if (!confirmReset) return;

    setTasks([]);
    setFocusSessions([]);

    localStorage.removeItem("tasks");
    localStorage.removeItem("focusSessions");

    alert("All app data has been deleted.");
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.length - completedTasks;

  const totalFocusTime = focusSessions.reduce(
    (total, session) => total + session.duration,
    0,
  );

  const completionRate =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  return (
    <div className="settings-page">
      <h1>⚙ Settings</h1>
      {/* Profile */}
      <div className="settings-card">
        <h2>👤 Profile</h2>

        <img
          src={profileImage || "https://placehold.co/120x120?text=User"}
          alt="Profile"
          className="profile-image"
        />

        <label className="upload-btn">
          Change Photo
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </label>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button onClick={handleSave}>Save Profile</button>
      </div>
      {/* Productivity */}
      <div className="settings-card">
        <h2>🎯 Productivity</h2>

        <label>Default Focus Time</label>

        <select
          value={focusTime}
          onChange={(e) => setFocusTime(Number(e.target.value))}
        >
          <option value={25}>25 Minutes</option>
          <option value={30}>30 Minutes</option>
          <option value={45}>45 Minutes</option>
          <option value={60}>60 Minutes</option>
        </select>

        <label>Break Time</label>

        <select
          value={breakTime}
          onChange={(e) => setBreakTime(Number(e.target.value))}
        >
          <option value={5}>5 Minutes</option>
          <option value={10}>10 Minutes</option>
          <option value={15}>15 Minutes</option>
        </select>

        <label>Daily Task Goal</label>

        <input
          type="number"
          value={dailyGoal}
          onChange={(e) => setDailyGoal(Number(e.target.value))}
        />

        <button onClick={saveProductivity}>Save Productivity Settings</button>
      </div>
      {/* Notifications */}
      <div className="settings-card">
        <h2>🔔 Notifications</h2>

        <p>Notification settings coming soon.</p>
      </div>
      {/* Data */}
      <div className="settings-card">
        <h2>💾 Data</h2>
        <div className="data-buttons">
          <button onClick={handleExport}>📤 Export Backup</button>

          <label className="import-btn">
            📥 Import Backup
            <input type="file" accept=".json" onChange={handleImport} hidden />
          </label>

          <button className="danger-btn" onClick={handleReset}>
            🗑 Reset App Data
          </button>
        </div>{" "}
      </div>
      {/* Statistics */}
      <div className="settings-card">
        <h2>📊 Statistics</h2>

        <div className="stats-row">
          <span>Total Tasks</span>
          <span>{tasks.length}</span>
        </div>

        <div className="stats-row">
          <span>Completed Tasks</span>
          <span>{completedTasks}</span>
        </div>

        <div className="stats-row">
          <span>Pending Tasks</span>
          <span>{pendingTasks}</span>
        </div>

        <div className="stats-row">
          <span>Focus Sessions</span>
          <span>{focusSessions.length}</span>
        </div>

        <div className="stats-row">
          <span>Total Focus Time</span>
          <span>{totalFocusTime} Minutes</span>
        </div>

        <div className="stats-row">
          <span>Completion Rate</span>
          <span>{completionRate}%</span>
        </div>

        <div className="stats-row">
          <span>Current Theme</span>
          <span>{theme}</span>
        </div>
      </div>
      {/* About */}
      <div className="settings-card">
        <h2>ℹ About</h2>

        <p>LifeQuest v1.0</p>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={20} />
        Logout
      </button>{" "}
    </div>
  );
};

export default Settings;
