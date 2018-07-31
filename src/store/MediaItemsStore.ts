import { observable, action, reaction, computed, IObservableArray } from 'mobx';
import { saveMediaItems } from '../utils/localstorage-utils';

class MediaItemsStore {
  @observable mediaItems: IObservableArray<number>;
  autoSaveDisposer = null;

  constructor(initialMediaItems: Array<number> = []) {
    this.mediaItems = observable(initialMediaItems);
    this.autoSaveDisposer = reaction(
      () => this.mediaItems.length,
      () => {
        saveMediaItems(this.mediaItems);
      },
    );
  }

  @action.bound
  trackItem(id: number) {
    this.mediaItems.push(id);
  }

  @action.bound
  untrackItem(id: number) {
    this.mediaItems.remove(id);
  }
}

export default MediaItemsStore;
