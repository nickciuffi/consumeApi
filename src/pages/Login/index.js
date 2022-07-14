import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    let formErrors = false;

    if (password === '' || email === '') {
      formErrors = true;
      toast.error('Preencha todos os campos');
      return !formErrors;
    }

    if (password.length < 3 || password.length > 255) {
      formErrors = true;
      toast.error('Senha inválida');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email inválido');
    }

    return !formErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValidated = validateForm();
    if (!isValidated) return;
    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="senha"
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
