import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/User.Routes.js";


const app = express() // traesmos express
app.use(express.json()) // permitimos las respuestas json
dotenv.config() // inicializamos las variables de entorno

//Le damos acceso a la api solo a los sitios permitidos
const allowDomains = [process.env.FRONTEND_URL]; // <- arreglo de dominios permitidos
const corsOptions = {
    origin: function (origin, callback) {
        if (allowDomains.indexOf(origin) !== -1) {
            // El origen del request esta permitido
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}

// en caso de que se quiera permitir solicitudes de sitios determinados
// app.use(cors(corsOptions)) // <- cargamos la configuracion en express

// en caso de que que quiera permitir solicitudes de todos los sitios
app.use(cors({
    origin: '*'
}))

/**
 * EndPoints de la API
 */
app.use('/api', userRoutes) // ruta master para la api de usarios

// En caso de no tener un EndPoint calido devolver un 404
app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro el endpoint'
    })
})

// definimos un puerto para express
const PORT = process.env.PORT || 4000

// iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto: ${PORT}`)
})