export const CREATE_TICKET_QUERY = `INSERT INTO tickets (title, description, status, priority, user_id)
 VALUES ($1, $2, $3, $4, $5) RETURNING *`;

export const GET_TICKETS_QUERY = `SELECT * FROM tickets WHERE user_id = $1`;

export const GET_TICKET_BY_ID_QUERY = `SELECT * FROM tickets WHERE id = $1 AND user_id = $2`;

export const UPDATE_TICKET_QUERY = `UPDATE tickets SET title = $1, description = $2, status = $3, priority = $4 
WHERE id = $5 AND user_id = $6 RETURNING *`;

export const ASSIGN_TICKET_QUERY = `UPDATE tickets SET assigned_to = $1 WHERE id = $2 RETURNING *`;

export const DELETE_TICKET_QUERY = `DELETE FROM tickets WHERE id = $1 AND user_id = $2 RETURNING *`;