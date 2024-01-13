const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getDate = (timestamp: any) => {
  const dateObj = new Date(timestamp);

  const day = dateObj.getDate();
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  if (timestamp === undefined) {
    return '';
  }
  return formattedDate;
};

export const getTodaysDate = () => {
  const today = new Date();
  const formattedDate =
    today.getDate() +
    '-' +
    months[today.getMonth()] +
    '-' +
    today.getFullYear();
  return formattedDate;
};
