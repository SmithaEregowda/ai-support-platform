import { Router } from "express";
import { RegisterController, LoginController } from "../controllers/auth.controller.js";
import {authMiddleware} from "../middlwares/auth.middleware.js";

const router = Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);


export default router;