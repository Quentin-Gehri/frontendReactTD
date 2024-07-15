import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response) {
          console.error('Error response from server:', error.response);
          setError('Error response from server');
        } else if (error.request) {
          console.error('No response received:', error.request);
          setError('No response received');
        } else {
          console.error('Error setting up the request:', error.message);
          setError('Error setting up the request');
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Data from MySQL Database</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.client_nom} - {item.client_email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
