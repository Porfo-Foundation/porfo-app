import React, {useState, useEffect} from 'react';
import {Image, View} from 'react-native';
import {chainMap} from '../../constants/chain';
import {CDNURL} from '../../config/config';
const CoinLogoDown = ({
  symbol,
  chainId,
  size = 'medium',
}: {
  symbol: string;
  chainId?: number;
  size?: 'small' | 'medium';
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
          className={`${size === 'small' ? 'w-6 h-6' : 'w-10 h-10'} `}
          onError={() => {
            setLogo(defaultLogo);
          }}
        />
        {!!chainId && (
          <Image
            source={chainMap[chainId].image}
            className="absolute w-4 h-4  left-6 top-6"
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

export default CoinLogoDown;
