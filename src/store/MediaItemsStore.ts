import { observable } from 'mobx';

class MediaItemsStore {
  @observable mediaItems = {};

  constructor() {}

  trackItem(id) {
    this.mediaItems = {
      ...this.mediaItems,
      [id]: {
        id,
        tracked: true,
      },
    };
  }

  untrackItem(id) {
    delete this.mediaItems[id];
  }
}

export default MediaItemsStore;
