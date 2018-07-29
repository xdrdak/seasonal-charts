/// <reference path="./index.d.ts" />

import * as React from 'react';
import { Query } from 'react-apollo';
import Lister from './Lister';
import { QUERY_SEASONAL_SHOWS } from '../../graphql/graphql-queries';

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
