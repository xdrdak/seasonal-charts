import * as React from 'react';

enum IconType {
  Material = 'md',
  Ios = 'ios',
}

interface Props {
  type?: IconType;
  name: string;
}
const IonIcon: React.SFC<Props> = ({ type, name }) => (
  <i className={`icon ion-${type}-${name}`} />
);

IonIcon.defaultProps = {
  type: IconType.Material,
};

export default IonIcon;
