import React, { Fragment, useState, useEffect  } from 'react';
import Formulario from "./components/formulario"
import "../src/styles/index.css";
import Cita from "./components/cita";


function App() {

  // citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"))
  if (!citasIniciales) {
    citasIniciales = []
  }
  // arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia


  useEffect(() =>{

    if(citasIniciales){
      localStorage.setItem("citas", JSON.stringify(citas))
    }else{
      localStorage.setItem("citas", JSON.stringify([]))
    }
  }, [citas, citasIniciales]);

  // funcion que toma las citas actuales y agrega una nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita])
  }

  // funcion que elimina un usuario por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas)
  }

  // mensaje  si no hay citas
  const titulo = citas.length === 0 ? "no hay citas" : "Citas Pendientes"

  return (
    <Fragment>
      <h1>Agendamientos </h1>

      <div className="container">
        <div className="root">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>

  );
}

export default App;
