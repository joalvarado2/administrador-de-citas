import React, { Fragment, useState } from "react";
import uuid from "uuid/dist/v4";

const Formulario = ({ crearCita }) => {

    // creando State  de citas
    const [cita, actualizarCita] = useState({
        mascota: "",
        propietarios: "",
        fecha: "",
        hora: "",
        sintomas: ""
    });

    const [error, actualizarError] = useState(false)


    // funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Extarer los valores
    const { mascota, propietarios, fecha, hora, sintomas } = cita

    // cuando el usuario presiona agregar cita

    const submitCita = (e) => {
        e.preventDefault();

        if (mascota.trim() === "" || propietarios.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === "") {
            actualizarError(true);
            return;
        }
        actualizarError(false);

        cita.id = uuid();
        crearCita(cita);

        actualizarCita({
            mascota: "",
            propietarios: "",
            fecha: "",
            hora: "",
            sintomas: ""
        })


    }

    return (
        <Fragment>
            <h2>Agendar Cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >

                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className=" u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Del Dueño</label>
                <input
                    type="text"
                    name="propietarios"
                    className=" u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={actualizarState}
                    value={propietarios}
                />
                <label>Nombre Del Dueño</label>
                <input
                    type="date"
                    name="fecha"
                    className=" u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className=" u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>

        </Fragment>
    )

}

export default Formulario;