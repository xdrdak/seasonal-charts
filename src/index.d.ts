type MediaItem = {
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
    episode: number;
  };
  streamingEpisodes: Array<{
    site?: string;
    url?: string;
  }>;
};
