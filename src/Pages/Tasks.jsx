import React from "react";
import { useState, useEffect } from "react";
import "./Tasks.css";
import { Pencil, Trash2 } from "lucide-react";
import { addTask } from "../firebase/firestore";

//    ...........Task State...........
const Tasks = ({ tasks, setTasks, setXp, updateStreak, user }) => {
  const [showForm, setShowForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  // const [tasks, setTasks] = useState(() => {
  //   const savedTasks = localStorage.getItem("tasks");
  //   return savedTasks ? JSON.parse(savedTasks) : [];
  // });

  //................Handeles...........
  const handleAddTask = async () => {
    if (taskTitle.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      completed: false,

      dueDate,
      priority,
      notes,
    };

    try {
      // Save to Firestore
      await addTask(user.uid, newTask);

      // Keep UI updated for now
      setTasks([...tasks, newTask]);

      setTaskTitle("");
      setDueDate("");
      setPriority("Medium");
      setNotes("");
      setShowForm(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setNotes(task.notes);
    setShowForm(true);
  };

  const handleUpdateTask = () => {
    if (taskTitle.trim() === "") {
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId
          ? { ...task, title: taskTitle, dueDate, priority, notes }
          : task,
      ),
    );

    setTaskTitle("");
    setDueDate("");
    setPriority("Medium");
    setNotes("");
    setEditingTaskId(null);
    setShowForm(false);
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id !== id) return task;

        const updatedTask = {
          ...task,
          completed: !task.completed,
        };

        // Give XP only once
        if (!task.completed && !task.xpAwarded) {
          setXp((prev) => prev + 10);
          updateStreak();
          updatedTask.xpAwarded = true;
        }

        return updatedTask;
      }),
    );
  };

  //........................UseEffect.................
  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = totalTasks - completedTasks;

  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <div>
          <h1>Tasks</h1>
          <p>Manage your tasks and complete your daily quests.</p>
        </div>

        <button className="add-task-button" onClick={() => setShowForm(true)}>
          + Add Task
        </button>
      </header>

      {/* ......................form................... */}
      {showForm && (
        <form
          className="task-form"
          onSubmit={(e) => {
            e.preventDefault();

            if (editingTaskId === null) {
              handleAddTask();
            } else {
              handleUpdateTask();
            }
          }}
        >
          <h2>Add New Task</h2>

          <input
            type="text"
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <p>{taskTitle}</p>

          <label>Due Date</label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <label>Priority</label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <label>Notes</label>

          <textarea
            rows="4"
            placeholder="Write notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="form-buttons">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setTaskTitle("");
                setTaskTitle("");
                setDueDate("");
                setPriority("Medium");
                setNotes("");
                setEditingTaskId(null);
              }}
            >
              Cancel
            </button>

            <button type="submit">
              {editingTaskId === null ? "Add Task" : "Update Task"}
            </button>
          </div>
        </form>
      )}

      {/* ..........................Summary Card................... */}
      <div className="task-summary">
        <div className="summary-item">
          <h3>{totalTasks}</h3>
          <p>Total</p>
        </div>

        <div className="summary-item">
          <h3>{completedTasks}</h3>
          <p>Completed</p>
        </div>

        <div className="summary-item">
          <h3>{pendingTasks}</h3>
          <p>Pending</p>
        </div>
      </div>

      {/* .......................progress bar.................... */}
      <div className="progress-section">
        <div className="progress-header">
          <span>Progress</span>
          <span>{completionPercentage}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${completionPercentage}%`,
            }}
          ></div>
        </div>
      </div>

      {/* ......................Search Box.......................... */}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* .................Filter Button............ */}
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {/* ....................Task List................ */}
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div
            className={`task-item ${task.completed ? "completed" : ""}`}
            key={task.id}
          >
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
              />

              <div className="task-info">
                <h3>{task.title}</h3>

                {task.notes && <p className="task-notes">{task.notes}</p>}

                <div className="task-meta">
                  <span
                    className={`priority ${(task.priority || "medium").toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                  {task.dueDate && (
                    <span className="due-date">{task.dueDate}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="task-actions">
              <button
                className="edit-task-button"
                onClick={() => handleEditTask(task)}
              >
                <Pencil size={18} />
              </button>

              <button
                className="delete-task-button"
                onClick={() => handleDeleteTask(task.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
