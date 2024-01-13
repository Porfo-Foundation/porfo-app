import {ImageSourcePropType} from 'react-native';
export const chainMap: Record<
  number,
  {
    symbol: string;
    image: ImageSourcePropType;
  }
> = {
  1: {
    symbol: 'ETH',
    image: require('../assets/images/ETH.png'),
  },
  5: {
    symbol: 'ETH',
    image: require('../assets/images/ETH.png'),
  },
  56: {
    symbol: 'BSC',
    image: require('../assets/images/BSC.png'),
  },
  97: {
    symbol: 'BSC',
    image: require('../assets/images/BSC.png'),
  },
  137: {
    symbol: 'MATIC',
    image: require('../assets/images/MATIC.png'),
  },
  80001: {
    symbol: 'MATIC',
    image: require('../assets/images/MATIC.png'),
  },
};
