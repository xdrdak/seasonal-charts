/// <reference path="./index.d.ts" />
import * as React from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import { Heading, Relative, Button, Absolute } from 'rebass';

import Card from '../Card';
import AspectRatioImage from '../AspectRatioImage';
import { countdownUntil } from '../../utils/time-utils';

const CardSubtitle = styled(Heading)`
  font-style: italic;
`;

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

export default ListerItem;
