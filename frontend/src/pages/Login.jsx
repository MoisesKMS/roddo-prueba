import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const Login = () => {



    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({});

    const { setAuth } = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()

        if ([user, password].includes('')) {
            setAlerta({
                message: 'Todos los campos son obligatorios',
                type: 'error'
            })

            return
        }

        try {
            const url = 'http://3.93.144.130/api/login'
            const respuesta = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user,
                    password
                })
            })
            const resultado = await respuesta.json()
            if (resultado?.message) {
                setAlerta({
                    message: resultado.message,
                    type: 'error'
                })
                return
            }

            localStorage.setItem('token', resultado.token);
            setAuth(resultado)
            navigate('/propiedades')

        } catch (error) {
            setAlerta({
                message: error,
                type: 'error'
            })
        }
    }

    const { message } = alerta

    return (
        <>
            {message && <Alerta alerta={alerta} />}
            <main className="login">
                <div className="container login__grid">
                    <div className="login__left">
                        <h1 className="login__title"><span>Inicia Sesión y Administra</span> tus propiedades</h1>
                    </div>

                    <div className="login__right">
                        <form className="l-form" onSubmit={handleSubmit}>
                            <div className="l-form__field">
                                <label htmlFor="user" className="l-form__label">Usuario</label>
                                <input
                                    className="l-form__input"
                                    type="text"
                                    id="user"
                                    value={user}
                                    onChange={e => setUser(e.target.value)}
                                />
                            </div>

                            <div className="l-form__field">
                                <label htmlFor="password" className="l-form__label">Contraseña</label>
                                <input
                                    className="l-form__input"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <input className="l-form__submit" type="submit" value="Iniciar Sesión" />
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login