import { Router } from "express";
import {getUserDetailsController} from "../controllers/user.controller.js";
import {authMiddleware} from "../middlwares/auth.middleware.js";

const router = Router();

router.get("/:userId", authMiddleware, getUserDetailsController);

export default router;