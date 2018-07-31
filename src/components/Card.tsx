import * as React from 'react';
import styled from 'styled-components';

interface Props {
  children?: any;
}

const Wrapper = styled.div`
  border-radius: 0.25rem;
  border-color: rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-width: 1px;
  padding: 0;
`;

const Content = styled.div`
  text-align: center;
`;

const Card: React.SFC<Props> = ({ children }) => (
  <Wrapper>
    <Content>{children}</Content>
  </Wrapper>
);

export default Card;
