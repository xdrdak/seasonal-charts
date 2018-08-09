export enum Season {
  Summer = 'SUMMER',
  Winter = 'WINTER',
  Spring = 'SPRING',
  Fall = 'FALL',
}

export const getCurrentSeason = (): Season => {
  const d = new Date().getMonth();
  switch (d) {
    case 0:
    case 1:
    case 2:
      return Season.Winter;
    case 3:
    case 4:
    case 5:
      return Season.Spring;
    case 6:
    case 7:
    case 8:
      return Season.Summer;
    case 9:
    case 10:
    case 11:
    default:
      return Season.Winter;
  }
};
