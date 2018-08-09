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
  BackgroundImage,
} from 'rebass';

import TrackButton from './TrackButton';
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
  timestamp: number;
}
const CountdownLabel: React.SFC<CountdownLabelProps> = ({ timestamp }) => {
  const { days, hours, minutes } = countdownUntil(timestamp);
  return (
    <div>
      {plur(days, 'Day')} {plur(hours, 'Hour')} {plur(minutes, 'Minute')}
    </div>
  );
};

interface RibbonDisplayerProps {
  nextAiringEpisode?: {
    episode: number;
  };
  streamingEpisodes?: Array<any>;
  timestamp: number;
  freshFor: number;
}
const RibbonDisplayer: React.SFC<RibbonDisplayerProps> = ({
  nextAiringEpisode,
  streamingEpisodes,
  timestamp,
  freshFor,
}) => {
  const { days } = countdownUntil(timestamp);
  let hasNewEpisode: boolean = false;
  if (nextAiringEpisode && streamingEpisodes.length) {
    hasNewEpisode =
      nextAiringEpisode.episode - streamingEpisodes.length >= 1 &&
      days >= freshFor;
  }

  return (
    hasNewEpisode && (
      <Ribbon top="20px" left="-65px" lineHeight="20px">
        New ep!
      </Ribbon>
    )
  );
};

const AiringDate = ({ timestamp }) => {
  const localeString = new Date(timestamp).toLocaleDateString();

  return <>{localeString}</>;
};

interface Props {
  mediaItem: MediaItem;
}
class AnimeCard extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { mediaItem } = this.props;
    const { nextAiringEpisode, streamingEpisodes } = mediaItem;

    const airingAtTimestamp =
      (nextAiringEpisode && nextAiringEpisode.airingAt * 1000) || null;

    return (
      <Card key={mediaItem.id} boxShadow={2}>
        <LazyLoad height={300} once>
          <RelativeHidden>
            <RibbonDisplayer
              freshFor={5}
              timestamp={airingAtTimestamp}
              nextAiringEpisode={nextAiringEpisode}
              streamingEpisodes={streamingEpisodes}
            />
            <Flex flexDirection={['row', 'column']} alignItems={'center'}>
              <BackgroundImage
                width={['30%', '100%']}
                ratio={1}
                pb={[6, '100%']}
                src={mediaItem.coverImage.large}
              />

              <Box width={['70%', '100%']} ml={[2, 0]}>
                {airingAtTimestamp && (
                  <Box mb={3}>
                    <Text fontSize={1} color="black-50">
                      <AiringDate timestamp={airingAtTimestamp} />
                    </Text>
                    <CountdownLabel timestamp={airingAtTimestamp} />
                  </Box>
                )}
                <Heading fontSize={2} mb={1}>
                  {mediaItem.title.romaji}
                </Heading>

                <Text fontSize={1} mb={3} fontWeight={'lighter'}>
                  <em>{mediaItem.title.english}</em>
                </Text>

                <Flex my={2} justifyContent="center" flexWrap="wrap">
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
              </Box>
            </Flex>
          </RelativeHidden>
        </LazyLoad>
      </Card>
    );
  }
}

export default AnimeCard;
