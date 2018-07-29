import * as React from 'react';
import { Query } from 'react-apollo';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { Box, Heading, Flex, Button, Absolute, Relative } from 'rebass';
import styled from 'styled-components';

import Card from './Card';
import AspectRatioImage from './AspectRatioImage';
import CardGrid from './CardGrid';
import BaseSelect from './BaseSelect';
import { countdownUntil } from '../utils/time-utils';
import { QUERY_SEASONAL_SHOWS } from '../graphql/graphql-queries';

class MediaItemsState {
  @observable mediaItems = {};

  trackItem(id: number) {
    this.mediaItems = {
      ...this.mediaItems,
      [id]: { tracking: true },
    };
  }

  untrackItem(id) {
    delete this.mediaItems[id];
  }
}

const CardSubtitle = styled(Heading)`
  font-style: italic;
`;

interface MediaItem {
  id: number;
  coverImage: {
    large?: string;
  };
  title: {
    romaji?: string;
    english?: string;
  };
  nextAiringEpisode: {
    airingAt: number;
  };
}

interface ListerItemProps {
  mediaItem: MediaItem;
}
class ListerItem extends React.Component<ListerItemProps> {
  render() {
    const { mediaItem } = this.props;
    // Airing at uses seconds, not milliseconds.
    const airingAtTimestamp = mediaItem.nextAiringEpisode.airingAt * 1000;
    const { days, hours, minutes } = countdownUntil(airingAtTimestamp);

    return (
      <Card key={mediaItem.id}>
        <Relative>
          <LazyLoad height={300}>
            <AspectRatioImage imgUrl={mediaItem.coverImage.large} />
          </LazyLoad>

          <div>
            {days}&nbsp;Days&nbsp;{hours}&nbsp;Hours&nbsp;{minutes}&nbsp;Minutes
          </div>

          <Heading fontSize={2} mb={1}>
            {mediaItem.title.romaji}
          </Heading>
          {mediaItem.title.english && (
            <CardSubtitle fontSize={1} mb={3} fontWeight={'lighter'}>
              {mediaItem.title.english}
            </CardSubtitle>
          )}
          <Absolute top={5} right={5}>
            <Button>track</Button>
          </Absolute>
        </Relative>
      </Card>
    );
  }
}

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

const setSortOrder = (sortOrder: string) => (
  a: MediaItem,
  b: MediaItem,
  func: Function,
) => (sortOrder === SortOrder.Ascending ? func(a, b) : func(b, a));

const sortingStrategy = (
  arr: Array<MediaItem>,
  strategy: string = 'airing',
  sortOrder: string = 'ascending',
) => {
  const cloneArr: Array<MediaItem> = [...arr];
  const sortOrderFunc = setSortOrder(sortOrder);
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
    sortOrder: 'ascending',
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
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
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

interface QueryData {
  Page: {
    media: Array<MediaItem>;
  };
}
interface QueryVariables {
  season: string;
  seasonYear: number;
  format: string;
}
class SeasonalShowQuery extends Query<QueryData, QueryVariables> {}
interface SeasonalShowListProps {
  season: string;
  seasonYear: number;
  format: string;
}

const SeasonalShowList: React.SFC<SeasonalShowListProps> = ({
  season,
  seasonYear,
  format,
}) => (
  <SeasonalShowQuery
    query={QUERY_SEASONAL_SHOWS}
    variables={{ season, seasonYear, format }}
  >
    {({ loading, error, data }) => {
      if (loading) return '(￣▽￣)ノ';
      if (error) return `Error!: ${error}`;
      return <Lister mediaItems={data.Page.media} />;
    }}
  </SeasonalShowQuery>
);

export default SeasonalShowList;
