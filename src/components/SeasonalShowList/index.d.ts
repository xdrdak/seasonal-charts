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
