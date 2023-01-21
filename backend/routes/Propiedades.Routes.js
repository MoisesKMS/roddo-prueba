import { Router } from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
    getPropiedades,
    getPropiedad,
    createPropiedad
} from "../controllers/Propiedades.Controller.js";

const router = Router()

// creamos el endpoint, con el middleware verificamos que este aunteticado,
// si lo esta procedemos a llamar al controlador.
router.route('/propiedades').get(checkAuth, getPropiedades)
router.route('/propiedades/:id').get(checkAuth, getPropiedad)
router.route('/propiedades').post(checkAuth, createPropiedad)


export default router