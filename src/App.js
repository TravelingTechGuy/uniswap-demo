import React, {useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import Query from './Query';
import * as queries from './queries';
import {TOKENS, PAIRS} from './tokens';
import './App.css';

export default () => {
  const [token, setToken] = useState('DAI');
  const { loading: ethLoading, error: ethError, data: ethPriceData } = useQuery(queries.ETH_PRICE_QUERY);
  const { loading: tokenLoading, error: tokenError, data: tokenData } = useQuery(queries.TOKEN_QUERY, {
    variables: {
      tokenAddress: TOKENS[token]
    }
  });

  const tokenPriceInEth = tokenData && tokenData.tokens[0]?.derivedETH;
  const tokenTotalLiquidity = tokenData && tokenData.tokens[0]?.totalLiquidity;
  const ethPriceInUSD = ethPriceData && ethPriceData.bundles[0]?.ethPrice;

  return (
    <div>
      <select defaultValue={token} onChange={e => setToken(e.target.value)}>
        {
          Object.keys(TOKENS).map(address => <option key={address} value={address}>{address}</option>)
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
          <div>
            <Query query={queries.PAIR_QUERY} variables={{pairId: PAIRS.NEXO}} />
            <Query query={queries.ALL_PAIRS} variables={{skip: 0}} />
          </div>
        </>
      }
    </div>
  );
};
