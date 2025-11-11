import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.js";
import { logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", auth, logout);

export default router;
