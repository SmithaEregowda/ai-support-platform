
export const CREATE_CHAT = `INSERT INTO chats (ticket_id) VALUES ($1) RETURNING *;`;

export const GET_CHAT_BY_TICKET_ID = `SELECT * FROM chats WHERE ticket_id = $1;`;

export const CREATE_MESSAGE = `INSERT INTO messages (chat_id, sender_id,sender_role, message) VALUES ($1, $2, $3, $4) RETURNING *;`;

export const GET_MESSAGES_BY_CHAT_ID = `SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC;`;