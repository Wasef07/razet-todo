import db from "../conn/db.js";

export async function createTask(title, body, user_id) {
  const result = await db.query(
    "INSERT INTO lists (title, body, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, body, user_id]
  );
  return result.rows[0];
}

export const getTasksByUserId = async (userId) => {
  const result = await db.query(
    "SELECT * FROM lists WHERE user_id = $1 ORDER BY created_at ASC",
    [userId]
  );
  return result.rows;
};


export async function updateTask(id, title, body, user_id) {
  const result = await db.query(
    "UPDATE lists SET title = $1, body = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
    [title, body, id, user_id]
  );
  return result.rows[0];
}

export async function deleteTaskById(taskId, userId) {
  const result = await db.query(
    "DELETE FROM lists WHERE id = $1 AND user_id = $2 RETURNING *",
    [taskId, userId]
  );
  return result.rows[0]; 
}