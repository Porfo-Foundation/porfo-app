import React, {useState, useEffect} from 'react';
import {Image, View} from 'react-native';
import {chainMap} from '../../constants/chain';
import {CDNURL} from '../../config/config';

const CoinLogo = ({
  symbol,
  chainId,
  size = 'medium',
}: {
  symbol: string;
  chainId?: number;
  size?: 'small' | 'medium' | 'large';
}) => {
  const defaultLogo =
    'https://gfa.nyc3.digitaloceanspaces.com/testapp/testdir/default.png';
  useEffect(() => {
    if (symbol) {
      setLogo(`${CDNURL}/coins/${symbol?.toLowerCase()}.png`);
    }
  }, [symbol]);

  const [logo, setLogo] = useState(defaultLogo);

  if (logo) {
    return (
      <View className="flex flex-row relative z-10">
        <Image
          // defaultSource={require('../../assets/images/MATIC.png')}
          source={{uri: `${logo}`}}
          className={`${
            size === 'small'
              ? 'w-6 h-6'
              : size === 'medium'
              ? 'w-10 h-10'
              : 'w-16 h-16'
          } `}
          onError={() => {
            setLogo(defaultLogo);
          }}
        />
        {!!chainId && (
          <Image
            source={chainMap[chainId].image}
            className={`absolute ${
              size === 'small'
                ? 'w-3 h-3  left-4 top-0'
                : 'w-4 h-4  -top-0 -right-0'
            } `}
          />
        )}
      </View>
    );
  }
  return (
    <View className="flex flex-row relative z-10">
      <Image
        source={{uri: `${defaultLogo}`}}
        className="w-[37px] h-[37px] rounded-full"
      />
    </View>
  );
};

export default CoinLogo;
