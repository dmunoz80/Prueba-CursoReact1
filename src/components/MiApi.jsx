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
        const response = await fetch("https://api.sampleapis.com/coffee/hot");
        const data = await response.json();
        setInfo(data);
    }
    //Estado de búsqueda
    const [search, setSearch] = useState ('')
    //Función de búsqueda
    const busqueda = (e) => {
        setSearch(e.target.value)
    }
    //Filtrado
    let results = []
    if(!search) {
        results = info
    } else{
        results = info.filter((elemento) =>
        elemento.title.toLowerCase().includes(search.toLocaleLowerCase()) )
    }
    
    //Funcion de sort
    const [order, setOrder] = useState('ASC');
    const sorting = (col) => {
        if(order === 'ASC') {
            const sorted = [...info].sort((a, b) =>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setInfo(sorted);
            setOrder('DSC');
        }
        if(order === 'DSC') {
            const sorted = [...info].sort((a, b) =>
            a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setInfo(sorted);
            setOrder('ASC');
        }
    }

  

    return (

    <div className="container">
      <Form>
       <h1 className="text-white"> <strong>Your Favourites Coofee</strong></h1>
      <Form.Control className="form-control w-50" 
        value={search}
        onChange = {busqueda}
        type="text"
        placeholder="find your favorite coffee"
        />
        <Button
        className="btn btn-sm bg-secondary mt-3 w-25" 
        onClick={()=>sorting("title")}>in alphabetical order: A-Z or Z-A
        </Button>
        </Form>
    
    { results.map((elemento) => (
    <Card className="shadow-lg p-3 bg-body" key={elemento.id}>
      <Card.Img src={elemento.image}  />
      <Card.Body>
        <Card.Title className='bg-primary text-white text-center rounded'>{elemento.title}</Card.Title>
        <Card.Text className="pt-3">
            <strong>Description:</strong> {elemento.description}
        </Card.Text>
      </Card.Body>
    </Card>
 ))}

        <footer><strong>© Todos Los Derechos Reservados DMS - APIS utilizada de https://sampleapis.com/</strong></footer>
    </div>
        
    );
};

    export default MiApi;