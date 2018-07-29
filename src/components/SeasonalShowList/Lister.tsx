/// <reference path="./index.d.ts" />
import * as React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';
import { forceCheck } from 'react-lazyload';

import ListerItem from './ListerItem';
import BaseSelect from '../BaseSelect';
import CardGrid from '../CardGrid';

const FormBox = styled(Box).attrs({ mb: 2 })``;
enum SortOrder {
  Ascending = 'ascending',
  Descending = 'descending',
}

function sortByAlphabetical(a: MediaItem, b: MediaItem) {
  return a.title.romaji.localeCompare(b.title.romaji);
}

function sortByAiringTime(a: MediaItem, b: MediaItem) {
  return a.nextAiringEpisode.airingAt - b.nextAiringEpisode.airingAt;
}

const swapParams = (doSwap: boolean) => (
  a: MediaItem,
  b: MediaItem,
  func: Function,
) => (doSwap ? func(b, a) : func(a, b));

const sortingStrategy = (
  arr: Array<MediaItem>,
  strategy: string = 'airing',
  sortOrder: string = SortOrder.Ascending,
) => {
  const cloneArr: Array<MediaItem> = [...arr];
  const sortOrderFunc = swapParams(sortOrder === 'descending');
  let sortFunction = null;

  switch (strategy) {
    case 'alphabetical':
      sortFunction = (a: MediaItem, b: MediaItem) =>
        sortOrderFunc(a, b, sortByAlphabetical);
      break;
    case 'airing':
    default:
      sortFunction = (a: MediaItem, b: MediaItem) =>
        sortOrderFunc(a, b, sortByAiringTime);
      break;
  }

  return cloneArr.sort(sortFunction);
};

interface ListerState {
  sortType: string;
  sortOrder: string;
  filter: string;
}
interface ListerProps {
  mediaItems: Array<MediaItem>;
}

class Lister extends React.Component<ListerProps, ListerState> {
  state = {
    sortType: 'airing',
    sortOrder: SortOrder.Ascending,
    filter: 'tracked',
  };

  constructor(props: ListerProps) {
    super(props);
    this.changeSortType = this.changeSortType.bind(this);
    this.changeSortOrder = this.changeSortOrder.bind(this);
  }

  changeSortType(event: React.FormEvent<HTMLSelectElement>) {
    const sortType = event.currentTarget.value;
    this.setState({ sortType }, forceCheck);
  }

  changeSortOrder(event: React.FormEvent<HTMLSelectElement>) {
    const sortOrder = event.currentTarget.value;
    this.setState({ sortOrder }, forceCheck);
  }

  render() {
    const sortedMediaItems = sortingStrategy(
      this.props.mediaItems,
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
              <option value="alphabetical">Alphabetical</option>
              <option value="airing">Airing Date</option>
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
            <label htmlFor="filterBy">Filter By:&nbsp;</label>
            <BaseSelect id="filterBy" name="filterBy">
              <option value="tracked">Tracked</option>
              <option value="untracked">Untracked</option>
            </BaseSelect>
          </FormBox>
        </Flex>

        <CardGrid>
          {sortedMediaItems.map(media => (
            <ListerItem key={media.id} mediaItem={media} />
          ))}
        </CardGrid>
      </div>
    );
  }
}

export default Lister;
