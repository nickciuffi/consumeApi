import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));
        setIsLoading(false);
      } catch (e) {
        toast.error('Erro ao obter imagem');
        setIsLoading(false);
        history.push('/');
      }
    }
    getData();
  }, []);

  async function handleChange(e) {
    const newFoto = e.target.files[0];
    const fotoURL = URL.createObjectURL(newFoto);
    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('arquivo', newFoto);

    try {
      setIsLoading(true);
      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Foto enviada com sucesso');
      setIsLoading(false);
    } catch (err) {
      const { status } = get(err, 'response', '');
      toast.error('Erro ao enviar foto');
      if (status === 400) dispatch(actions.loginFailure);
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>fotona</Title>
      <Form>
        <label htmlFor="foto">
          {foto ? (
            <img crossOrigin="anonymous" src={foto} alt="Foto" />
          ) : (
            'Selecionar'
          )}
          <input
            type="file"
            id="foto"
            onChange={handleChange}
            accept="image/png, image/jpeg"
          />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
