import {
  createChat, getChatByTicketId, 
  createMessage, getMessagesByChatId
} from '../services/chat.service.js';

export const createChatController = async (req, res) => {
  const { ticketId } = req.body;
  try {
    const chat = await createChat(ticketId);
    res.status(201).json(chat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getChatByTicketIdController = async (req, res) => {
  const { ticketId } = req.params;
  try {
    const chat = await getChatByTicketId(ticketId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    res.status(200).json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createMessageController = async (req, res) => {
  const { chatId, senderId, senderRole, message } = req.body;
  try {
    const newMessage = await createMessage(chatId, senderId, senderRole, message);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessagesByChatIdController = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await getMessagesByChatId(chatId);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
