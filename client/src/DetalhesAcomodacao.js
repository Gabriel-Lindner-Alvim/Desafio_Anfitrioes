import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetalheAcomodacao.css';

function DetalhesAcomodacao() {
  const { id } = useParams(); // Pega o id da acomodação da URL
  const [detalhes, setDetalhes] = useState(null);

  useEffect(() => {
    fetch(`/acomodacoes/${id}`)
      .then(response => response.json())
      .then(data => setDetalhes(data))
      .catch(error => {
        console.error('Erro ao buscar detalhes:', error);
        setDetalhes(null);
      });
  }, [id]);

  if (!detalhes) return <p>Carregando detalhes...</p>;

  return (
    <div className="detalhes-acomodacao">
      <h2>Detalhes da Acomodação</h2>
      <img src={detalhes.imagem} alt={detalhes.nome} width={300} />
      <div className="detalhes-texto-acomodacao">
        <p><strong>Nome:</strong> {detalhes.nome}</p>
        <p><strong>Localização:</strong> {detalhes.localizacao}</p>
        <p><strong>Preço por noite:</strong> R$ {detalhes.preco_noite}</p>
        <p><strong>Descrição:</strong> Pellentesque habitant morbi tristique senectus et netus
                                       et malesuada fames ac turpis egestas. Vestibulum tortor quam, 
                                       feugiat vitae, ultricies eget, tempor sit amet, ante. Donec 
                                       eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
                                        Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. 
                                        Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. 
                                        Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, 
                                        sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. 
                                        Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, 
                                        eu vulputate magna eros eu erat. Aliquam erat volutpat.
                                         Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
    </div>
    </div>
  );
}

export default DetalhesAcomodacao;
