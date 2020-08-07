import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {DAI_QUERY, ETH_PRICE_QUERY} from './queries';
import {ADDRESSES} from './tokens';
import './App.css';

export default () => {
  const [token, setToken] = useState('DAI');

  const { loading: ethLoading, error: ethError, data: ethPriceData } = useQuery(ETH_PRICE_QUERY)
  const { loading: tokenLoading, error: tokenError, data: tokenData } = useQuery(DAI_QUERY, {
    variables: {
      tokenAddress: ADDRESSES[token]
    }
  });

  const tokenPriceInEth = tokenData && tokenData.tokens[0]?.derivedETH;
  const tokenTotalLiquidity = tokenData && tokenData.tokens[0]?.totalLiquidity;
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0]?.ethPrice;

  return (
    <div>
      <select onChange={e => setToken(e.target.value)}>
        {
          Object.keys(ADDRESSES).map(address => <option value={address} selected={address === token}>{address}</option>)
        }
      </select>
  
      {ethError || tokenError 
      ? <div>
          ETH error: {ethError}<br />
          Token error: {tokenError}
        </div>
        :
        <>
          <div>
            {`${token} price: `}
            {ethLoading || tokenLoading
              ? 'Loading token data...'
              : '$' +
                // parse responses as floats and fix to 2 decimals
                (parseFloat(tokenPriceInEth) * parseFloat(ethPriceInUSD)).toFixed(2)
            }
          </div>
          <div>
            {`${token} total liquidity: `}
            {tokenLoading
              ? 'Loading token data...'
              : // display the total amount of DAI spread across all pools
                parseFloat(tokenTotalLiquidity).toFixed(0)
            }
          </div>
        </>
      }
    </div>
  );
};
