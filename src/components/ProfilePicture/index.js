import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { ProfCont } from './styled';

export default function ProfilePicture({ url, nome, id }) {
  return (
    <ProfCont>
      {url ? (
        <img crossOrigin="anonymous" src={url} alt={`Foto do aluno ${nome}`} />
      ) : (
        <FaUserCircle size={180} />
      )}
      <Link to={`/fotos/${id}`}>
        <FaEdit size={24} />
      </Link>
    </ProfCont>
  );
}

ProfilePicture.defaultProps = {
  url: '',
  nome: '',
};

ProfilePicture.propTypes = {
  url: PropTypes.string,
  nome: PropTypes.string,
  id: PropTypes.number.isRequired,
};
