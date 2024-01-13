const responses = [
  {
    content: {
      category: 'getOffChainData',
      data: {
        type: 'table',
        data: [
          {
            name: 'Wrapped Bitcoin',
            currentPrice: 26073,
            logo: 'https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1548822744',
          },
          {
            name: 'Bitcoin',
            currentPrice: 26034,
            logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
          },
          {
            name: 'Bitcoin Avalanche Bridged (BTC.b)',
            currentPrice: 26033,
            logo: 'https://assets.coingecko.com/coins/images/26115/large/btcb.png?1655921693',
          },
          {
            name: 'Huobi BTC',
            currentPrice: 26029,
            logo: 'https://assets.coingecko.com/coins/images/12407/large/hbtc.png?1687143034',
          },
          {
            name: 'yearn.finance',
            currentPrice: 5586.57,
            logo: 'https://assets.coingecko.com/coins/images/11849/large/yearn.jpg?1687142705',
          },
          {
            name: 'Gains Farm',
            currentPrice: 5000.3,
            logo: 'https://assets.coingecko.com/coins/images/13703/large/gfarm_v2.png?1611035398',
          },
          {
            name: 'Tether Gold',
            currentPrice: 1925.96,
            logo: 'https://assets.coingecko.com/coins/images/10481/large/Tether_Gold.png?1668148656',
          },
          {
            name: 'PAX Gold',
            currentPrice: 1889.58,
            logo: 'https://assets.coingecko.com/coins/images/9519/large/paxgold.png?1687143101',
          },
          {
            name: 'Rocket Pool ETH',
            currentPrice: 1813.97,
            logo: 'https://assets.coingecko.com/coins/images/20764/large/reth.png?1637652366',
          },
          {
            name: 'Staked Frax Ether',
            currentPrice: 1750.25,
            logo: 'https://assets.coingecko.com/coins/images/28285/large/sfrxETH_icon.png?1679886768',
          },
        ],
      },
      role: 'assistant',
      timeStamp: 1692705520042,
    },
  },
  {
    content: {
      category: 'getOffChainData',
      data: {
        type: 'text',
        data: 'This is AI Chatbot to perform blockchain related information',
      },
      role: 'assistant',
      timeStamp: 1692705520042,
    },
  },
];

export const getResponse = (index: any) => {
  return responses[index];
};
