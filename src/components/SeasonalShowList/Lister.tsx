import * as React from 'react';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Box, Flex } from 'rebass';
import { forceCheck } from 'react-lazyload';

import AnimeCard from './AnimeCard';
import { SortOrder, SelectSortOrder } from './SelectSortOrder';
import { FilterBy, SelectFilterBy } from './SelectFilterBy';
import { SortType, SelectSortType } from './SelectSortType';
import Grid from '../Grid';
import { IMediaItemsStore } from '../../store/MediaItemsStore';

function sortByAlphabetical(a: MediaItem, b: MediaItem) {
  return a.title.romaji.localeCompare(b.title.romaji);
}

function sortByAiringTime(a: MediaItem, b: MediaItem) {
  if (a.nextAiringEpisode && b.nextAiringEpisode) {
    return a.nextAiringEpisode.airingAt - b.nextAiringEpisode.airingAt;
  }

  return 0;
}

const swapParams = (doSwap: boolean) => (
  a: MediaItem,
  b: MediaItem,
  func: Function,
) => (doSwap ? func(b, a) : func(a, b));

const sortingStrategy = (
  arr: Array<MediaItem>,
  strategy: string = SortType.Airing,
  sortOrder: string = SortOrder.Ascending,
) => {
  const cloneArr: Array<MediaItem> = [...arr];
  const sortOrderFunc = swapParams(sortOrder === SortOrder.Descending);
  let sortFunction = null;

  switch (strategy) {
    case SortType.Alphabetical:
      sortFunction = (a: MediaItem, b: MediaItem) =>
        sortOrderFunc(a, b, sortByAlphabetical);
      break;
    case SortType.Airing:
    default:
      sortFunction = (a: MediaItem, b: MediaItem) =>
        sortOrderFunc(a, b, sortByAiringTime);
      break;
  }

  return cloneArr.sort(sortFunction);
};

interface State {
  sortType: string;
  sortOrder: string;
  filter: string;
}
interface Props {
  mediaItems: Array<MediaItem>;
  mediaItemStore?: IMediaItemsStore;
}

@inject('mediaItemStore')
@observer
class Lister extends React.Component<Props, State> {
  state = {
    sortType: SortType.Airing,
    sortOrder: SortOrder.Ascending,
    filter: FilterBy.None,
  };

  constructor(props: Props) {
    super(props);
    this.changeSortType = this.changeSortType.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
    this.changeFilterType = this.changeFilterType.bind(this);
  }

  changeSortType(event: React.FormEvent<HTMLSelectElement>) {
    const sortType = event.currentTarget.value;
    this.setState({ sortType }, forceCheck);
  }

  changeSortOrder(event: React.FormEvent<HTMLSelectElement>) {
    const sortOrder = event.currentTarget.value;
    this.setState({ sortOrder }, forceCheck);
  }

  changeFilterType(event: React.FormEvent<HTMLSelectElement>) {
    const filter = event.currentTarget.value;
    this.setState({ filter }, forceCheck);
  }

  @computed
  get filteredMediaItems() {
    const trackedItems: Array<number> = this.props.mediaItemStore.mediaItems;

    if (this.state.filter === FilterBy.Untracked) {
      return this.props.mediaItems.filter(
        ({ id }) => trackedItems.indexOf(id) === -1,
      );
    }

    if (this.state.filter === FilterBy.Tracked) {
      return this.props.mediaItems.filter(
        ({ id }) => trackedItems.indexOf(id) >= 0,
      );
    }

    return this.props.mediaItems;
  }

  get sortedMediaItems(): Array<MediaItem> {
    return sortingStrategy(
      this.filteredMediaItems,
      this.state.sortType,
      this.state.sortOrder,
    );
  }

  render() {
    return (
      <div>
        <Flex flexDirection={['column', 'row']} mb={4}>
          <Box mb={[3, 0]} mr={[0, 3]}>
            <SelectSortType
              onChange={this.changeSortType}
              value={this.state.sortType}
            />
          </Box>

          <Box mb={[3, 0]}>
            <SelectSortOrder
              onChange={this.changeSortOrder}
              value={this.state.sortOrder}
            />
          </Box>
          <Box ml={[0, 'auto']} mb={[3, 0]}>
            <SelectFilterBy
              onChange={this.changeFilterType}
              value={this.state.filter}
            />
          </Box>
        </Flex>
        {this.sortedMediaItems.length ? (
          <Grid>
            {this.sortedMediaItems.map(media => (
              <AnimeCard key={media.id} mediaItem={media} />
            ))}
          </Grid>
        ) : (
          "	╮(￣～￣)╭ There's nothing here!"
        )}
      </div>
    );
  }
}

export default Lister;
