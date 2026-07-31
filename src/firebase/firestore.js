import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

// Add Task
export const addTask = async (userId, task) => {
  const taskRef = collection(db, "users", userId, "tasks");
  await addDoc(taskRef, task);
};

// Get Tasks
export const getTasks = async (userId) => {
  const taskRef = collection(db, "users", userId, "tasks");
  const snapshot = await getDocs(taskRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Delete Task
export const deleteTask = async (userId, taskId) => {
  await deleteDoc(doc(db, "users", userId, "tasks", taskId));
};

// Update Task
export const updateTask = async (userId, taskId, updatedTask) => {
  await updateDoc(
    doc(db, "users", userId, "tasks", taskId),
    updatedTask
  );
};