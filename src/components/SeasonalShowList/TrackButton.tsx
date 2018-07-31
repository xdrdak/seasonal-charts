import * as React from 'react';
import { Button } from 'rebass';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

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
      <Button bg="red" onClick={this.untrackMediaItem}>
        untrack
      </Button>
    ) : (
      <Button bg="blue" onClick={this.trackMediaItem}>
        track
      </Button>
    );
  }
}

export default TrackButton;
