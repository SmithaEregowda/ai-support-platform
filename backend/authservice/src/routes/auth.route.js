import { Router } from "express";
import { RegisterController, LoginController, getUserDetailsController } from "../controllers/auth.controller.js";
import {authMiddleware} from "../middlwares/auth.middleware.js";

const router = Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/:userId", authMiddleware, getUserDetailsController);


export default router;