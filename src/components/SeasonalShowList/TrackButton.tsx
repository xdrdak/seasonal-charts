import * as React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { ButtonCircle } from 'rebass';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import Icon from '../IonIcons';

const FavButton = styled(ButtonCircle).attrs({ bg: 'hot-pink' })`
  transition: background-color ease-in-out 200ms;
  cursor: pointer;
  &:hover {
    background-color: ${props => lighten(0.2, '#ff41b4')};
  }
`;

interface Props {
  id: number;
  mediaItemStore?: any;
}
@inject('mediaItemStore')
@observer
class TrackButton extends React.Component<Props> {
  autoSave: Function = null;

  constructor(props) {
    super(props);
    this.trackMediaItem = this.trackMediaItem.bind(this);
    this.untrackMediaItem = this.untrackMediaItem.bind(this);
  }

  trackMediaItem() {
    const id = this.props.id;
    this.props.mediaItemStore.trackItem(id);
  }

  untrackMediaItem() {
    const id = this.props.id;
    this.props.mediaItemStore.untrackItem(id);
  }

  @computed
  get isTracked() {
    const { id } = this.props;
    const { mediaItems } = this.props.mediaItemStore;
    return mediaItems.indexOf(id) >= 0;
  }

  render() {
    return this.isTracked ? (
      <FavButton onClick={this.untrackMediaItem}>
        <Icon name="heart" />
      </FavButton>
    ) : (
      <FavButton onClick={this.trackMediaItem}>
        <Icon name="heart-empty" />
      </FavButton>
    );
  }
}

export default TrackButton;
