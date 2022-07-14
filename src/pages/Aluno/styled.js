import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;
