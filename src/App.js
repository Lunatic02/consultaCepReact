import { useState } from 'react';
import React from 'react';
import './styles.css';

import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    // 01001000/json/
    if (input === '') {
      alert('preencha algum cep');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert('Erro ao buscar');
      setInput('');
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador Cep</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu Cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          Procurar
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
