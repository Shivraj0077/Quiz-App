import { deleteAttempt, getAttempts } from "./indb";

const handleDeleteAttempt = async (timestamp, setHistory) => {
  const attempts = await getAttempts();
  console.log("Retrieved attempts:", attempts); // Log the retrieved attempts

  // Convert the incoming timestamp to a comparable format
  const timestampString = new Date(timestamp).toISOString();

  const attemptToDelete = attempts.find(attempt => {
    // Convert each attempt's timestamp to a comparable format
    return new Date(attempt.timestamp).toISOString() === timestampString;
  });
  
  if (attemptToDelete) {
    await deleteAttempt(attemptToDelete.id); // Use the id for deletion
    const updatedAttempts = await getAttempts();
    setHistory(updatedAttempts || []);
  } else {
    console.error("Attempt not found for deletion. Timestamp:", timestamp); // Log the timestamp being searched
  }
};

export default handleDeleteAttempt;