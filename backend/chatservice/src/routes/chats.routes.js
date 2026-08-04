import Router from 'express';
import {
    createChatController,
    getChatByTicketIdController,
    createMessageController,
    getMessagesByChatIdController
} from "../controllers/chat.controller.js";
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/chats', authMiddleware, createChatController);
router.get('/chats/:ticketId', authMiddleware, getChatByTicketIdController);
router.post('/messages', authMiddleware, createMessageController);
router.get('/messages/:chatId', authMiddleware, getMessagesByChatIdController);

export default router;