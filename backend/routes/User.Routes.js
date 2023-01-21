import { Router } from "express";
import { login } from "../controllers/User.Controller.js";

const router = Router()

router.post('/login', login)

export default router