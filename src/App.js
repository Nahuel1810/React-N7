import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import App from './App.css';

export default function ContadorTxt() {
  const [onload, setOnload] = useState(true);
  const [texto, setTexto] = useState('');
  const [contadorLetras, setContadorLetras] = useState(0);
  const [contadorPalabras, setContadorPalabras] = useState(0);
  const [progreso, setProgreso] = useState(0);
  const [limite, setLimite] = useState(30);
  const maxContadorLetras = limite;
  const mitadContadorLetras = limite / 2;
  const [mostrarAlertaLimite, setAlertaLimite] = useState(false);
  const [mostrarAlertaMitad, setAlertaMitad] = useState(false);

  //Cambios en el texto y contadores
  useEffect(() => {
    setContadorLetras(texto.length);
    setContadorPalabras(texto.trim().split(/\s+/).length);
    setProgreso(Math.floor(texto.length * 100 / limite));
  }, [texto]);

  function handleTextChange(event) {
    const nuevoTexto = event.target.value.slice(0, maxContadorLetras);
    setTexto(nuevoTexto);

    if (nuevoTexto.length === mitadContadorLetras && !mostrarAlertaMitad) {
      setAlertaMitad(true);
    }

    if (nuevoTexto.length >= maxContadorLetras && !mostrarAlertaLimite) {
      setAlertaLimite(true);
    }
  }


  //Alertas 
  const ocultarAlerta = () => {
    setOnload(false);
  }

  const ocultarAlertaMitad = () => {
    setAlertaMitad(false);
  };

  const ocultarAlertaLimite = () => {
    setAlertaLimite(false);
  };


  //Botones
  function aumentarLimite() {
    let aux = limite;
    aux = aux + 10;
    setLimite(aux);
  }

  function disminuirLimite() {
    if (limite > 30) {
      let aux = limite;
      aux = aux - 10;
      setLimite(aux);
    }
  }

  function borrarTodo() {
    const nuevoTexto = "";
    setTexto(nuevoTexto);
  }


  //Aplicacion
  return (
    <div className='Contenedor'>
      <h1 className='Titulo'>TPN°7 React - Hook - user state - useEffect</h1>

      <Dialog
        visible={onload}
        onHide={ocultarAlerta}
        header="Crear un componente que permita ingresar texto y 
        mostrar el número de caracteres ingresados en tiempo real. "
        footer={<Button label="Aceptar" onClick={ocultarAlerta} />}
      >
        <ul>
          <li>Utilizar el hook useState para mantener el estado del texto ingresado.</li>
          <li>Utilizar el hook useEffect para actualizar el número de caracteres cada vez que cambia el estado del texto.</li>
          <li>Mostrar el número de caracteres en la página.</li>
          <li>Añadir un límite de caracteres para el texto ingresado (por ejemplo, 100 caracteres).</li>
          <li>Mostrar una advertencia cuando se alcance el límite de caracteres.</li>
          <li>Crear un componente que permita ingresar texto y mostrar el número de palabras ingresadas en tiempo real.</li>
          <li>Mostrar el número de palabras en la página.</li>
          <li>Implementar el framework https://primereact.org/ o https://v2.grommet.io/ o https://mui.com/</li>
          <li>Subir link de GitHub (incluir este enunciado) en un archivo plano</li>
        </ul>
      </Dialog>



      <Card className='Panel'>
        <InputTextarea value={texto} onChange={handleTextChange} placeholder='Escribi algo' />
        <p>{contadorLetras} caracteres</p>
        <p>{contadorPalabras} palabras</p>
        <Button className='Boton' label="-10 carácteres" raised onClick={disminuirLimite} />
        <Button className='Boton' severity="danger" label="Borrar" raised onClick={borrarTodo} />
        <Button className='Boton' label="+10 carácteres" raised onClick={aumentarLimite} />
        <Dialog
          visible={mostrarAlertaMitad}
          onHide={ocultarAlertaMitad}
          header="¡Vas por la mitad!"
          footer={<Button label="Aceptar" onClick={ocultarAlertaMitad} />}
        >
          <p>Ya has ingresado la mitad de caracteres permitidos.</p>
        </Dialog>
        <Dialog
          visible={mostrarAlertaLimite}
          onHide={ocultarAlertaLimite}
          header="¡Advertencia!"
          footer={<Button label="Aceptar" onClick={ocultarAlertaLimite} />}
        >
          <p>Se ha alcanzado el límite de caracteres.</p>
        </Dialog>
      </Card>
      <ProgressBar className="Barra" value={progreso} />
      <p className='Autor'>Martinez Nahuel</p>
    </div>
  );
}
