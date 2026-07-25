import pool from "../config/db.js";
import { FindUserByEmailQuery, CREATE_USER_QUERY } from "../queries/auth.queries.js";

export const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(FindUserByEmailQuery, [email]);
    return result.rows[0]; // Return the first user found, or undefined if not found
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

export const createUser = async (username, email, password, userDetails) => {
  try {
    const result = await pool.query(CREATE_USER_QUERY, [username, email, password, userDetails]);
    return result.rows[0]; // Return the newly created user
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const findUserById = async (id) => {
  try {
    const result = await pool.query(`SELECT * FROM auth_users WHERE id = $1`, [id]);
    return result.rows[0]; // Return the user found by ID, or undefined if not found
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
};