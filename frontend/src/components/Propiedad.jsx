import { Link } from "react-router-dom";
import { formatearFecha } from "../helpers/index";

const Propiedad = ({ propiedad }) => {
    const {
        ID,
        Description,
        Field,
        Construction,
        Address,
        ContactPhone,
        ContactMail,
        Bathrooms,
        Bedrooms,
        ParkingLots,
        CreatedDate
    } = propiedad

    const handleSubmit = async (e) => {

        e.preventDefault()
        const id = Number(e.target.dataset.id)
        const confirmar = confirm(`¿Deseas eliminar la propiedad: ${Description}?`);

        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
                const url = `http://3.93.144.130/api/propiedades/${id}`
                const respuesta = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                window.location.reload(false);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <tr className="table__tr">
                <td className="table__td">{Description}</td>
                <td className="table__td">{Field}</td>
                <td className="table__td">{Construction}</td>
                <td className="table__td">{Address}</td>
                <td className="table__td">{ContactPhone}</td>
                <td className="table__td">{ContactMail}</td>
                <td className="table__td">{Bathrooms}</td>
                <td className="table__td">{Bedrooms}</td>
                <td className="table__td">{ParkingLots}</td>
                <td className="table__td">{formatearFecha(CreatedDate)}</td>
                <td className="table__td--acciones">
                    <Link className="table__accion  table__accion--editar" to={`/propiedades/actualizar/${ID}`}>
                        <i className="fa-solid fa-user-pen"></i>
                        Editar
                    </Link>
                    <form onSubmit={handleSubmit} data-id={ID}>
                        <button className="table__accion  table__accion--eliminar" type="submit">
                            <i className="fa-solid fa-circle-xmark"></i>
                            Eliminar
                        </button>
                    </form>
                </td>
            </tr>
        </>
    )
}
export default Propiedad;