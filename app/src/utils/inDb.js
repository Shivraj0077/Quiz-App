// inDb.js
import { openDB } from "idb";
import { v4 as uuidv4 } from 'uuid';

const DB_NAME = "QuizApp";
const STORE_NAME = "attempts";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("userId", "userId"); // Add index for userId
      }
    },
  });
}

export async function saveAttempt(quizData) {
  const userStr = localStorage.getItem("loggedInUser");
  if (!userStr) {
    throw new Error("No user logged in");
  }
  
  const user = JSON.parse(userStr);
  const db = await initDB();
  
  await db.add(STORE_NAME, { 
    id: uuidv4(),
    userId: user.username,
    timestamp: new Date().toISOString(),
    ...quizData 
  });
}

export async function getAttemptById(id) {
  const userStr = localStorage.getItem("loggedInUser");
  if (!userStr) {
    return null;
  }

  const user = JSON.parse(userStr);
  const db = await initDB();
  const attempt = await db.get(STORE_NAME, id);
  
  // Only return if it belongs to the current user
  return attempt && attempt.userId === user.username ? attempt : null;
}

export async function getAttempts() {
  const userStr = localStorage.getItem("loggedInUser");
  if (!userStr) {
    return [];
  }

  const user = JSON.parse(userStr);
  const db = await initDB();
  const allAttempts = await db.getAll(STORE_NAME);
  
  // Filter attempts for current user
  return allAttempts.filter(attempt => attempt.userId === user.username);
}

export async function deleteAttempt(id) {
  try {
    const userStr = localStorage.getItem("loggedInUser");
    if (!userStr) {
      return false;
    }

    const user = JSON.parse(userStr);
    const db = await initDB();
    
    // Verify attempt belongs to user before deleting
    const attempt = await db.get(STORE_NAME, id);
    if (!attempt || attempt.userId !== user.username) {
      return false;
    }

    await db.delete(STORE_NAME, id);
    return true;
  } catch (error) {
    console.error("Error deleting attempt:", error);
    return false;
  }
}