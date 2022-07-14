import styled from 'styled-components';

export const AlunoContainer = styled.div`
  margin-top: 30px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #aaa;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
`;

export const Headers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
