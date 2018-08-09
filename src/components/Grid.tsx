import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-gap: 35px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1140px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 2560px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export default Grid;
