export const getTime = (timestamp: any) => {
  const dateObj = new Date(timestamp);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';

  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  const time = `${formattedHours}:${formattedMinutes} ${amPm}`;
  return time;
};

export const getTimeDifference = (date: Date) => {
  const currentDate = new Date();
  // console.log('currentDate', currentDate.toLocaleString());
  // console.log('date', date.toLocaleString());
  const diff = currentDate.getTime() - date.getTime();
  // console.log('diff', diff);
  const seconds = Math.floor(diff / 1000);
  return seconds;
};
