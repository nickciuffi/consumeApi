import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../styles/GlobalStyles';
import { Title, Logar } from './styled';

export default function NotLogged() {
  return (
    <Container>
      <Title>Você precisa estar logado para acessar esta rota</Title>
      <Logar>
        <Link to="/login">Fazer login</Link>
      </Logar>
    </Container>
  );
}
