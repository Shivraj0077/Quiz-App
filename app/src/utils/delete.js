import { deleteAttempt, getAttempts } from "./indb";

const handleDeleteAttempt = async (timestamp, setHistory) => {
  const attempts = await getAttempts();

  const timestampString = new Date(timestamp).toISOString();

  const attemptToDelete = attempts.find(attempt => {
    return new Date(attempt.timestamp).toISOString() === timestampString;
  });
  
  if (attemptToDelete) {
    await deleteAttempt(attemptToDelete.id); 
    const updatedAttempts = await getAttempts();
    setHistory(updatedAttempts || []);
  } else {
    console.error("Attempt not found for deletion. Timestamp:", timestamp); 
  }
};

export default handleDeleteAttempt;