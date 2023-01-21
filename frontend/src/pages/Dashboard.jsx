import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Propiedad from "../components/Propiedad";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { cerrarSesion } = useAuth()
    const [propiedades, setPropiedades] = useState([]);

    useEffect(() => {
        const obtenerPropiedades = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return;

                const url = 'http://3.93.144.130/api/propiedades'
                const respuesta = await fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                const resultado = await respuesta.json()
                setPropiedades(resultado);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPropiedades();
    }, [])

    return (
        <main className="dashboard">
            <div className="dashboard__header">
                <h1 className="dashboard__title">Lista de <span>Propiedades</span></h1>
                <div className="dashboard__buttons">
                    <Link to="/propiedades/nuevo" className="btn btn__rosa">Nueva Propiedad</Link>
                    <button onClick={cerrarSesion} className="btn btn__rojo" type="button">Cerrar Sesión</button>
                </div>
            </div>
            <div className="dashboard__body">
                <table className="table">
                    <thead className="table__thead">
                        <tr>
                            <th className="table__th">Descripcion</th>
                            <th className="table__th">Field</th>
                            <th className="table__th">Construcción</th>
                            <th className="table__th">Dirección</th>
                            <th className="table__th">Télefono</th>
                            <th className="table__th">Email</th>
                            <th className="table__th">Baños</th>
                            <th className="table__th">Habitaciones</th>
                            <th className="table__th">Estacionamiento (#)</th>
                            <th className="table__th">Fecha de Creación</th>
                            <th className="table__th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="table__tbody">
                        {
                            propiedades.map(propiedad => (
                                <Propiedad key={propiedad.ID} propiedad={propiedad} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </main>
    )
}
export default Dashboard;