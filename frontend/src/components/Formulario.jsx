import { useState } from "react";

const Formulario = () => {
    const [description, setDescription] = useState('');
    const [field, setField] = useState('');
    const [construction, setConstruction] = useState('');
    const [address, setAddress] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactMail, setContactMail] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [parkingLots, setParkingLots] = useState('');

    return (
        <>
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
                    placeholder="Field"
                    value={field}
                    onChange={e => setField(e.target.value)}
                />
            </div>
            <div className="form__field">
                <label className="form__label" htmlFor="Construction">Construcción</label>
                <input className="form__input" type="number"
                    min="0" id="Construction"
                    placeholder="Construcción"
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
                    placeholder="1"
                    value={bathrooms}
                    onChange={e => setBathrooms(e.target.value)}
                />
            </div>
            <div className="form__field">
                <label className="form__label" htmlFor="Bedrooms">Habitaciones</label>
                <input className="form__input" type="number"
                    id="Bedrooms" min="0"
                    placeholder="2"
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
        </>
    )
}
export default Formulario;