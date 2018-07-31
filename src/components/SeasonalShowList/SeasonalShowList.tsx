/// <reference path="./index.d.ts" />

import * as React from 'react';
import { Query } from 'react-apollo';
import Lister from './Lister';
import { QUERY_SEASONAL_SHOWS } from '../../graphql/graphql-queries';

interface IQueryData {
  Page: {
    media: Array<MediaItem>;
  };
}
interface IQueryVariables {
  season: string;
  seasonYear: number;
  format: string;
}
class SeasonalShowQuery extends Query<IQueryData, IQueryVariables> {}
interface ISeasonalShowListProps {
  season: string;
  seasonYear: number;
  format: string;
}

const SeasonalShowList: React.SFC<ISeasonalShowListProps> = ({
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
