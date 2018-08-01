import * as React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import {
  Heading,
  Relative,
  Absolute,
  Link,
  Circle,
  Flex,
  Text,
  Box,
  Card,
} from 'rebass';

import TrackButton from './TrackButton';
import AspectRatioImage from '../AspectRatioImage';
import Ribbon from '../CornerRibbon';
import { countdownUntil } from '../../utils/time-utils';

const EpisodeLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
`;

const EpisodeLinkCircle = styled(Circle)`
  display: flex;
  justify-content: center;
  transition: background-color ease-in-out 100ms;
  &:hover {
    background-color: #85b7f9;
  }
`;

const RelativeHidden = styled(Relative)`
  overflow: hidden;
`;

const plur = (num: number, word: string): string => {
  return `${num} ${word}${num > 1 ? 's' : ''}`;
};

interface CountdownLabelProps {
  days: number;
  hours: number;
  minutes: number;
}
const CountdownLabel: React.SFC<CountdownLabelProps> = ({
  days,
  hours,
  minutes,
}) => (
  <div>
    {plur(days, 'Day')} {plur(hours, 'Hour')} {plur(minutes, 'Minute')}
  </div>
);

interface Props {
  mediaItem: MediaItem;
}
class ListerItem extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { mediaItem } = this.props;
    const { nextAiringEpisode, streamingEpisodes } = mediaItem;
    // Airing at uses seconds, not milliseconds.
    const airingAtTimestamp = nextAiringEpisode.airingAt * 1000;
    const localeString = new Date(airingAtTimestamp).toLocaleDateString();
    const { days, hours, minutes } = countdownUntil(airingAtTimestamp);
    const hasNewEpisode =
      (nextAiringEpisode.episode - streamingEpisodes.length > 1 &&
        streamingEpisodes.length) ||
      (nextAiringEpisode.episode - streamingEpisodes.length == 1 && days >= 5);

    return (
      <Card key={mediaItem.id} boxShadow={2}>
        <RelativeHidden>
          {hasNewEpisode && (
            <Ribbon top="20px" left="-65px" lineHeight="20px">
              New ep!
            </Ribbon>
          )}
          <LazyLoad height={300}>
            <AspectRatioImage imgUrl={mediaItem.coverImage.large} />
          </LazyLoad>
          <Box mb={3}>
            <Text fontSize={1} color="black-50">
              {localeString}
            </Text>
            <CountdownLabel days={days} hours={hours} minutes={minutes} />
          </Box>
          <Heading fontSize={2} mb={1}>
            {mediaItem.title.romaji}
          </Heading>

          <Text fontSize={1} mb={3} fontWeight={'lighter'}>
            <em>{mediaItem.title.english}</em>
          </Text>

          <Flex my={2} justifyContent="center">
            {streamingEpisodes.map((episode, index, arr) => (
              <div key={`${mediaItem.id}_${index}`}>
                <EpisodeLinkCircle size="32px">
                  <EpisodeLink
                    color="white"
                    href={episode.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {arr.length - index}
                  </EpisodeLink>
                </EpisodeLinkCircle>
              </div>
            ))}
          </Flex>

          <Absolute top={5} right={5}>
            <TrackButton id={this.props.mediaItem.id} />
          </Absolute>
        </RelativeHidden>
      </Card>
    );
  }
}

export default ListerItem;
