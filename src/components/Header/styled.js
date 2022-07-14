import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  a {
    color: #fff;
    font-weight: bold;
  }
`;

export const Clicado = styled.p`
  color: #fff;
`;
