import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  margin: 0 auto;
  text-align: center;
`;
export const Logar = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;

  a {
    padding: 10px;
    background-color: ${colors.primaryColor};
    color: #fff;
    border-radius: 20px;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;
