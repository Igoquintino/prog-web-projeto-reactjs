import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  // const [showRepositories, setShowRepositories] = useState(false);


  useEffect(() => {
    api.get('/repositories').then(response =>
      setRepositories(response.data)
    );
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        title: 'Prog Web',
        url: 'ufopa.edu.br',
        techs: ['Python', 'Node.JS', 'ReactJS'],
      });

      setRepositories([...repositories, response.data]);
      console.log('Repositório adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar repositório:', error);
    }
  }

  async function handleListRepositoriesByTitle(title) {
    const response = await api.get('/repositories');

    const filteredRepositories = response.data.filter(repo => repo.title === title);

    setRepositories(filteredRepositories);
  }

  //  function handleButtonClick() {
  //   setShowRepositories(!showRepositories);
  //  }




  async function handleRemoveRepository(id) {
    // Remove o repositório do estado local
    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories);

    //Envia uma solicitação DELETE para a API para remover o repositório
    await api.delete(`/repositories/${id}`);
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      <br />
      <button onClick={handleListRepositoriesByTitle}>Listar</button>
      {/* <br/>
      <button onClick={handleButtonClick}>Mostrar repositórios</button> */}

    </div>
  );
}

export default App;