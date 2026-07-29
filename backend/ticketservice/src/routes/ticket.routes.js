import { Router } from "express";
import {
  CreateTicketsController,
  DeleteTicketController,
  GetTicketByIdController,
  GetTicketsController,
  UpdateTicketController,
} from "../controllers/tickets.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, GetTicketsController);
router.get("/:ticketId", authMiddleware, GetTicketByIdController);
router.post("/", authMiddleware, CreateTicketsController);
router.put("/:ticketId", authMiddleware, UpdateTicketController);
router.delete("/:ticketId", authMiddleware, DeleteTicketController);

export default router;