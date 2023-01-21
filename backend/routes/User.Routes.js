import { Router } from "express";
import { login, perfil } from "../controllers/User.Controller.js";
import checkAuth from "../middleware/authMiddleware.js";


const router = Router()

router.post('/login', login)
router.route('/perfil').get(checkAuth, perfil)



export default router