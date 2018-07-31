import * as React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import { Heading, Relative, Absolute, Link, Circle, Flex } from 'rebass';

import TrackButton from './TrackButton';
import Card from '../Card';
import AspectRatioImage from '../AspectRatioImage';
import { countdownUntil } from '../../utils/time-utils';

const CardSubtitle = styled(Heading)`
  font-style: italic;
`;

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

interface Props {
  mediaItem: MediaItem;
  mediaItemStore?: any;
}
class ListerItem extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

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

          <Flex my={2} justifyContent="center">
            {mediaItem.streamingEpisodes.map((episode, index) => (
              <div key={`${mediaItem.id}_${index}`}>
                <EpisodeLinkCircle size="32px">
                  <EpisodeLink
                    color="white"
                    href={episode.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {index}
                  </EpisodeLink>
                </EpisodeLinkCircle>
              </div>
            ))}
          </Flex>

          <Absolute top={5} right={5}>
            <TrackButton id={this.props.mediaItem.id} />
          </Absolute>
        </Relative>
      </Card>
    );
  }
}

export default ListerItem;
