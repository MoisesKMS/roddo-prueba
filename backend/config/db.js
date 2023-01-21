import dotenv from "dotenv";
import { createPool } from 'mysql2/promise'

dotenv.config() // inicializamos las variables de entorno
export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.BD_NAME
})