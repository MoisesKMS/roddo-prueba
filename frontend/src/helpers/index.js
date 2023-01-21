export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);

    // 21 de enero de 2023
    const opciones = {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones);
}