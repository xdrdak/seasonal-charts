import * as React from 'react';
import styled from 'styled-components';

const TextLogoWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: hotpink;
  border-radius: 9999px;
  height: 200px;
  width: 200px;
  color: white;
`;

const TextLogoFlower = styled.div`
  margin-top: -30px;
  font-size: 8rem;
`;

const TextLogoSub = styled.div`
  font-size: 1rem;
  margin-top: -20px;
`;

const TextLogo = () => (
  <TextLogoWrapper>
    <TextLogoFlower>✿</TextLogoFlower>
    <TextLogoSub>Seasonal Charts</TextLogoSub>
  </TextLogoWrapper>
);

export default TextLogo;
