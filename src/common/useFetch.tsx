import { useState, useEffect } from 'react';

const useFetch = (
  url: string,
  method: string,
  headers: [string, string][],
  body: any,
) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url, { headers, method, body })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url, headers, method, body]);

  return [data];
};

export default useFetch;
