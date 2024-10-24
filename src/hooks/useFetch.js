import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to make the API call
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

  // Call fetchData when component mounts or when url/method/body changes
  useEffect(() => {
    fetchData();
  }, [url, method, body]);

  // Function to manually refetch data
  const refetch = () => {
    fetchData();
  };

  return { data, error, loading, refetch };
};

export default useFetch;

// // Example usage:

// // GET Request
// const ExampleGET = () => {
//   const { data, error, loading } = useFetch('https://api.example.com/data');
  
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   return <div>{JSON.stringify(data)}</div>;
// };

// // POST Request
// const ExamplePOST = () => {
//   const postData = { title: 'foo', body: 'bar' };
//   const { data, error, loading } = useFetch(
//     'https://api.example.com/posts',
//     'POST',
//     postData
//   );
  
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   return <div>{JSON.stringify(data)}</div>;
// };

// // PUT Request
// const ExamplePUT = () => {
//   const updateData = { title: 'updated foo' };
//   const { data, error, loading } = useFetch(
//     'https://api.example.com/posts/1',
//     'PUT',
//     updateData
//   );
  
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   return <div>{JSON.stringify(data)}</div>;
// };

// // DELETE Request
// const ExampleDELETE = () => {
//   const { data, error, loading } = useFetch(
//     'https://api.example.com/posts/1',
//     'DELETE'
//   );
  
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   return <div>{JSON.stringify(data)}</div>;
// };

// // Using refetch
// const ExampleRefetch = () => {
//   const { data, error, loading, refetch } = useFetch('https://api.example.com/data');
  
//   return (
//     <div>
//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error}</div>}
//       {data && <div>{JSON.stringify(data)}</div>}
//       <button onClick={refetch}>Refresh Data</button>
//     </div>
//   );
// };
