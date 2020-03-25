import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import { Container, Form } from './styles';
import Button from '../../components/Button/styles';
import BackLink from '../../components/BackLink/styles';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    } catch (error) {
      alert('Falha no login');
    }
  };

  return (
    <Container>
      <section>
        <img src={logoImg} alt="Be The Hero" />

        <Form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Button type="submit">Entrar</Button>

          <BackLink to="/register">
            <FiLogIn size={16} color="#e02041" /> Não tenho cadastro
          </BackLink>
        </Form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </Container>
  );
}