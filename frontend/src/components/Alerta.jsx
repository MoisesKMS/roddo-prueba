const Alerta = ({ alerta }) => {
    return (
        <div className={`alerta ${alerta.type}`}>
            {alerta.message}
        </div>
    )
}

export default Alerta;