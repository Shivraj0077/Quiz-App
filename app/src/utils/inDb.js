import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";

const DB_NAME = "QuizApp";
const STORE_NAME = "attempts";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

export async function saveAttempt(quizData) {
  const db = await initDB();
  
  await db.add(STORE_NAME, { 
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    ...quizData 
  });
}

export async function getAttemptById(id) {
  const db = await initDB();
  return await db.get(STORE_NAME, id);
}

export async function getAttempts() {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

export async function deleteAttempt(id) {
  try {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
    return true;
  } catch (error) {
    console.error("Error deleting attempt:", error);
    return false;
  }
}
