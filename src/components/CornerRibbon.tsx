import styled from 'styled-components';

type RibbonProps = {
  color?: string;
  bg?: string;
  zIndex?: number;
  top?: string;
  left?: string;
  lineHeight?: string;
};
const Ribbon = styled.div`
  width: 200px;
  position: absolute;
  top: ${(props: RibbonProps) => props.top || '25px'};
  left: ${(props: RibbonProps) => props.left || '-50px'};
  text-align: center;
  line-height: ${(props: RibbonProps) => props.lineHeight || '50px'};
  letter-spacing: 1px;
  color: ${(props: RibbonProps) => props.color || '#f0f0f0'};
  transform: rotate(-45deg);
  background-color: ${(props: RibbonProps) => props.bg || '#673AB7'};
  z-index: ${(props: RibbonProps) => props.zIndex || 1};
`;

export default Ribbon;
