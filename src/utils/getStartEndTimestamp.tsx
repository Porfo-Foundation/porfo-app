export const getStartEndTimestamp = (currenTimestamp: number) => {
  const differentTimestampRange = {
    '1H': {
      start: currenTimestamp - 60 * 60 * 1000,
      end: currenTimestamp,
      interval: 25,
    },
    '1D': {
      start: currenTimestamp - 24 * 60 * 60 * 1000,
      end: currenTimestamp,
      interval: 50,
    },
    '1W': {
      start: currenTimestamp - 7 * 24 * 60 * 60 * 1000,
      end: currenTimestamp,
      interval: 100,
    },
    '1M': {
      start: currenTimestamp - 30 * 24 * 60 * 60 * 1000,
      end: currenTimestamp,
      interval: 100,
    },
    '1Y': {
      start: currenTimestamp - 365 * 24 * 60 * 60 * 1000,
      end: currenTimestamp,
      interval: 100,
    },
    All: {
      start: currenTimestamp - 365 * 24 * 60 * 60 * 1000,
      end: currenTimestamp,
      interval: 100,
    },
  };
  return differentTimestampRange;
};
