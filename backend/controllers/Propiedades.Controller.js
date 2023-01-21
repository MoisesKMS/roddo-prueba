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

export const updatePropiedad = async (req, res) => {

    /* Tratamos de actualizar la propiedad */
    try {
        const id = req.params.id // <- obtenemos el id de la propiedad a actualizar

        // extraemos los valores de la solicitud
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

        // intetamos hacer la insercion en sql y guardamos el resultado en 'result'
        const [result] = await pool.query(
            `UPDATE real_state_list SET
         Description = IFNULL(?, Description),
         Field = IFNULL(?, Field),
         Construction = IFNULL(?, Construction),
         Address = IFNULL(?, Address),
         ContactPhone = IFNULL(?, ContactPhone),
         ContactMail = IFNULL(?, ContactMail),
         Bathrooms = IFNULL(?, Bathrooms),
         Bedrooms = IFNULL(?, Bedrooms),
         Parkinglots = IFNULL(?, Parkinglots) WHERE ID = ?`,
            [Description, Field, Construction, Address, ContactPhone, ContactMail, Bathrooms, Bedrooms, Parkinglots, id])

        /**
         * Comprobamos si hubo filas affectadas (si las hubo es indicativo de que el registro cambio).
         * En caso de no tener filas afectadas devolvemos un json con un status 404, siendo que el error comun
         * sera que no se encontro una propiedad para hacer cambios
         */
        if (result.affectedRows == 0) {
            return res.status(404).json({
                message: 'No se encontró la propiedad'
            })
        }

        // volvemos a hacer una consulta a slq para traernos la propiedad recien actualizada
        const [rows] = await pool.query('SELECT * FROM real_state_list WHERE ID = ?', [id])

        // como siempre devuleve un array con la propiedad, esta lo guaradmos en propiedad
        const propiedad = rows[0]
        delete propiedad.DeletedDate

        res.json(propiedad) // <- devolvemos la propiedad actualizada

    } catch (error) {
        return res.status(500).json({
            message: 'No se pudo procesar la solicitud'
        })
    }
}