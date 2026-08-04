import pool from '../config/db.js';

import {
  CREATE_CHAT,
  GET_CHAT_BY_TICKET_ID,
  CREATE_MESSAGE,
  GET_MESSAGES_BY_CHAT_ID,
} from '../queries/chat.quieries.js';

export const createChat = async (ticketId) => {
  const result = await pool.query(CREATE_CHAT, [ticketId]);
  return result.rows[0];
};

export const getChatByTicketId = async (ticketId) => {
  const result = await pool.query(GET_CHAT_BY_TICKET_ID, [ticketId]);
  return result.rows[0];
};

export const createMessage = async (chatId, senderId, senderRole, message) => {
  const result = await pool.query(CREATE_MESSAGE, [chatId, senderId, senderRole, message]);
  return result.rows[0];
};

export const getMessagesByChatId = async (chatId) => {
  const result = await pool.query(GET_MESSAGES_BY_CHAT_ID, [chatId]);
  return result.rows;
};
