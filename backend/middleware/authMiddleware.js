import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

// Funcion para verificar el token
const checkAuth = async (req, res, next) => {
    let token = null; // <- variable para guardar el token

    /**
     * Verificamos que la solicitud tenga una cabecera de autorizacion
     * Tambien verificamos que esta empieze con 'Bearer'
     */
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // intentamos verificar el token
        try {
            token = req.headers.authorization.split(' ')[1]; // <- separamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // verificamos el token

            /**
             * Tratamos de agregar el ID y el Username a la solicitud
             * (En caso de que necesitemos asociar registros a un usuario) 
             */
            req.usuario = await pool.query('SELECT Id, Username FROM users WHERE Id = ?', [decoded.id])

            // si todo fue bien ya podemos acceder al controller
            return next();
        } catch (error) {
            const e = new Error('Token no valido');
            return res.status(403).json({ message: e.message });
        }
    }
    if (!token) {
        const error = new Error('Token no valido o Inexistente');
        return res.status(403).json({ message: error.message })
    }
    next();
};

export default checkAuth;