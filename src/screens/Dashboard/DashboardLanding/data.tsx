import {PieChartData} from './PieChart';

export const generatePieChartData = () => {
  const itemsCount = Math.floor(Math.random() * 7) + 3;
  const value = [];
  for (let i = 0; i < itemsCount; i++) {
    value.push(Math.floor(Math.random() * 60) + 40);
  }

  const total = value.reduce((a, b) => a + b, 0);

  const data: PieChartData = [];
  for (let i = 0; i < itemsCount; i++) {
    const percent = value[i] / total;
    data.push({
      percent,
      color: getRandomColor(),
    });
  }

  return data;

  //   return [
  //     {
  //       percent: 0.7,
  //       color: '#2F3CA0',
  //     },
  //     {
  //       percent: 0.15,
  //       color: '#03D07D',
  //     },
  //     {
  //       percent: 0.5,
  //       color: '#757FEF',
  //     },
  //     {
  //       percent: 0.1,
  //       color: '#EF2945',
  //     },
  //   ];
};

const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
