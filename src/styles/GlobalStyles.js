import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

body{
  font-family: sans-serif;
  background: ${colors.primaryDarkColor};
  color: ${colors.primaryColor};
}
html, body,  #root{
  height: 100%;
}
button{
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 700;

}
button:hover{
  filter: brightness(.7);
}
a{
  text-decoration: none;
  color: ${colors.primaryColor};
}
ul{
  list-style: none;
}

`;

export const Container = styled.section`
  max-width: 680px;
  width: 80%;
  position: relative;
  background-color: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
