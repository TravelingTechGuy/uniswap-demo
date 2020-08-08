import React from 'react';
import {useQuery} from '@apollo/react-hooks';

export default ({query, variables}) => {
  const { loading, error, data: result } = useQuery(query, {variables});
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
          <div>{JSON.stringify(result, null, 2)}</div>
    }
    </div>
  )
}
