import { Router } from "express";
import {
  createNotificationController,
  getNotificationsController,
  GetNotificationByIdController,
  UpdateNotificationController,
  DeleteNotificationController
} from "../controllers/notification.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/", authMiddleware, createNotificationController);
router.get("/", authMiddleware, getNotificationsController);
router.get("/:notificationId", authMiddleware, GetNotificationByIdController);
router.put("/:notificationId", authMiddleware, UpdateNotificationController);
router.delete("/:notificationId", authMiddleware, DeleteNotificationController);
export default router;