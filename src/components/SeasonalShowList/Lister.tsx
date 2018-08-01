import * as React from 'react';
import styled from 'styled-components';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Box, Flex } from 'rebass';
import { forceCheck } from 'react-lazyload';
import ListerItem from './ListerItem';
import BaseSelect from '../BaseSelect';
import CardGrid from '../CardGrid';
import { IMediaItemsStore } from '../../store/MediaItemsStore';

enum FilterBy {
  Tracked = 'tracked',
  Untracked = 'untracked',
  None = 'none',
}

enum SortOrder {
  Ascending = 'ascending',
  Descending = 'descending',
}

enum SortType {
  Airing = 'airing',
  Alphabetical = 'alphabetical',
}

const FormBox = styled(Box).attrs({ mb: 4 })``;

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

  render() {
    const sortedMediaItems = sortingStrategy(
      this.filteredMediaItems,
      this.state.sortType,
      this.state.sortOrder,
    );

    return (
      <div>
        <Flex justifyContent="space-between">
          <FormBox>
            <label htmlFor="sortType">Sort By:&nbsp;</label>
            <BaseSelect
              id="sortType"
              name="sortType"
              onChange={this.changeSortType}
              value={this.state.sortType}
            >
              <option value={SortType.Alphabetical}>Alphabetical</option>
              <option value={SortType.Airing}>Airing Date</option>
            </BaseSelect>

            <BaseSelect
              id="sortOrdering"
              name="sortOrdering"
              onChange={this.changeSortOrder}
              value={this.state.sortOrder}
            >
              <option value={SortOrder.Ascending}>Ascending</option>
              <option value={SortOrder.Descending}>Descending</option>
            </BaseSelect>
          </FormBox>

          <FormBox>
            <BaseSelect
              id="filterBy"
              name="filterBy"
              onChange={this.changeFilterType}
              value={this.state.filter}
            >
              <option value={FilterBy.None}>All shows</option>
              <option value={FilterBy.Tracked}>Tracked Only</option>
              <option value={FilterBy.Untracked}>Untracked Only</option>
            </BaseSelect>
          </FormBox>
        </Flex>
        {sortedMediaItems.length ? (
          <CardGrid>
            {sortedMediaItems.map(media => (
              <ListerItem key={media.id} mediaItem={media} />
            ))}
          </CardGrid>
        ) : (
          "	╮(￣～￣)╭ There's nothing here!"
        )}
      </div>
    );
  }
}

export default Lister;
