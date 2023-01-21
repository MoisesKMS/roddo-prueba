import jwt from "jsonwebtoken";

// funcion para generar un Json Web Token
export const generarJWT = (id) => { // <- recibimos un id (el del usuario)
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d" // <- le damos 30 dias de vida al token
    })
}