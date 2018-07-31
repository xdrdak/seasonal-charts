type CountdownObject = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const countdownUntil = (
  msTimestamp: number,
  initialDate?: number,
): CountdownObject => {
  const currentDate = initialDate || new Date().getTime();
  const futureDate = new Date(msTimestamp).getTime();
  let delta = Math.abs((futureDate - currentDate) / 1000);

  const days = Math.floor(delta / 86400);
  delta -= days * 86400;

  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  const seconds = delta % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export default countdownUntil;

export { countdownUntil };
