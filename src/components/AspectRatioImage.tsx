import * as React from 'react';
import styled from 'styled-components';

export interface ComponentProps {
  imgUrl?: string;
}

const Wrapper = styled.div`
  height: 0;
  position: relative;
  padding-bottom: 100%;
  margin-bottom: 2rem;
`;

const AspectRatioObject = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props: ComponentProps) => `url(${props.imgUrl})`} top center;
  background-size: cover;
`;

const AspectRatioImage: React.SFC<ComponentProps> = ({ imgUrl }) => (
  <Wrapper>
    <AspectRatioObject imgUrl={imgUrl} />
  </Wrapper>
);

AspectRatioImage.defaultProps = {
  imgUrl: '',
};

export default AspectRatioImage;
