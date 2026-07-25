export const FindUserByEmailQuery = `SELECT * FROM auth_users WHERE email = $1`;

export const CREATE_USER_QUERY = `INSERT INTO auth_users 
(username, email, password_hash, user_details)
 VALUES ($1, $2, $3, $4) RETURNING id, username, email, user_details, created_at`;