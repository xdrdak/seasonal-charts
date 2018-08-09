import { gql } from 'apollo-boost';

export const QUERY_SEASONAL_SHOWS = gql`
  query($season: MediaSeason, $seasonYear: Int, $format: MediaFormat) {
    Page(perPage: 50) {
      pageInfo {
        total
      }
      media(season: $season, seasonYear: $seasonYear, format: $format) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        episodes
        nextAiringEpisode {
          airingAt
          episode
        }
        streamingEpisodes {
          site
          url
        }
      }
    }
  }
`;
