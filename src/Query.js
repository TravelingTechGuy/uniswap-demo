import React from 'react';
import JSONView from 'react-json-view';
import {useQuery} from '@apollo/react-hooks';

export default ({query, variables, theme = 'solarized'}) => {
  const { loading, error, data } = useQuery(query, variables? {variables} : {});
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
            <JSONView src={data} theme={theme} />
          </div>
    }
    </div>
  )
}
