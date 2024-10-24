import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      switch (method.toUpperCase()) {
        case 'GET':
          response = await axios.get(url);
          break;
        case 'POST':
          response = await axios.post(url, body);
          break;
        case 'PUT':
          response = await axios.put(url, body);
          break;
        case 'DELETE':
          response = await axios.delete(url);
          break;
        default:
          throw new Error('Unsupported HTTP method');
      }
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, method, body]);

  const refetch = () => {
    fetchData();
  };

  return { data, error, loading, refetch };
};

export default useFetch;
