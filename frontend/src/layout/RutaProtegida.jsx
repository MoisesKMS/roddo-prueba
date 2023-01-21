import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
    const { auth, cargando } = useAuth()

    if (cargando) return 'cargando...'

    return (
        <>
            {auth?.Id ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}
export default RutaProtegida;