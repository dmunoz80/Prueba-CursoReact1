import React from "react";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";

const MiApi = () => {
    //La constante info guardará los valores que trae la API
    const [infoList, setInfoList] = useState ([]); 

    //se llama la función que consume la Api
    useEffect (() => {
    consultarInfo();
    }, []);

    //Funcion que consulta la API
    const consultarInfo = async () => {
        const response = await fetch("/http_coffee.json");
        const cafeData = await response.json();
        setInfoList(cafeData);
    }
   
    //Función para realizar el filtrado
    const [buscar, setBuscar] = useState ('')

    const busqueda = (e) => {
        e.preventDefault()
        setBuscar(e.target.value)
    }

    let resultadoBusqueda = []
    if(!buscar) {
        resultadoBusqueda = infoList
    } else{
        resultadoBusqueda = infoList.filter((e) =>
        e.title.toLowerCase().includes(buscar.toLocaleLowerCase()) )
    }


    //Función para ordenar alfabéticamente

    const [ordenar, setOrdenar] = useState('A-Z');
    const OrdenarLista = (e) => {
        if(ordenar === 'A-Z') {
            const comparar= infoList.sort((a, b) =>
            a[e].toLowerCase() > b[e].toLowerCase() ? 1 : -1
            );
            setInfoList(comparar);
            setOrdenar('Z-A');
        }
        if(ordenar === 'Z-A') {
            const comparar = infoList.sort((a, b) =>
            a[e].toLowerCase() < b[e].toLowerCase() ? 1 : -1
            );
            setInfoList(comparar);
            setOrdenar('A-Z');
        }
    }

    return (

<>
      <Form>
      <Form.Control className="form-control w-50" 
        value={buscar}
        onChange = {busqueda}
        type="text"
        placeholder="Busca tu café favorito"
        />
        <Button
        className="btn btn-sm bg-secondary mt-3 w-20" 
        onClick={()=>OrdenarLista("title")}>Ordena Alfabéticamente: A-Z o Z-A
        </Button>
        </Form>
    
    { resultadoBusqueda.map((elemento) => (
    <Card className="p-3 border-primary" style={{width:'26rem', height: 400}} key={elemento.id}>
      <Card.Img src={elemento.image} />
      <Card.Body>
        <ListGroup variant="flush">
            <ListGroup.Item className="text-center"> <h4><strong>{elemento.title}</strong></h4></ListGroup.Item>
            <ListGroup.Item><strong>Descripción: </strong>{elemento.description}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
 ))}
    </>
    );
};

    export default MiApi;