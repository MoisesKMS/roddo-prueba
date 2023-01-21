import { pool } from "../config/db.js";
import { generarJWT } from "../helpers/generarJWT.js";
import bcrypt from "bcrypt";


export const login = async (req, res) => {

    // Intentamos autenticar al usuario
    try {
        // extraer el usuario y la contraseña del cuerpo de la solicitud
        const { user, password } = req.body

        /* Comprobar que el usario exista en sql y que no este marcado como eliminado */
        const [rows] = await pool.query('SELECT * FROM users WHERE Username = ? AND DeletedDate IS NULL', [user])
        const usuario = rows[0] // < -- Guardamos la informacion del usario en una variable

        // comprobar si el usario existe
        if (!usuario) {
            const error = new Error('El usario no existe')
            return res.status(403).json({ message: error.message });
        }

        // comprbar que la contraseña sea correcta usando bcrypt
        const passwordResult = await bcrypt.compare(password, usuario.Password)

        if (!passwordResult) {
            const error = new Error('La contraseña es incorrecta')
            return res.status(403).json({ message: error.message });
        }

        // si el usario existe, no esta marcado como eliminado y la contraseña coincide con la del req.body
        // autenticamos al usuario dandole un token firmado.
        res.json({
            Id: usuario.Id,
            Username: usuario.Username,
            token: generarJWT(usuario.Id)
        })
    } catch (error) {
        const err = new Error('No se pudo procesar tu solicitud, revisa que todo este en orden e intenta de nuevo')
        return res.status(400).json({ message: err.message });
    }
}

export const perfil = (req, res) => {
    const { usuario } = req;

    // como siempre devuleve un array con un array dentro (el que contiene al usuario), este lo devolvemos como usuario[0][0]
    /**
     *  [
     *      [
     *          {
     *              datos...
     *          }
     *      ]
     *  ]
     */
    res.send(usuario[0][0]);
}