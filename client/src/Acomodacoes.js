import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Acomodacoes() {
  const [acomodacoes, setAcomodacoes] = useState([]);
  const [cidade, setCidade] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/acomodacoes')
      .then(response => response.json())
      .then(data => setAcomodacoes(data))
      .catch(error => console.error('Erro ao carregar acomodações:', error));
  }, []);

  // const responsável pelo fetch das acomodacoes na cidade 'x' passada na search-bar, filtrando as acomodações pela cidade
  const buscarAcomodacoesCidade = () => {
    fetch(`http://127.0.0.1:5000/acomodacoes?cidade=${encodeURIComponent(cidade)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Nenhuma acomodação encontrada.');
        }
        return response.json();
      })
      .then(data => setAcomodacoes(data))
      .catch(error => {
        console.error(error);
        setAcomodacoes([]);
      });
  };

  // const responsável para adicionar/remover acomodacao de favoritos
  const toggleFavorito = (acomodacao) => {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const index = favoritos.findIndex(fav => fav.id === acomodacao.id);

    if (index === -1) {
      favoritos.push(acomodacao);
    } else {
      favoritos.splice(index, 1);
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));

    setAcomodacoes([...acomodacoes]);
  };

  // const responsável para verificar se a acomodação é favorita
  const isFavorito = (id) => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    return favoritos.some(fav => fav.id === id);
  };

  // const responsável para abrir a página de detalhes da acomodação a partir do clique do botão "ver detalhes"
  const navegarParaDetalhes = (id) => {
    navigate(`acomodacoes/${id}`);
  };

  return (
    <div className='container'>
      <header>
        <h1>
          Anfitriões de Aluguel
        </h1>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Digite a cidade..."
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <button onClick={buscarAcomodacoesCidade}>Pesquisar</button>
      </div>

      <section className='lista-acomodacoes'>
        {acomodacoes.length === 0 ? (
          <p>Nenhuma acomodação encontrada.</p>
        ) : (
          acomodacoes.map((acomodacao, i) => (
            <div key={acomodacao.id || i } className='card'>
              <img src={acomodacao.imagem} alt={acomodacao.nome} width={200} />
              <div className='info-card'>
                <h3>{acomodacao.nome}</h3>
                <p>{acomodacao.localizacao}</p>
                <p className='preco'>R$ {acomodacao.preco_noite} por noite</p>
                <button onClick={() => navegarParaDetalhes(acomodacao.id)}>
                  Ver detalhes
                </button>
                <br></br>
                <br></br>
                <button onClick={() => toggleFavorito(acomodacao)}>
                  {isFavorito(acomodacao.id) ? 'Favoritado' : 'Favoritar'}
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <footer>
        <p>2025 Desafio Anfitriões de Aluguel </p>
      </footer>
    </div>
  );
}

export default Acomodacoes;
