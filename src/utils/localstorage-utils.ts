enum LocalStorageKeys {
  MediaItems = 'media-items',
}

export const saveMediaItems = (items: Array<number>) => {
  localStorage.setItem(LocalStorageKeys.MediaItems, JSON.stringify(items));
};

export const getMediaItems = (): Array<number> => {
  const data = JSON.parse(localStorage.getItem(LocalStorageKeys.MediaItems));
  return Array.isArray(data) ? data : [];
};
