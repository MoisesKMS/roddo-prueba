import { useState, useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";

const Actualizar = () => {

    const [propiedad, setPropiedad] = useState({});
    const [cargando, setCargando] = useState(true);

    // formulario
    const [description, setDescription] = useState('');
    const [field, setField] = useState('');
    const [construction, setConstruction] = useState('');
    const [address, setAddress] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactMail, setContactMail] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [parkingLots, setParkingLots] = useState('');

    const [alerta, setAlerta] = useState({});

    const [guardado, setGuardado] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const obtenerPropiedad = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return;

                const url = `http://3.93.144.130/api/propiedades/${id}`
                const respuesta = await fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                const resultado = await respuesta.json()
                setPropiedad(resultado);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPropiedad();
    }, [])

    if (cargando && propiedad?.Description) {
        setDescription(propiedad.Description)
        setField(propiedad.Field)
        setConstruction(propiedad.Construction)
        setAddress(propiedad.Address)
        setContactPhone(propiedad.ContactPhone)
        setContactMail(propiedad.ContactMail)
        setBathrooms(propiedad.Bathrooms)
        setBedrooms(propiedad.Bedrooms)
        setParkingLots(propiedad.ParkingLots)
        setCargando(false)
    }




    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([description, field, construction, address, contactPhone, contactMail, bathrooms, bedrooms, parkingLots].includes('')) {
            setAlerta({
                message: 'Todos los campos son obligatorios',
                type: 'error'
            })

            return
        }

        try {
            const token = localStorage.getItem('token')
            if (!token) return;

            const datos = {
                "Description": description,
                "Field": field,
                "Construction": construction,
                "Address": address,
                "ContactPhone": contactPhone,
                "ContactMail": contactMail,
                "Bathrooms": bathrooms,
                "Bedrooms": bedrooms,
                "Parkinglots": parkingLots
            }

            const url = `http://3.93.144.130/api/propiedades/${id}`
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(datos)

            })
            setGuardado(true)
        } catch (error) {
            console.log(error);
        }
    }

    const { message } = alerta

    return (
        <main className="dashboard dashboard--form">
            {guardado && (
                <Navigate to="/propiedades" replace={true} />
            )}
            {message && <Alerta alerta={alerta} />}
            <div className="dashboard__header">
                <h1 className="dashboard__title">Actualizar <span>Propiedad</span></h1>
                <div className="dashboard__button">
                    <Link to="/propiedades" className="btn btn__rosa">Regresar</Link>
                </div>
            </div>
            <div className="dashboard__body">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form__field">
                        <label className="form__label" htmlFor="Description" >Descripción</label>
                        <input
                            className="form__input" type="text"
                            id="Description"
                            placeholder="Titulo de la Propiedad"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label" htmlFor="Field">Field</label>
                        <input
                            className="form__input" type="number"
                            id="Field" min="0"
                            placeholder="2"
                            value={field}
                            onChange={e => setField(e.target.value)}
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label" htmlFor="Construction">Construcción</label>
                        <input className="form__input" type="number"
                            min="0" id="Construction"
                            placeholder="1"
                            value={construction}
                            onChange={e => setConstruction(e.target.value)}
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label" htmlFor="Address">Dirección</label>
                        <input
                            className="form__input" type="tel"
                            id="Address"
                            placeholder="Ubicación de la propiedad"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label" htmlFor="ContactPhone">Télefono</label>
                        <input
                            className="form__input" type="text"
                            id="ContactPhone"
                            placeholder="xxxxxxxxxx"
                            value={contactPhone}
                            onChange={e => setContactPhone(e.target.value)}
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label" htmlFor="ContactMail">Email</label>
                        <input className="form__input" type="text"
                            id="ContactMail"
                            placeholder="correo@correo.com"
                            value={contactMail}
                            onChange={e => setContactMail(e.target.value)}
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label" htmlFor="Bathrooms">Baños</label>
                        <input className="form__input" type="number"
                            id="Bathrooms" min="0"
                            placeholder="2"
                            value={bathrooms}
                            onChange={e => setBathrooms(e.target.value)}
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label" htmlFor="Bedrooms">Habitaciones</label>
                        <input className="form__input" type="number"
                            id="Bedrooms" min="0"
                            placeholder="4"
                            value={bedrooms}
                            onChange={e => setBedrooms(e.target.value)}
                        />
                    </div>
                    <div className="form__field">
                        <label className="form__label" htmlFor="ParkingLots">Lugares de Estacionamiento</label>
                        <input className="form__input" type="number"
                            id="ParkingLots" min="0"
                            placeholder="2"
                            value={parkingLots}
                            onChange={e => setParkingLots(e.target.value)}
                        />
                    </div>

                    <div className="form__button">
                        <input className="btn btn__rosa" type="submit" value="Guardar" />
                    </div>
                </form>
            </div>
        </main>
    )
}
export default Actualizar;