// import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import { Form, Title } from './styled';
import ProfilePicture from '../../components/ProfilePicture';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import history from '../../services/history';

export default function Aluno({ match }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const id = get(match, 'params.id', 0)
  const isEdit = Boolean(id);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    async function getDataAluno() {
      setIsLoading(true);
      try {
        const dataAluno = await axios.get(`/alunos/${id}`);
        const info = get(dataAluno, 'data', {});
        setNome(info.nome);
        setSobrenome(info.sobrenome);
        setEmail(info.email);
        setAltura(info.altura);
        setIdade(info.idade);
        setPeso(info.peso);
        const Foto = get(info, 'Fotos[0].url', '');
        setFoto(Foto);
        setIsLoading(false);
      } catch (e) {
        const errors = get(e, 'response.data.errors', []);
        const status = get(e, 'response.status', 0);
        errors.map((err) => toast.error(err));
        if (status === 400) history.push('/');

        setIsLoading(false);
      }
    }
    getDataAluno();
  }, []);

  function setStateInitial() {
    setNome('');
    setSobrenome('');
    setEmail('');
    setAltura('');
    setIdade('');
    setPeso('');
  }

  function validateForm() {
    let formErrors = false;
    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.warn('O nome deve ter entre 3 e 255 caracteres');
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.warn('O sobrenome deve ter entre 3 e 255 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.warn('Email inválido');
    }
    if (!isInt(`${idade}`)) {
      formErrors = true;
      toast.warn('A idade deve ser um número inteiro');
    }
    if (!isFloat(String(altura))) {
      formErrors = true;
      toast.warn('A altura deve ser um número');
    }
    if (!isFloat(String(peso))) {
      formErrors = true;
      toast.warn('O peso deve ser um número');
    }
    const isValidated = !formErrors;
    return isValidated;
  }

  async function storeAluno() {
    try {
      await axios.post(`/alunos`, {
        nome,
        sobrenome,
        email,
        idade,
        peso,
        altura,
      });
      toast.success('Aluno cadastrado com sucesso');
      setStateInitial();
      setIsLoading(false);
    } catch (e) {
      const errors = get(e, 'response.data.errors', []);
      errors.map((error) => toast.error(error));
      setIsLoading(false);
    }
  }
  async function editAluno() {
    try {
      await axios.put(`/alunos/${id}`, {
        nome,
        sobrenome,
        email,
        idade,
        peso,
        altura,
      });
      toast.success('Aluno editado com sucesso');
      setIsLoading(false);
    } catch (e) {
      const errors = get(e, 'response.data.errors', []);
      const status = get(e, 'response.status', 0);
      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido');
      }
      if (status === 401) {
        dispatch(actions.registerFailure);
      }
      setIsLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isValidated = validateForm();
    if (!isValidated) return;

    setIsLoading(true);
    if (id) {
      editAluno();
    } else {
      storeAluno();
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{isEdit ? 'Editar aluno' : 'Adicionar aluno'}</Title>
      {id ? <ProfilePicture url={foto} nome={nome} id={Number(id)} /> : null}

      <Form onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          type="text"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
          placeholder="nome"
        />
        <input
          required
          type="text"
          onChange={(e) => setSobrenome(e.target.value)}
          value={sobrenome}
          placeholder="Sobrenome"
        />
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email"
        />
        <input
          required
          type="number"
          onChange={(e) => setIdade(e.target.value)}
          value={idade}
          placeholder="idade"
        />
        <input
          required
          type="text"
          onChange={(e) => setPeso(e.target.value)}
          value={peso}
          placeholder="peso"
        />
        <input
          required
          type="text"
          onChange={(e) => setAltura(e.target.value)}
          value={altura}
          placeholder="altura"
        />

        <button type="submit">{isEdit ? 'Editar' : 'Cadastrar'}</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
