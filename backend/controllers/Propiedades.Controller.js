import { pool } from "../config/db.js";

export const getPropiedades = async (req, res) => {

    /**
     * Intentamos traer los registros de propiedades desde la base de datos
     * Aquellos registros que en su campo DeletedDate no contentan informacion
     * Ya que si la tiene, es indicativo de que la propiedad fue eliminada
     */
    try {
        const [rows] = await pool.query('SELECT * FROM real_state_list WHERE DeletedDate IS NULL') // <- consulta a sql

        const propiedades = rows // <- guardamos todos los registros

        // Les removemos el campo de DeletedDate a todos los registros (a consideracion del db manager)
        propiedades.forEach(propiedad => {
            delete propiedad.DeletedDate
        })

        // retornamos un json con todas las propiedades
        res.json(propiedades)

    } catch (error) {
        return res.status(500).json({
            message: 'No se pudo procesar la solicitud'
        })
    }
}

export const getPropiedad = async (req, res) => {

    /* Tratamos de Obtener una Propiedad */
    try {
        const id = req.params.id // <- obtenemos el id de la propiedad a buscar

        const [rows] = await pool.query('SELECT * FROM real_state_list WHERE ID = ?', [id]) // <- consulta a sql

        /**
         *  La consulta a sql siempre devuelve un array con la propiedad asi que lo obtenemos
         *  y lo guardamos en propiedad.
         */
        const propiedad = rows[0]

        // Comprobamos que tengamos una propiedad y que esta no este marcada como eliminada
        if (!propiedad || propiedad.DeletedDate) {
            return res.status(404).json({
                message: 'No se encontró la propiedad'
            })
        }

        // le removemos el campo de DeletedDate a la propiedad
        delete propiedad.DeletedDate

        // devolvemos un json con la informacion de la propiedad
        res.json(propiedad)

    } catch (error) {
        return res.status(500).json({
            message: 'No se pudo procesar la solicitud'
        })
    }

}

export const createPropiedad = async (req, res) => {

    /* Tratamos de crear una propiedad */
    try {
        // extraemos los valores del body
        const {
            Description,
            Field,
            Construction,
            Address,
            ContactPhone,
            ContactMail,
            Bathrooms,
            Bedrooms,
            Parkinglots
        } = req.body

        /**
         * Tratamos de insertar los valores, despues guardamos el resultado
         */
        const [rows] = await pool.query(`
        INSERT INTO real_state_list (
            Description,
            Field,
            Construction,
            Address,
            ContactPhone,
            ContactMail,
            Bathrooms,
            Bedrooms,
            Parkinglots
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [Description, Field, Construction, Address, ContactPhone, ContactMail, Bathrooms, Bedrooms, Parkinglots])

        // devolvemos un objeto json con los datos almasenados y el id guardado 
        res.send({
            id: rows.insertId,
            Description,
            Field,
            Construction,
            Address,
            ContactPhone,
            ContactMail,
            Bathrooms,
            Bedrooms,
            Parkinglots
        })
    } catch (error) {
        return res.status(500).json({
            message: 'No se pudo procesar la solicitud'
        })
    }
}