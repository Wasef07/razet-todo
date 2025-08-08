import db from "../conn/db.js";

export async function createUser(email, username, password) {
  const result = await db.query(
    "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
    [email, username, password]
  );
  return result.rows[0];
}

export const getUserByEmail = async (email) => {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
}


export async function getUserById(id) {
  const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};
