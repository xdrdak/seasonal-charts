import { observable, action, reaction, IObservableArray } from 'mobx';
import { saveMediaItems } from '../utils/localstorage-utils';

export interface IMediaItemsStore {
  mediaItems: IObservableArray<number>;
  autoSaveDisposer: Function;
  trackItem(id: number);
  untrackItem(id: number);
  dispose();
}

class MediaItemsStore implements IMediaItemsStore {
  @observable mediaItems: IObservableArray<number>;
  autoSaveDisposer: Function = null;

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

  dispose() {
    this.autoSaveDisposer();
  }
}

export default MediaItemsStore;
