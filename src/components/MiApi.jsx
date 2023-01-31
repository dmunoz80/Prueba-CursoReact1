import React from "react";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';

const MiApi = () => {
    //Guardar info traída desde la Api
    const [info, setInfo] = useState ([]);
    //Llamar a la función que consume la Api
    useEffect (() => {
    consultarInfo();
    }, [])
    //Funcion que consulta la Api
    const consultarInfo = async () => {
        const response = await fetch("/coffee.json");
        const data = await response.json();
        setInfo(data);
    }
   
    //Función de Filtrado
    const [search, setSearch] = useState ('')

    const busqueda = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    let results = []
    if(!search) {
        results = info
    } else{
        results = info.filter((elemento) =>
        elemento.title.toLowerCase().includes(search.toLocaleLowerCase()) )
    }


    //Función para ordenar alfabéticamente

    const [ordenar, setOrdenar] = useState('AZ');
    const sorting = (e) => {
        if(ordenar === 'AZ') {
            const sorted = [...info].sort((a, b) =>
            a[e].toLowerCase() > b[e].toLowerCase() ? 1 : -1
            );
            setInfo(sorted);
            setOrdenar('ZA');
        }
        if(ordenar === 'ZA') {
            const sorted = [...info].sort((a, b) =>
            a[e].toLowerCase() < b[e].toLowerCase() ? 1 : -1
            );
            setInfo(sorted);
            setOrdenar('AZ');
        }
    }

    return (

    <div className="container">
      <Form>
       <h1 className="text-white"> <strong>Tus Cafés Favoritos</strong></h1>
      <Form.Control className="form-control w-50" 
        value={search}
        onChange = {busqueda}
        type="text"
        placeholder="Busca tu café Favorito"
        />
        <Button
        className="btn btn-sm bg-secondary mt-3 w-25" 
        onClick={()=>sorting("title")}>Ordena Alfabéticamente: A-Z or Z-A
        </Button>
        </Form>
    
    { results.map((elemento) => (
    <Card className="shadow-lg p-3 bg-body" key={elemento.id}>
      <Card.Img src={elemento.image}  />
      <Card.Body>
        <Card.Title className='bg-primary text-white text-center'>{elemento.title}</Card.Title>
        <Card.Text className="pt-3">
            <strong>Description:</strong> {elemento.description}
        </Card.Text>
      </Card.Body>
    </Card>
 ))}

        <footer><strong>© Todos Los Derechos Reservados DMS</strong></footer>
    </div>
        
    );
};

    export default MiApi;