import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MiApi from "./components/MiApi";


function App() {
  return (
    
    <div className="container">
      <header>
      <h1 className="text-white"> <strong>Tu Café Favorito</strong></h1>
      </header>

      <MiApi />

      <footer><strong>© Todos Los Derechos Reservados DMS</strong></footer>
    </div>
    

  );
}

export default App;