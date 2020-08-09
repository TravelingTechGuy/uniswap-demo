import React from 'react';
import JSONTree from 'react-json-tree';
import {getBase16Theme} from 'react-base16-styling'
import {useQuery} from '@apollo/react-hooks';

export default ({query, variables}) => {
  const { loading, error, data: result } = useQuery(query, variables? {variables} : {});
  return (
    <div>
    {
      error
      ? 
        <div>{error}</div>
      :
        loading
        ?
          <div>Loading...</div>
        :
          <div>
            <JSONTree data={result} theme={getBase16Theme('solarized')} />
          </div>
    }
    </div>
  )
}
