import React from "react";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";

const MiApi = () => {
    //La constante info guardará los valores que trae la API
    const [info, setInfo] = useState ([]); 

    //se llama la función que consume la Api
    useEffect (() => {
    consultarInfo();
    }, []);

    //Funcion que consulta la API
    const consultarInfo = async () => {
        const response = await fetch("/http_coffee.json");
        const cafeData = await response.json();
        setInfo(cafeData);
    }
   
    //Función para realizar el filtrado
    const [buscar, setBuscar] = useState ('')

    const busqueda = (e) => {
        e.preventDefault()
        setBuscar(e.target.value)
    }

    let resultadoBusqueda = []
    if(!buscar) {
        resultadoBusqueda = info
    } else{
        resultadoBusqueda = info.filter((e) =>
        e.title.toLowerCase().includes(buscar.toLocaleLowerCase()) )
    }


    //Función para ordenar alfabéticamente

    const [ordenar, setOrdenar] = useState('AaZ');
    const sorting = (e) => {
        if(ordenar === 'AaZ') {
            const sorted = [...info].sort((a, b) =>
            a[e].toLowerCase() > b[e].toLowerCase() ? 1 : -1
            );
            setInfo(sorted);
            setOrdenar('ZaA');
        }
        if(ordenar === 'ZaA') {
            const sorted = [...info].sort((a, b) =>
            a[e].toLowerCase() < b[e].toLowerCase() ? 1 : -1
            );
            setInfo(sorted);
            setOrdenar('AaZ');
        }
    }

    return (

    <div className="container">
      <Form>
       <h1 className="text-white"> <strong>Tus Cafés Favoritos</strong></h1>
      <Form.Control className="form-control w-50" 
        value={buscar}
        onChange = {busqueda}
        type="text"
        placeholder="Busca tu café Favorito"
        />
        <Button
        className="btn btn-sm bg-secondary mt-3 w-25" 
        onClick={()=>sorting("title")}>Ordena Alfabéticamente: de la A-Z o de la Z-A
        </Button>
        </Form>
    
    { resultadoBusqueda.map((elemento) => (
    <Card className="shadow-lg p-3 bg-body border-primary" style={{width:'27rem', height: 400}} key={elemento.id}>
      <Card.Img src={elemento.image} />
      <Card.Body>
        <ListGroup variant="flush">
            <ListGroup.Item className="text-center"> <h4><strong>{elemento.title}</strong></h4></ListGroup.Item>
            <ListGroup.Item><strong>Descripción: </strong>{elemento.description}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
 ))}

        <footer><strong>© Todos Los Derechos Reservados DMS</strong></footer>
    </div>
        
    );
};

    export default MiApi;