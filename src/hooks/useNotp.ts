import {useEffect, useState} from 'react';
import {NOTP_APIKEY, NOTP_ENDPOINTURL} from '../config/config';

type notpCheckDataType = {
  waId: string;
  waProfile: any;
};

export const useNotp = () => {
  const [notpLinkData, setNotpLinkData] = useState({
    waLink: '',
    org: '',
  });

  const [notpCheckData, setNotpCheckData] = useState<notpCheckDataType>({
    waId: '',
    waProfile: {},
  });

  const getNotpString = async () => {
    try {
      const response = await fetch(`${NOTP_ENDPOINTURL}/getMsgCode`, {
        method: 'POST',
        body: JSON.stringify({
          key: NOTP_APIKEY,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return {
        waLink: data.waLink,
        org: data.org,
      };
    } catch (error) {
      console.log(error);
      return {
        waLink: '',
        org: '',
      };
    }
  };

  useEffect(() => {
    (async function () {
      const {waLink, org} = await getNotpString();
      setNotpLinkData({waLink, org});
    })();
  }, []);

  const startCheck = (org: string) => {
    const checkInterval = setInterval(async () => {
      try {
        const notpApiUrl = NOTP_ENDPOINTURL;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({org: org}),
        };

        const response = await fetch(notpApiUrl + '/check', options);
        if (response.status !== 200) {
          return;
        }
        const resData = await response.json();
        setNotpCheckData({
          waId: resData.waId,
          waProfile: resData.waProfile,
        });
        clearInterval(checkInterval);
      } catch (error) {
        console.error(error);
      }
    }, 3000);
  };

  return {
    notpLinkData,
    notpCheckData,
    startCheck,
  };
};
